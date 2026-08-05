import { PageShell } from "@/components/layout/PageShell";
import { FormField, DemoFormNotice } from "@/components/shared/FormField";
import { DemoForm } from "@/components/shared/DemoForm";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      subtitle="Questions about the archive, press inquiries, or general information."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-pmr-charcoal">
          <p>
            Reach out to People&apos;s Media Record for archive questions,
            partnership ideas, or press requests.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-pmr-coral" />
              <span>
                <strong>Email</strong>
                <br />
                hello@peoplesmediarecord.demo
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-pmr-coral" />
              <span>
                <strong>Location</strong>
                <br />
                Philadelphia, PA (demo address)
              </span>
            </li>
          </ul>
          <DemoFormNotice />
        </div>

        <DemoForm>
          <div className="pmr-card space-y-4 p-6 sm:p-8">
            <FormField label="Name" name="name" required />
            <FormField label="Email" name="email" type="email" required />
            <FormField label="Subject" name="subject" required />
            <FormField label="Message" name="message" type="textarea" required />
            <button type="submit" className="pmr-btn w-full sm:w-auto">
              Send message
            </button>
          </div>
        </DemoForm>
      </div>
    </PageShell>
  );
}
