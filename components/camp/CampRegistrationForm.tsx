"use client";

import { FormEvent, useState } from "react";
import { FormField } from "@/components/shared/FormField";
import { CampRegistrationSuccess } from "@/components/camp/CampRegistrationSuccess";
import { TapeLabel, XeroxDivider } from "@/components/camp/TapeLabel";
import {
  CAMP_AGE_RANGES,
  CAMP_HEAR_ABOUT,
  isUnderEighteen,
  type CampRegistrationPayload,
} from "@/lib/camp/types";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  ageRange: string;
  neighborhood: string;
  accessibilityNeeds: string;
  dietaryNeeds: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  hearAbout: string;
  notes: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>> & {
  form?: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  ageRange: "",
  neighborhood: "",
  accessibilityNeeds: "",
  dietaryNeeds: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  hearAbout: "",
  notes: "",
  guardianName: "",
  guardianEmail: "",
  guardianPhone: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (values.guardianEmail.trim() && !isValidEmail(values.guardianEmail.trim())) {
    errors.guardianEmail = "Enter a valid guardian email.";
  }

  return errors;
}

function toPayload(values: FormValues): CampRegistrationPayload {
  const payload: CampRegistrationPayload = {
    name: values.name.trim(),
    email: values.email.trim(),
  };

  if (values.phone.trim()) payload.phone = values.phone.trim();
  if (values.ageRange) payload.ageRange = values.ageRange;
  if (values.neighborhood.trim()) payload.neighborhood = values.neighborhood.trim();
  if (values.accessibilityNeeds.trim()) {
    payload.accessibilityNeeds = values.accessibilityNeeds.trim();
  }
  if (values.dietaryNeeds.trim()) payload.dietaryNeeds = values.dietaryNeeds.trim();
  if (values.emergencyContactName.trim()) {
    payload.emergencyContactName = values.emergencyContactName.trim();
  }
  if (values.emergencyContactPhone.trim()) {
    payload.emergencyContactPhone = values.emergencyContactPhone.trim();
  }
  if (values.hearAbout) payload.hearAbout = values.hearAbout;
  if (values.notes.trim()) payload.notes = values.notes.trim();

  if (isUnderEighteen(values.ageRange)) {
    const guardian = {
      ...(values.guardianName.trim() && { name: values.guardianName.trim() }),
      ...(values.guardianEmail.trim() && { email: values.guardianEmail.trim() }),
      ...(values.guardianPhone.trim() && { phone: values.guardianPhone.trim() }),
    };
    if (Object.keys(guardian).length > 0) {
      payload.guardian = guardian;
    }
  }

  return payload;
}

/** Posts to /api/camp/register → server Sheets webhook (or stub when unset). */
async function submitRegistration(
  payload: CampRegistrationPayload
): Promise<{ ok: true; mode: "api" | "stub" } | { ok: false; message: string }> {
  try {
    const res = await fetch("/api/camp/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      mode?: string;
    };

    if (!res.ok) {
      return {
        ok: false,
        message: data.error || "Registration failed. Please try again.",
      };
    }

    return { ok: true, mode: data.mode === "stub" ? "stub" : "api" };
  } catch {
    return {
      ok: false,
      message: "Network error. Check your connection and try again.",
    };
  }
}

export function CampRegistrationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null);

  const showGuardian = isUnderEighteen(values.ageRange);

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key] && !prev.form) return prev;
      const next = { ...prev };
      delete next[key];
      delete next.form;
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      el?.focus();
      return;
    }

    setLoading(true);
    const payload = toPayload(values);
    const result = await submitRegistration(payload);
    setLoading(false);

    if (!result.ok) {
      setErrors({ form: result.message });
      return;
    }

    setSuccessName(payload.name);
  }

  function handleReset() {
    setValues(initialValues);
    setErrors({});
    setSuccessName(null);
  }

  if (successName !== null) {
    return (
      <CampRegistrationSuccess name={successName} onReset={handleReset} />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="pmr-card space-y-8 p-6 sm:p-8"
      aria-labelledby="camp-register-heading"
    >
      <div>
        <TapeLabel as="h3" id="camp-register-heading">
          Registration // track A
        </TapeLabel>
        <p className="mt-3 text-sm text-pmr-muted">
          Only name and email are required. Everything else helps staff plan
          access, meals, and session fit.
        </p>
      </div>

      {errors.form && (
        <p className="rounded-lg border-2 border-pmr-coral bg-pmr-black px-4 py-3 font-mono text-sm text-pmr-coral" role="alert">
          {errors.form}
        </p>
      )}

      <fieldset className="space-y-4">
        <legend className="font-mono text-xs font-bold uppercase tracking-widest text-pmr-coral">
          Contact
        </legend>
        <FormField
          label="Name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <FormField
          label="Phone number"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
      </fieldset>

      <XeroxDivider />

      <fieldset className="space-y-4">
        <legend className="font-mono text-xs font-bold uppercase tracking-widest text-pmr-coral">
          About you
        </legend>
        <FormField
          label="Age range"
          name="ageRange"
          type="select"
          options={[...CAMP_AGE_RANGES]}
          value={values.ageRange}
          error={errors.ageRange}
          onChange={(e) => updateField("ageRange", e.target.value)}
        />
        <FormField
          label="Neighborhood / city"
          name="neighborhood"
          autoComplete="address-level2"
          placeholder="e.g. Kensington, West Philly…"
          value={values.neighborhood}
          error={errors.neighborhood}
          onChange={(e) => updateField("neighborhood", e.target.value)}
        />
        <FormField
          label="How did you hear about Camp?"
          name="hearAbout"
          type="select"
          options={[...CAMP_HEAR_ABOUT]}
          value={values.hearAbout}
          error={errors.hearAbout}
          onChange={(e) => updateField("hearAbout", e.target.value)}
        />
      </fieldset>

      {showGuardian && (
        <>
          <XeroxDivider />
          <fieldset className="space-y-4 rounded-lg border-2 border-dashed border-pmr-border bg-pmr-black/40 p-4 sm:p-5">
            <legend className="px-1 font-mono text-xs font-bold uppercase tracking-widest text-pmr-green">
              Parent / guardian (optional)
            </legend>
            <p className="text-sm text-pmr-muted">
              Shown because an under-18 age range was selected. Helpful for
              consent and day-of coordination — not required to submit.
            </p>
            <FormField
              label="Guardian name"
              name="guardianName"
              autoComplete="name"
              value={values.guardianName}
              error={errors.guardianName}
              onChange={(e) => updateField("guardianName", e.target.value)}
            />
            <FormField
              label="Guardian email"
              name="guardianEmail"
              type="email"
              autoComplete="email"
              value={values.guardianEmail}
              error={errors.guardianEmail}
              onChange={(e) => updateField("guardianEmail", e.target.value)}
            />
            <FormField
              label="Guardian phone"
              name="guardianPhone"
              type="tel"
              autoComplete="tel"
              value={values.guardianPhone}
              error={errors.guardianPhone}
              onChange={(e) => updateField("guardianPhone", e.target.value)}
            />
          </fieldset>
        </>
      )}

      <XeroxDivider />

      <fieldset className="space-y-4">
        <legend className="font-mono text-xs font-bold uppercase tracking-widest text-pmr-coral">
          Care & logistics
        </legend>
        <FormField
          label="Accessibility needs"
          name="accessibilityNeeds"
          type="textarea"
          rows={3}
          placeholder="Mobility, sensory, language, schedule…"
          value={values.accessibilityNeeds}
          error={errors.accessibilityNeeds}
          onChange={(e) => updateField("accessibilityNeeds", e.target.value)}
        />
        <FormField
          label="Dietary needs"
          name="dietaryNeeds"
          type="textarea"
          rows={2}
          placeholder="Allergies, vegetarian, halal…"
          value={values.dietaryNeeds}
          error={errors.dietaryNeeds}
          onChange={(e) => updateField("dietaryNeeds", e.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Emergency contact name"
            name="emergencyContactName"
            value={values.emergencyContactName}
            error={errors.emergencyContactName}
            onChange={(e) => updateField("emergencyContactName", e.target.value)}
          />
          <FormField
            label="Emergency contact phone"
            name="emergencyContactPhone"
            type="tel"
            value={values.emergencyContactPhone}
            error={errors.emergencyContactPhone}
            onChange={(e) =>
              updateField("emergencyContactPhone", e.target.value)
            }
          />
        </div>
        <FormField
          label="Additional notes"
          name="notes"
          type="textarea"
          rows={3}
          placeholder="Anything else staff should know…"
          value={values.notes}
          error={errors.notes}
          onChange={(e) => updateField("notes", e.target.value)}
        />
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="pmr-btn min-h-11 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Sending…" : "Submit registration"}
        </button>
        <p className="font-mono text-xs text-pmr-muted">
          * Required fields only: name, email
        </p>
      </div>
    </form>
  );
}
