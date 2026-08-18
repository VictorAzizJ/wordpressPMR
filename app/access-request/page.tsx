import { PageShell } from "@/components/layout/PageShell";
import { FormField, DemoFormNotice } from "@/components/shared/FormField";
import { DemoForm } from "@/components/shared/DemoForm";
import { archiveRecords } from "@/lib/mock-data";
import Link from "next/link";

const recordOptions = archiveRecords
  .filter(
    (r) =>
      r.accessLevel === "request_access" || r.accessLevel === "restricted"
  )
  .map((r) => ({ value: r.slug, label: r.title }));

export default function AccessRequestPage() {
  return (
    <PageShell
      title="Request Access"
      subtitle="Request permission to view or use restricted archive materials. PMR staff review all requests."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="max-w-lg space-y-4 text-pmr-muted">
          <p>
            Some materials are available as metadata only, or require review
            before playback. Tell us what you need and how you plan to use it.
          </p>
          <div className="rounded-lg border-2 border-pmr-border bg-pmr-elevated p-4 text-sm">
            <p className="font-bold text-pmr-offwhite">Access levels</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>
                <strong>Public</strong> — anyone can view
              </li>
              <li>
                <strong>Request access</strong> — metadata public, media on
                approval
              </li>
              <li>
                <strong>Restricted</strong> — staff review required
              </li>
            </ul>
          </div>
          <p>
            Read the full{" "}
            <Link href="/archive/policy" className="font-bold text-pmr-coral hover:underline">
              archive policy
            </Link>{" "}
            stub for collecting and use notes.
          </p>
          <DemoFormNotice />
        </div>

        <DemoForm successMessage="Your access request has been recorded in this demo. PMR staff would review and follow up by email.">
          <div className="pmr-card space-y-4 p-6 sm:p-8">
            <FormField label="Your name" name="name" required />
            <FormField label="Email" name="email" type="email" required />
            <FormField label="Organization / affiliation" name="affiliation" />
            <FormField
              label="Requested record"
              name="record"
              type="select"
              required
              options={recordOptions}
            />
            <FormField
              label="Intended use"
              name="intendedUse"
              type="textarea"
              required
              placeholder="Research, classroom, documentary, community event…"
            />
            <FormField
              label="I agree to PMR's access and use policies and will credit sources appropriately."
              name="agreement"
              type="checkbox"
              required
            />
            <button type="submit" className="pmr-btn w-full sm:w-auto">
              Submit request
            </button>
          </div>
        </DemoForm>
      </div>
    </PageShell>
  );
}
