import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { CampRegistrationPayload } from "@/lib/camp/types";

const MIN_AGE_MS = 800;
const MAX_AGE_MS = 12 * 60 * 60 * 1000;
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;
const SUBMIT_WINDOW_MS = 10 * 60 * 1000;
const EMAIL_WINDOW_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS_PER_IP = 20;
const MAX_SUBMITS_PER_IP = 5;
const MAX_SUBMITS_PER_EMAIL = 4;
const MAX_CHALLENGES_PER_IP = 40;
const URL_RE = /https?:\/\/|www\./gi;

const hits = new Map<string, number[]>();
let missingTurnstileWarned = false;

function signingSecret(): string {
  return (
    process.env.CAMP_FORM_SECRET ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    "local-dev-camp-form-secret"
  );
}

function sign(payload: string): string {
  return createHmac("sha256", signingSecret()).update(payload).digest("hex");
}

function safeEqualUtf8(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8"));
  } catch {
    return false;
  }
}

function pruneHits() {
  if (hits.size < 2500) return;
  const now = Date.now();
  for (const [key, times] of hits) {
    const kept = times.filter((time) => now - time < EMAIL_WINDOW_MS);
    if (kept.length === 0) hits.delete(key);
    else hits.set(key, kept);
  }
}

export function consumeRateLimit(
  key: string,
  max: number,
  windowMs: number
): boolean {
  pruneHits();
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function isSameOriginPost(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function createCampFormChallenge(): string {
  const issuedAt = Date.now();
  const nonce = randomBytes(16).toString("hex");
  const payload = `${issuedAt}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyCampFormChallenge(token: unknown):
  | { ok: true }
  | { ok: false; reason: "missing" | "invalid" | "too_fast" | "expired" } {
  if (typeof token !== "string" || !token) {
    return { ok: false, reason: "missing" };
  }

  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, reason: "invalid" };

  const [issuedRaw, nonce, sig] = parts;
  if (
    !/^\d+$/.test(issuedRaw) ||
    !/^[a-f0-9]{32}$/.test(nonce) ||
    !/^[a-f0-9]{64}$/.test(sig)
  ) {
    return { ok: false, reason: "invalid" };
  }

  const payload = `${issuedRaw}.${nonce}`;
  if (!safeEqualUtf8(sig, sign(payload))) {
    return { ok: false, reason: "invalid" };
  }

  const age = Date.now() - Number(issuedRaw);
  if (age < MIN_AGE_MS) return { ok: false, reason: "too_fast" };
  if (age > MAX_AGE_MS) return { ok: false, reason: "expired" };
  return { ok: true };
}

export function honeypotFilled(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value !== "string") return true;
  return value.trim().length > 0;
}

export function publicTurnstileSiteKey(): string {
  return (
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    process.env.TURNSTILE_SITE_KEY ||
    ""
  );
}

export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && publicTurnstileSiteKey());
}

export function warnIfTurnstileMissing() {
  if (missingTurnstileWarned) return;
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL || isTurnstileEnabled()) return;
  missingTurnstileWarned = true;
  console.warn(
    "[camp/register] Turnstile is not configured. Registrations rely on the honeypot, signed tokens, and rate limits."
  );
}

export async function verifyTurnstile(
  token: unknown,
  ip: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || token.length < 10) return false;

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (ip && ip !== "unknown") body.set("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(8000),
      }
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[camp/register] Turnstile verify failed", err);
    return false;
  }
}

export function looksLikeSpam(payload: CampRegistrationPayload): boolean {
  if (/https?:\/\//i.test(payload.firstName) || /https?:\/\//i.test(payload.lastName)) {
    return true;
  }

  const text = [
    payload.firstName,
    payload.lastName,
    payload.organization,
    payload.hearAbout,
    payload.notes,
    payload.neighborhood,
    payload.city,
  ]
    .filter(Boolean)
    .join(" ");
  const urls = text.match(URL_RE);
  return Boolean(urls && urls.length >= 3);
}

export function limitChallengeIssuance(ip: string): boolean {
  return consumeRateLimit(
    `challenge:${ip}`,
    MAX_CHALLENGES_PER_IP,
    ATTEMPT_WINDOW_MS
  );
}

export function limitAttempts(ip: string): boolean {
  return consumeRateLimit(`attempt:${ip}`, MAX_ATTEMPTS_PER_IP, ATTEMPT_WINDOW_MS);
}

export function limitSubmits(ip: string, email: string): boolean {
  if (!consumeRateLimit(`ip:${ip}`, MAX_SUBMITS_PER_IP, SUBMIT_WINDOW_MS)) {
    return false;
  }
  return consumeRateLimit(
    `email:${email.toLowerCase()}`,
    MAX_SUBMITS_PER_EMAIL,
    EMAIL_WINDOW_MS
  );
}

export const GENERIC_VERIFY_ERROR =
  "Could not verify this submission. Refresh the page and try again.";
export const RATE_LIMIT_ERROR =
  "Too many attempts. Please wait a few minutes and try again.";
export const RETRY_MOMENT_ERROR = "Please try again in a moment.";
export const CAPTCHA_ERROR = "Please confirm you are human and try again.";
