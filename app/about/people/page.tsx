import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

const staff = [
  { role: "Director", note: "Bio forthcoming." },
  { role: "Archivist", note: "Bio forthcoming." },
  { role: "Programs coordinator", note: "Bio forthcoming." },
];

const fellows = [
  {
    role: "PACME fellow",
    note: "Names and project descriptions forthcoming from the client.",
  },
];

const cab = [
  {
    role: "Community Advisory Board",
    note: "Members who guide collecting, access, and community accountability. Names forthcoming.",
  },
];

const partners = [
  {
    role: "Partner organizations",
    note: "Schools, community media groups, and archives we work with. List forthcoming.",
  },
];

function PeopleGroup({
  title,
  items,
}: {
  title: string;
  items: { role: string; note: string }[];
}) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold text-pmr-offwhite">{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.role} className="pmr-card p-5">
            <h3 className="font-bold text-pmr-offwhite">{item.role}</h3>
            <p className="mt-2 text-sm text-pmr-muted">{item.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function PeoplePage() {
  return (
    <PageShell
      title="People"
      subtitle="Staff, fellows, the Community Advisory Board, and partners. Names and photos will replace this placeholder copy."
    >
      <div className="space-y-12">
        <PeopleGroup title="Staff" items={staff} />

        <section>
          <h2 className="mb-4 text-2xl font-bold text-pmr-offwhite">Fellows</h2>
          <p className="mb-4 max-w-3xl text-pmr-muted">
            Fellows work through{" "}
            <Link
              href="/programs/pacme"
              className="font-bold text-pmr-coral hover:underline"
            >
              PACME
            </Link>
            , PMR&apos;s community media education program. Bios forthcoming.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {fellows.map((item) => (
              <li key={item.role} className="pmr-card p-5">
                <h3 className="font-bold text-pmr-offwhite">{item.role}</h3>
                <p className="mt-2 text-sm text-pmr-muted">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <PeopleGroup title="Community Advisory Board (CAB)" items={cab} />
        <PeopleGroup title="Partners" items={partners} />

        <p className="text-sm text-pmr-muted">
          Looking for programs rather than people?{" "}
          <Link href="/programs" className="font-bold text-pmr-coral hover:underline">
            Browse programs
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
