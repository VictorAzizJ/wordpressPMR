import { events } from "@/lib/mock-data";
import { PageShell } from "@/components/layout/PageShell";
import { Calendar, MapPin } from "lucide-react";

function EventList({
  title,
  items,
}: {
  title: string;
  items: typeof events;
}) {
  if (!items.length) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-pmr-dark">{title}</h2>
      <div className="space-y-4">
        {items.map((event) => (
          <article key={event.id} className="pmr-card p-5 sm:p-6">
            <h3 className="text-xl font-bold text-pmr-offwhite">{event.title}</h3>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-pmr-silver">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-pmr-coral" />
                {new Date(event.dateTime).toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-pmr-coral" />
                {event.location}
              </span>
            </div>
            <p className="mt-3 text-pmr-silver">{event.description}</p>
            {event.registrationLink && event.isUpcoming && (
              <a
                href={event.registrationLink}
                className="pmr-btn mt-4 inline-flex text-sm"
              >
                Register
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function EventsPage() {
  const upcoming = events.filter((e) => e.isUpcoming);
  const past = events.filter((e) => !e.isUpcoming);

  return (
    <PageShell
      title="Events"
      subtitle="Workshops, open houses, and community programming from PMR."
    >
      <EventList title="Upcoming" items={upcoming} />
      <EventList title="Past" items={past} />
    </PageShell>
  );
}
