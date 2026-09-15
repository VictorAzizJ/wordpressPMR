import { NextResponse } from "next/server";
import { submitCampRegistration } from "@/lib/camp/sheets";
import {
  CAMP_DAYS,
  type CampAttendingDay,
  type CampChild,
  type CampRegistrationPayload,
} from "@/lib/camp/types";
import {
  CAPTCHA_ERROR,
  GENERIC_VERIFY_ERROR,
  RATE_LIMIT_ERROR,
  RETRY_MOMENT_ERROR,
  clientIp,
  honeypotFilled,
  isSameOriginPost,
  isTurnstileEnabled,
  limitAttempts,
  limitSubmits,
  looksLikeSpam,
  verifyCampFormChallenge,
  verifyTurnstile,
  warnIfTurnstileMissing,
} from "@/lib/camp/form-guard";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const VALID_DAYS = new Set<string>(CAMP_DAYS.map((day) => day.value));

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function optionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseAttendingDays(value: unknown): CampAttendingDay[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<CampAttendingDay>();
  for (const item of value) {
    if (typeof item !== "string") continue;
    if (!VALID_DAYS.has(item)) continue;
    seen.add(item as CampAttendingDay);
  }
  return CAMP_DAYS.map((day) => day.value).filter((day) => seen.has(day));
}

function parseChildren(value: unknown): CampChild[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const children = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Record<string, unknown>;
      const child: CampChild = {
        ...(optionalString(raw.name) && { name: optionalString(raw.name) }),
        ...(optionalString(raw.age) && { age: optionalString(raw.age) }),
      };
      return child.name || child.age ? child : null;
    })
    .filter((child): child is CampChild => child !== null)
    .slice(0, 3);

  return children.length > 0 ? children : undefined;
}

function parsePayload(
  body: unknown
):
  | { ok: true; payload: CampRegistrationPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const data = body as Record<string, unknown>;
  const firstName = optionalString(data.firstName);
  const lastName = optionalString(data.lastName);
  const email = optionalString(data.email);
  const attendingDays = parseAttendingDays(data.attendingDays);

  if (!firstName) {
    return { ok: false, error: "First name is required." };
  }
  if (!lastName) {
    return { ok: false, error: "Last name is required." };
  }
  if (!email) {
    return { ok: false, error: "Email is required." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (attendingDays.length === 0) {
    return { ok: false, error: "Select at least one day you plan to attend." };
  }

  const payload: CampRegistrationPayload = {
    firstName,
    lastName,
    email,
    attendingDays,
    phone: optionalString(data.phone),
    ageRange: optionalString(data.ageRange),
    neighborhood: optionalString(data.neighborhood),
    city: optionalString(data.city),
    organization: optionalString(data.organization),
    accessibilityNeeds: optionalString(data.accessibilityNeeds),
    dietaryNeeds: optionalString(data.dietaryNeeds),
    children: parseChildren(data.children),
    childAllergies: optionalString(data.childAllergies),
    emergencyContactPhone: optionalString(data.emergencyContactPhone),
    hearAbout: optionalString(data.hearAbout),
    notes: optionalString(data.notes),
  };

  return { ok: true, payload };
}

function jsonError(
  error: string,
  status: number,
  code?: string,
  reason?: string
) {
  if (reason) {
    console.info("[camp/register] blocked", { reason });
  }
  return NextResponse.json(code ? { error, code } : { error }, { status });
}

function fakeSuccess(reason: string) {
  console.info("[camp/register] blocked", { reason });
  return NextResponse.json({ ok: true, mode: "api" });
}

export async function POST(request: Request) {
  warnIfTurnstileMissing();

  if (!isSameOriginPost(request)) {
    return jsonError(GENERIC_VERIFY_ERROR, 403, "refresh", "origin");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const ip = clientIp(request);

  if (!limitAttempts(ip)) {
    return jsonError(RATE_LIMIT_ERROR, 429, "rate_limit", "rate_attempt");
  }

  if (honeypotFilled(data.website)) {
    return fakeSuccess("honeypot");
  }

  const challenge = verifyCampFormChallenge(data.challenge);
  if (!challenge.ok) {
    if (challenge.reason === "too_fast") {
      return jsonError(RETRY_MOMENT_ERROR, 400, "retry", "too_fast");
    }
    return jsonError(
      GENERIC_VERIFY_ERROR,
      400,
      "refresh",
      challenge.reason
    );
  }

  if (isTurnstileEnabled()) {
    const ok = await verifyTurnstile(data.turnstileToken, ip);
    if (!ok) {
      return jsonError(CAPTCHA_ERROR, 400, "captcha", "turnstile");
    }
  }

  const parsed = parsePayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  if (looksLikeSpam(parsed.payload)) {
    return fakeSuccess("spam");
  }

  if (!limitSubmits(ip, parsed.payload.email)) {
    return jsonError(RATE_LIMIT_ERROR, 429, "rate_limit", "rate_submit");
  }

  const result = await submitCampRegistration(parsed.payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    mode: result.mode === "stub" ? "stub" : "api",
  });
}
