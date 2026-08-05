interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  placeholder?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  required,
  options,
  rows = 4,
  placeholder,
}: FormFieldProps) {
  const id = `field-${name}`;

  if (type === "checkbox") {
    return (
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name={name}
          id={id}
          required={required}
          className="mt-1 h-4 w-4 rounded border-2 border-pmr-dark accent-pmr-coral"
        />
        <span className="text-sm text-pmr-charcoal">{label}</span>
      </label>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-pmr-dark">
        {label}
        {required && <span className="text-pmr-coral"> *</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className="pmr-input"
        />
      ) : type === "select" ? (
        <select id={id} name={name} required={required} className="pmr-input">
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
          className="pmr-input"
        />
      )}
    </div>
  );
}

export function DemoFormNotice() {
  return (
    <p className="rounded-lg border-2 border-dashed border-pmr-dark/40 bg-pmr-cream/80 px-4 py-3 text-sm text-pmr-charcoal">
      Demo only — form submissions are not sent. In production, this connects to
      PMR&apos;s workflow backend.
    </p>
  );
}
