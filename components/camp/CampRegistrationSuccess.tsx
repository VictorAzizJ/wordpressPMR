interface CampRegistrationSuccessProps {
  name?: string;
  onReset?: () => void;
}

export function CampRegistrationSuccess({
  name,
  onReset,
}: CampRegistrationSuccessProps) {
  return (
    <div
      className="pmr-card space-y-4 border-pmr-coral p-6 sm:p-8"
      role="status"
      aria-live="polite"
    >
      <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-pmr-coral">
        {"// transmission received"}
      </p>
      <h3 className="text-2xl font-bold text-pmr-offwhite">
        You&apos;re on the Camp list
        {name ? `, ${name.split(" ")[0]}` : ""}.
      </h3>
      <p className="text-pmr-muted">
        Thanks for registering for Media Camp. In production, PMR staff will
        confirm dates, location, and next steps by email. Your submission was
        validated and staged for the Sheets webhook.
      </p>
      <p className="font-mono text-sm text-pmr-coral">
        &gt; status: queued · mode: awaiting webhook_
      </p>
      {onReset && (
        <button type="button" className="pmr-btn-secondary mt-2" onClick={onReset}>
          Submit another registration
        </button>
      )}
    </div>
  );
}
