import type { Metadata } from "next";
import { PmVikasInfo } from "@/components/PmVikasInfo";
import { Section } from "@/components/Section";
import { PmVikasCalendar } from "@/components/PmVikasCalendar";

export const metadata: Metadata = {
  title: "PM-VIKAS — Joyal Xavier A",
  description:
    "Details on the PM-VIKAS IoT training program at IIIT Kottayam, and a daily progress log.",
};

export default function PmVikasPage() {
  return (
    <main className="pt-16">
      <PmVikasInfo />
      <Section
        id="pm-vikas-calendar"
        eyebrow="Daily log"
        title="Progress calendar"
        description="A day-by-day record of the training. Publicly viewable — only I can add or edit entries after logging in."
        className="bg-white/40 dark:bg-graphite-900/30"
      >
        <PmVikasCalendar />
      </Section>
    </main>
  );
}
