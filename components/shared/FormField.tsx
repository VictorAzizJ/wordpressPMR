import { ChangeEventHandler, FocusEventHandler, ReactNode } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  checked?: boolean;
  error?: string;
  description?: ReactNode;
  /** `light` = dark labels on cream surfaces (Camp registration). */
  tone?: "default" | "light";
  onChange?: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  onBlur?: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  autoComplete?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  required,
  options,
  rows = 4,
  placeholder,
  value,
  defaultValue,
  checked,
  error,
  description,
  tone = "default",
  onChange,
  onBlur,
  autoComplete,
}: FormFieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [description ? hintId : null, error ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const invalid = Boolean(error);
  const light = tone === "light";
  const labelClass = light
    ? "mb-1.5 block font-mono text-sm font-bold text-pmr-dark"
    : "mb-1.5 block font-mono text-sm font-bold text-pmr-offwhite";
  const hintClass = light
    ? "mb-2 text-sm leading-relaxed text-pmr-charcoal"
    : "mb-2 text-sm leading-relaxed text-pmr-muted";
  const checkboxLabelClass = light
    ? "font-mono text-sm text-pmr-charcoal"
    : "font-mono text-sm text-pmr-muted";

  if (type === "checkbox") {
    return (
      <div>
        <label className="flex min-h-11 items-start gap-3">
          <input
            type="checkbox"
            name={name}
            id={id}
            required={required}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className="mt-1 h-5 w-5 shrink-0 rounded border-2 border-pmr-border accent-pmr-coral"
          />
          <span className={checkboxLabelClass}>{label}</span>
        </label>
        {description && (
          <p id={hintId} className={`ml-8 ${hintClass}`}>
            {description}
          </p>
        )}
        {error && (
          <p id={errorId} className="mt-1.5 font-mono text-sm text-pmr-coral" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <span className="text-pmr-coral" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {description && (
        <p id={hintId} className={hintClass}>
          {description}
        </p>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={`pmr-input ${invalid ? "border-pmr-coral focus:border-pmr-coral focus:ring-pmr-coral/35" : ""}`}
        />
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={`pmr-input ${invalid ? "border-pmr-coral focus:border-pmr-coral focus:ring-pmr-coral/35" : ""}`}
        >
          <option value="">Select…</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={`pmr-input ${invalid ? "border-pmr-coral focus:border-pmr-coral focus:ring-pmr-coral/35" : ""}`}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 font-mono text-sm text-pmr-coral" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function DemoFormNotice() {
  return (
    <p className="rounded-lg border-2 border-dashed border-pmr-border bg-pmr-elevated/80 px-4 py-3 font-mono text-sm text-pmr-muted">
      Demo only — form submissions are not sent. In production, this connects to
      PMR&apos;s workflow backend.
    </p>
  );
}
