"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { FormField } from "@/components/shared/FormField";
import { CampRegistrationSuccess } from "@/components/camp/CampRegistrationSuccess";
import { XeroxDivider } from "@/components/camp/TapeLabel";
import {
  CAMP_AGE_RANGES,
  CAMP_DAYS,
  CAMP_MAX_CHILDREN,
  type CampAttendingDay,
  type CampChild,
  type CampRegistrationPayload,
} from "@/lib/camp/types";

type ChildRow = { name: string; age: string };

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attendingDays: CampAttendingDay[];
  ageRange: string;
  neighborhood: string;
  city: string;
  organization: string;
  hearAbout: string;
  accessibilityNeeds: string;
  dietaryNeeds: string;
  children: ChildRow[];
  childAllergies: string;
  emergencyContactPhone: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>> & {
  form?: string;
};

const emptyChild = (): ChildRow => ({ name: "", age: "" });

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  attendingDays: [],
  ageRange: "",
  neighborhood: "",
  city: "",
  organization: "",
  hearAbout: "",
  accessibilityNeeds: "",
  dietaryNeeds: "",
  children: [emptyChild()],
  childAllergies: "",
  emergencyContactPhone: "",
  notes: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (values.attendingDays.length === 0) {
    errors.attendingDays = "Select at least one day you plan to attend.";
  }

  return errors;
}

function filledChildren(rows: ChildRow[]): CampChild[] {
  return rows
    .map((row) => ({
      ...(row.name.trim() && { name: row.name.trim() }),
      ...(row.age.trim() && { age: row.age.trim() }),
    }))
    .filter((row) => row.name || row.age);
}

function toPayload(values: FormValues): CampRegistrationPayload {
  const payload: CampRegistrationPayload = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    attendingDays: values.attendingDays,
  };

  if (values.phone.trim()) payload.phone = values.phone.trim();
  if (values.ageRange) payload.ageRange = values.ageRange;
  if (values.neighborhood.trim()) payload.neighborhood = values.neighborhood.trim();
  if (values.city.trim()) payload.city = values.city.trim();
  if (values.organization.trim()) payload.organization = values.organization.trim();
  if (values.hearAbout.trim()) payload.hearAbout = values.hearAbout.trim();
  if (values.accessibilityNeeds.trim()) {
    payload.accessibilityNeeds = values.accessibilityNeeds.trim();
  }
  if (values.dietaryNeeds.trim()) payload.dietaryNeeds = values.dietaryNeeds.trim();

  const children = filledChildren(values.children);
  if (children.length > 0) payload.children = children;
  if (values.childAllergies.trim()) {
    payload.childAllergies = values.childAllergies.trim();
  }
  if (values.emergencyContactPhone.trim()) {
    payload.emergencyContactPhone = values.emergencyContactPhone.trim();
  }
  if (values.notes.trim()) payload.notes = values.notes.trim();

  return payload;
}

async function submitRegistration(
  payload: CampRegistrationPayload
): Promise<{ ok: true; mode: "api" | "stub" } | { ok: false; message: string }> {
  try {
    const res = await fetch("/api/camp/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25_000),
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
  } catch (err) {
    const timedOut =
      err instanceof Error &&
      (err.name === "TimeoutError" || err.name === "AbortError");
    return {
      ok: false,
      message: timedOut
        ? "This is taking longer than expected. Check whether your row landed in the sheet, then try again if it did not."
        : "Network error. Check your connection and try again.",
    };
  }
}

const fieldTone = "light" as const;

export function CampRegistrationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null);

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

  function toggleAttendingDay(day: CampAttendingDay, checked: boolean) {
    setValues((prev) => {
      const next = checked
        ? CAMP_DAYS.map((item) => item.value).filter(
            (value) => prev.attendingDays.includes(value) || value === day
          )
        : prev.attendingDays.filter((value) => value !== day);
      return { ...prev, attendingDays: next };
    });
    setErrors((prev) => {
      if (!prev.attendingDays && !prev.form) return prev;
      const next = { ...prev };
      delete next.attendingDays;
      delete next.form;
      return next;
    });
  }

  function updateChild(index: number, key: keyof ChildRow, value: string) {
    setValues((prev) => {
      const children = prev.children.map((row, i) =>
        i === index ? { ...row, [key]: value } : row
      );
      return { ...prev, children };
    });
  }

  function addChild() {
    setValues((prev) => {
      if (prev.children.length >= CAMP_MAX_CHILDREN) return prev;
      return { ...prev, children: [...prev.children, emptyChild()] };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.form) {
        document.getElementById("camp-form-error")?.focus();
      } else {
        const firstKey = Object.keys(nextErrors)[0];
        document.getElementById(`field-${firstKey}`)?.focus();
      }
      return;
    }

    setLoading(true);
    const payload = toPayload(values);
    try {
      const result = await submitRegistration(payload);
      if (!result.ok) {
        setErrors({ form: result.message });
        document.getElementById("camp-form-error")?.focus();
        return;
      }
      setSuccessName(payload.firstName);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setValues(initialValues);
    setErrors({});
    setSuccessName(null);
  }

  return (
    <>
      {successName !== null && (
        <CampRegistrationSuccess name={successName} onReset={handleReset} />
      )}
      <form
      method="post"
      onSubmit={handleSubmit}
      noValidate
      aria-hidden={successName !== null || undefined}
      className="camp-form-card space-y-8 p-6 sm:p-8"
      aria-labelledby="camp-register-heading"
    >
      <div>
        <h2
          id="camp-register-heading"
          className="text-2xl font-bold text-pmr-dark"
        >
          Contact Information
        </h2>
      </div>

      {errors.form && (
        <p
          id="camp-form-error"
          tabIndex={-1}
          className="rounded-lg border-2 border-pmr-dark bg-pmr-cream px-4 py-3 font-mono text-sm text-pmr-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral"
          role="alert"
        >
          {errors.form}
        </p>
      )}

      <fieldset className="space-y-4">
        <legend className="sr-only">Contact information</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            tone={fieldTone}
            label="First Name"
            name="firstName"
            required
            autoComplete="given-name"
            value={values.firstName}
            error={errors.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
          />
          <FormField
            tone={fieldTone}
            label="Last Name"
            name="lastName"
            required
            autoComplete="family-name"
            value={values.lastName}
            error={errors.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
          />
        </div>
        <FormField
          tone={fieldTone}
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
          tone={fieldTone}
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

      <fieldset className="space-y-3" aria-describedby="attending-days-hint">
        <legend className="mb-1 block font-mono text-sm font-bold text-pmr-dark">
          What days of Camp do you plan on attending?
          <span className="text-pmr-coral" aria-hidden>
            {" "}
            *
          </span>
        </legend>
        <p id="attending-days-hint" className="text-sm leading-relaxed text-pmr-charcoal">
          This is for headcount purposes—your registration will automatically
          sign you up for all Camp events.
        </p>
        <div className="grid gap-3">
          {CAMP_DAYS.map((day) => (
            <label
              key={day.value}
              className="flex min-h-11 items-start gap-3 font-mono text-sm leading-relaxed text-pmr-dark"
            >
              <input
                id={day.value === "saturday" ? "field-attendingDays" : undefined}
                type="checkbox"
                name="attendingDays"
                value={day.value}
                checked={values.attendingDays.includes(day.value)}
                onChange={(e) => toggleAttendingDay(day.value, e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 border-2 border-pmr-border accent-pmr-coral"
              />
              <span>{day.label}</span>
            </label>
          ))}
        </div>
        {errors.attendingDays && (
          <p className="font-mono text-sm text-pmr-coral" role="alert">
            {errors.attendingDays}
          </p>
        )}
      </fieldset>

      <XeroxDivider />

      <fieldset className="space-y-4">
        <legend className="mb-2 font-mono text-sm font-bold uppercase tracking-widest text-pmr-dark">
          About you
        </legend>

        <fieldset>
          <legend className="mb-2 block font-mono text-sm font-bold text-pmr-dark">
            Age range
          </legend>
          <div className="grid gap-2">
            {CAMP_AGE_RANGES.map((opt) => (
              <label
                key={opt.value}
                className="flex min-h-11 items-center gap-3 font-mono text-sm text-pmr-dark"
              >
                <input
                  type="radio"
                  name="ageRange"
                  value={opt.value}
                  checked={values.ageRange === opt.value}
                  onChange={() => updateField("ageRange", opt.value)}
                  className="h-5 w-5 shrink-0 border-2 border-pmr-border accent-pmr-coral"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <FormField
          tone={fieldTone}
          label="Neighborhood"
          name="neighborhood"
          autoComplete="address-level3"
          value={values.neighborhood}
          error={errors.neighborhood}
          onChange={(e) => updateField("neighborhood", e.target.value)}
        />
        <FormField
          tone={fieldTone}
          label="City"
          name="city"
          autoComplete="address-level2"
          value={values.city}
          error={errors.city}
          onChange={(e) => updateField("city", e.target.value)}
        />
        <FormField
          tone={fieldTone}
          label="Organization or group affiliation"
          name="organization"
          value={values.organization}
          error={errors.organization}
          onChange={(e) => updateField("organization", e.target.value)}
        />
        <FormField
          tone={fieldTone}
          label="How did you hear about Camp?"
          name="hearAbout"
          value={values.hearAbout}
          error={errors.hearAbout}
          onChange={(e) => updateField("hearAbout", e.target.value)}
        />
      </fieldset>

      <XeroxDivider />

      <fieldset className="space-y-6">
        <legend className="mb-2 font-mono text-sm font-bold uppercase tracking-widest text-pmr-dark">
          Care and Logistics
        </legend>

        <FormField
          tone={fieldTone}
          label="Accessibility Needs"
          name="accessibilityNeeds"
          type="textarea"
          rows={3}
          description="Camp will take place in an ADA accessible facility. Please let us know what other accessibility needs you might have!"
          value={values.accessibilityNeeds}
          error={errors.accessibilityNeeds}
          onChange={(e) => updateField("accessibilityNeeds", e.target.value)}
        />
        <FormField
          tone={fieldTone}
          label="Dietary Preferences"
          name="dietaryNeeds"
          type="textarea"
          rows={3}
          description="We will provide meals and refreshments on both days of Camp. Please list any allergies and dietary preferences."
          value={values.dietaryNeeds}
          error={errors.dietaryNeeds}
          onChange={(e) => updateField("dietaryNeeds", e.target.value)}
        />

        <div className="space-y-4 rounded-lg border-2 border-dashed border-pmr-border bg-pmr-cream p-4 sm:p-5">
          <h3 className="font-mono text-sm font-bold text-pmr-dark">
            Childcare
          </h3>
          <p className="text-sm leading-relaxed text-pmr-charcoal">
            People’s Media Camp is honored to be able to offer childcare for
            participants through partnering with the Philly Childcare Collective.
            Childcare is offered between 8:30 am and 6 pm on Saturday, 10/3, and
            between 9 am and 6 pm on Sunday, 10/4.
          </p>

          {values.children.map((child, index) => (
            <div
              key={index}
              className="grid gap-4 sm:grid-cols-2"
            >
              <FormField
                tone={fieldTone}
                label={
                  index === 0
                    ? "Name of child"
                    : `Name of child ${index + 1}`
                }
                name={`childName${index}`}
                value={child.name}
                onChange={(e) => updateChild(index, "name", e.target.value)}
              />
              <FormField
                tone={fieldTone}
                label={
                  index === 0
                    ? "Age of child"
                    : `Age of child ${index + 1}`
                }
                name={`childAge${index}`}
                value={child.age}
                onChange={(e) => updateChild(index, "age", e.target.value)}
              />
            </div>
          ))}

          {values.children.length < CAMP_MAX_CHILDREN && (
            <button
              type="button"
              className="pmr-btn-secondary text-sm"
              onClick={addChild}
            >
              Add additional names and ages
            </button>
          )}

          <FormField
            tone={fieldTone}
            label="Allergies and dietary restrictions"
            name="childAllergies"
            type="textarea"
            rows={2}
            description="Please provide any allergies and dietary restrictions."
            value={values.childAllergies}
            error={errors.childAllergies}
            onChange={(e) => updateField("childAllergies", e.target.value)}
          />
          <FormField
            tone={fieldTone}
            label="Emergency contact on the day of Camp"
            name="emergencyContactPhone"
            type="tel"
            autoComplete="tel"
            description="Please provide the phone number where a parent or guardian can be reached at Camp."
            value={values.emergencyContactPhone}
            error={errors.emergencyContactPhone}
            onChange={(e) =>
              updateField("emergencyContactPhone", e.target.value)
            }
          />
        </div>
      </fieldset>

      <XeroxDivider />

      <div className="space-y-3">
        <p className="text-base leading-relaxed text-pmr-charcoal">
          Would you like to donate to help make People’s Media Camp happen?{" "}
          <Link
            href="/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-pmr-dark underline decoration-2 underline-offset-4 hover:text-pmr-blue"
          >
            Donate here
          </Link>
          <span className="sr-only"> (opens in a new tab)</span>
        </p>
      </div>

      <FormField
        tone={fieldTone}
        label="Anything else you want to share?"
        name="notes"
        type="textarea"
        rows={4}
        value={values.notes}
        error={errors.notes}
        onChange={(e) => updateField("notes", e.target.value)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="pmr-btn min-h-11 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Sending…" : "Submit Registration"}
        </button>
        <p className="font-mono text-xs text-pmr-charcoal">
          * Required: first name, last name, email, and days attending
        </p>
      </div>
    </form>
    </>
  );
}
