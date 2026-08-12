import { NextResponse } from "next/server";
import { submitCampRegistration } from "@/lib/camp/sheets";
import type { CampRegistrationPayload } from "@/lib/camp/types";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function optionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseGuardian(
  value: unknown
): CampRegistrationPayload["guardian"] | undefined {
  if (!value || typeof value !== "object") return undefined;
  const raw = value as Record<string, unknown>;
  const guardian = {
    ...(optionalString(raw.name) && { name: optionalString(raw.name) }),
    ...(optionalString(raw.email) && { email: optionalString(raw.email) }),
    ...(optionalString(raw.phone) && { phone: optionalString(raw.phone) }),
  };
  return Object.keys(guardian).length > 0 ? guardian : undefined;
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
  const name = optionalString(data.name);
  const email = optionalString(data.email);

  if (!name) {
    return { ok: false, error: "Name is required." };
  }
  if (!email) {
    return { ok: false, error: "Email is required." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const guardianEmail = parseGuardian(data.guardian)?.email;
  if (guardianEmail && !isValidEmail(guardianEmail)) {
    return { ok: false, error: "Enter a valid guardian email." };
  }

  const payload: CampRegistrationPayload = {
    name,
    email,
    phone: optionalString(data.phone),
    ageRange: optionalString(data.ageRange),
    neighborhood: optionalString(data.neighborhood),
    accessibilityNeeds: optionalString(data.accessibilityNeeds),
    dietaryNeeds: optionalString(data.dietaryNeeds),
    emergencyContactName: optionalString(data.emergencyContactName),
    emergencyContactPhone: optionalString(data.emergencyContactPhone),
    hearAbout: optionalString(data.hearAbout),
    notes: optionalString(data.notes),
    guardian: parseGuardian(data.guardian),
  };

  return { ok: true, payload };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parsePayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const result = await submitCampRegistration(parsed.payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  // Client treats anything other than "stub" as a live API write.
  return NextResponse.json({
    ok: true,
    mode: result.mode === "stub" ? "stub" : "api",
  });
}
