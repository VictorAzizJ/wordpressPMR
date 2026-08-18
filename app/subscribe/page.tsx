import { PageShell } from "@/components/layout/PageShell";
import { FormField, DemoFormNotice } from "@/components/shared/FormField";
import { DemoForm } from "@/components/shared/DemoForm";

export default function SubscribePage() {
  return (
    <PageShell
      title="Subscribe"
      subtitle="Join the list for archive drops, events, and ways to dig into movement media with us."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-pmr-muted">
          <p>
            Occasional updates — not a daily blast. We share new collections,
            workshop dates, and calls to steward or volunteer.
          </p>
          <DemoFormNotice />
        </div>

        <DemoForm successMessage="You're on the demo list. In production, this would add you to PMR's email list.">
          <div className="pmr-card space-y-4 p-6 sm:p-8">
            <FormField label="Name" name="name" />
            <FormField label="Email" name="email" type="email" required />
            <button type="submit" className="pmr-btn w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </DemoForm>
      </div>
    </PageShell>
  );
}
