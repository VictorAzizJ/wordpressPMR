import Link from "next/link";
import { TapeLabel } from "@/components/camp/TapeLabel";

interface CampRegistrationSuccessProps {
  name?: string;
  onReset?: () => void;
}

export function CampRegistrationSuccess({
  name,
  onReset,
}: CampRegistrationSuccessProps) {
  const firstName = name ? name.split(" ")[0] : "";

  return (
    <div
      className="camp-form-card space-y-4 p-6 sm:p-8"
      role="status"
      aria-live="polite"
    >
      <TapeLabel as="p">Registration received</TapeLabel>
      <h2 className="text-2xl font-bold text-pmr-dark">
        You&apos;re registered
        {firstName ? `, ${firstName}` : ""}.
      </h2>
      <p className="text-base leading-relaxed text-pmr-charcoal">
        Thanks for signing up for People’s Media Camp. Check your email for a
        confirmation. We’ll include you in all communications announcing
        session times and the schedule line-up.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/camp" className="pmr-btn">
          Back to Camp
        </Link>
        {onReset && (
          <button type="button" className="pmr-btn-secondary" onClick={onReset}>
            Submit another registration
          </button>
        )}
      </div>
    </div>
  );
}
