"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Event } from "@/lib/types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function monthLabel(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function WorkshopCalendar({ events }: { events: Event[] }) {
  const parsed = useMemo(
    () =>
      events.map((event) => ({
        ...event,
        date: new Date(event.dateTime),
      })),
    [events]
  );

  const [cursor, setCursor] = useState(() => {
    const upcoming = parsed.find((event) => event.isUpcoming);
    const seed = upcoming ?? parsed[0];
    return seed ? startOfMonth(seed.date) : startOfMonth(new Date());
  });

  const cells = useMemo(() => {
    const first = startOfMonth(cursor);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(
      cursor.getFullYear(),
      cursor.getMonth() + 1,
      0
    ).getDate();
    const leading = Array.from({ length: startWeekday }, () => null);
    const days = Array.from(
      { length: daysInMonth },
      (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)
    );
    return [...leading, ...days];
  }, [cursor]);

  const monthEvents = parsed.filter(
    (event) =>
      event.date.getFullYear() === cursor.getFullYear() &&
      event.date.getMonth() === cursor.getMonth()
  );

  return (
    <section className="mb-12" aria-labelledby="workshop-calendar-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2
          id="workshop-calendar-heading"
          className="text-2xl font-bold text-pmr-offwhite"
        >
          {monthLabel(cursor)}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 border-pmr-border bg-pmr-elevated text-pmr-offwhite hover:bg-pmr-black"
            onClick={() => setCursor((current) => addMonths(current, -1))}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 border-pmr-border bg-pmr-elevated text-pmr-offwhite hover:bg-pmr-black"
            onClick={() => setCursor((current) => addMonths(current, 1))}
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        role="grid"
        aria-labelledby="workshop-calendar-heading"
        className="overflow-hidden rounded-lg border-2 border-pmr-border bg-pmr-elevated"
      >
        <div role="row" className="grid grid-cols-7 border-b-2 border-pmr-border">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              role="columnheader"
              className="px-1 py-2 text-center font-mono text-xs font-bold uppercase text-pmr-muted"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, index) => {
            if (!day) {
              return (
                <div
                  key={`empty-${index}`}
                  role="gridcell"
                  aria-hidden
                  className="min-h-16 border-pmr-border/40 p-1 sm:min-h-20"
                />
              );
            }
            const dayEvents = monthEvents.filter((event) =>
              sameDay(event.date, day)
            );
            const label = [
              day.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              }),
              dayEvents.length
                ? dayEvents.map((event) => event.title).join(", ")
                : "No workshops",
            ].join(". ");
            return (
              <div
                key={day.toISOString()}
                role="gridcell"
                aria-label={label}
                className="min-h-16 border-t border-pmr-border/40 p-1 sm:min-h-20"
              >
                <p className="text-sm font-bold text-pmr-offwhite">
                  {day.getDate()}
                </p>
                {dayEvents.map((event) => (
                  <p
                    key={event.id}
                    className="mt-1 truncate text-[11px] font-bold text-pmr-coral"
                    title={event.title}
                  >
                    {event.title}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {monthEvents.length === 0 ? (
        <p className="mt-4 text-sm text-pmr-muted">
          No workshops on the calendar this month.
        </p>
      ) : (
        <ul className="mt-4 space-y-2 text-sm text-pmr-muted">
          {monthEvents.map((event) => (
            <li key={event.id}>
              <span className="font-bold text-pmr-offwhite">
                {event.date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {" — "}
              {event.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
