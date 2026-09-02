"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { FormField } from "@/components/shared/FormField";
import { CampRegistrationSuccess } from "@/components/camp/CampRegistrationSuccess";
import { XeroxDivider } from "@/components/camp/TapeLabel";
import {
  CAMP_AGE_RANGES,
  CAMP_HEAR_ABOUT,
  CAMP_MAX_CHILDREN,
  type CampChild,
  type CampRegistrationPayload,
} from "@/lib/camp/types";

type ChildRow = { name: string; age: string };

type FormValues = {
  name: string;
  email: string;
  phone: string;
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
  name: "",
  email: "",
  phone: "",
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

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
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
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
  };

  if (values.ageRange) payload.ageRange = values.ageRange;
  if (values.neighborhood.trim()) payload.neighborhood = values.neighborhood.trim();
  if (values.city.trim()) payload.city = values.city.trim();
  if (values.organization.trim()) payload.organization = values.organization.trim();
  if (values.hearAbout) payload.hearAbout = values.hearAbout;
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
        <FormField
          tone={fieldTone}
          label="Name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
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
          required
          autoComplete="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
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
          type="select"
          options={[...CAMP_HEAR_ABOUT]}
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
            participants through partnering with the Philly Childcare
            Collective. Childcare is offered between x and x on Saturday, 10/3,
            and between x and x on Sunday, 10/4.
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
              Add an additional name and age
            </button>
          )}

          <FormField
            tone={fieldTone}
            label="Allergies and dietary restrictions"
            name="childAllergies"
            type="textarea"
            rows={2}
            description="Please provide any allergies and dietary restrictions for children in care."
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
          * Required: name, email, and phone number
        </p>
      </div>
    </form>
  );
}
