import { PageShell } from "@/components/layout/PageShell";
import { FormField, DemoFormNotice } from "@/components/shared/FormField";
import { DemoForm } from "@/components/shared/DemoForm";

const interestOptions = [
  { value: "donate", label: "Donate" },
  { value: "volunteer", label: "Volunteer" },
  { value: "share_skills", label: "Share skills" },
  { value: "steward_collection", label: "Steward a collection" },
  { value: "partner", label: "Partner with PMR" },
  { value: "offer_resources", label: "Offer resources" },
];

export default function BuildWithUsPage() {
  return (
    <PageShell
      title="Build With Us"
      subtitle="Support PMR through volunteering, partnership, stewardship, or sharing your skills and resources."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="max-w-lg space-y-4 text-pmr-charcoal">
          <p>
            PMR grows through community participation. Whether you can donate
            time, expertise, collections, or funding — we want to hear from you.
          </p>
          <DemoFormNotice />
        </div>

        <DemoForm>
          <div className="pmr-card space-y-4 p-6 sm:p-8">
            <FormField label="Name" name="name" required />
            <FormField label="Email" name="email" type="email" required />
            <FormField label="Organization" name="organization" />
            <FormField
              label="Interest type"
              name="interestType"
              type="select"
              required
              options={interestOptions}
            />
            <FormField
              label="Skills or resources offered"
              name="skills"
              type="textarea"
              rows={3}
            />
            <FormField label="Message" name="message" type="textarea" required />
            <button type="submit" className="pmr-btn w-full sm:w-auto">
              Submit inquiry
            </button>
          </div>
        </DemoForm>
      </div>
    </PageShell>
  );
}
