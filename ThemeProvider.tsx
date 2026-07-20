import { Cpu, Wifi, Code2, Wrench } from "lucide-react";
import { Section } from "@/components/Section";
import { pmVikasModules, pmVikasStatus } from "@/lib/data";

const facts = [
  { label: "Scheme", value: "Pradhan Mantri Virasat Ka Samvardhan (PM-VIKAS)" },
  { label: "Ministry", value: "Ministry of Minority Affairs, Government of India" },
  { label: "Host institute", value: "IIIT Kottayam — first higher-education institute selected nationwide" },
  { label: "Track", value: "IoT Assistant — hardware, networking, and cloud-connected sensor systems" },
];

const moduleIcons = [Wrench, Wifi, Code2, Cpu];

export function PmVikasInfo() {
  return (
    <>
      <Section
        id="pm-vikas-overview"
        eyebrow="PM-VIKAS · IIIT Kottayam"
        title="IoT Assistant internship"
        description="A national skilling program I'm part of through IIIT Kottayam's IoT track."
      >
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4 text-ink-700 dark:text-paper-100/85 leading-relaxed">
            <p>
              PM-VIKAS is a national skilling and entrepreneurship scheme run by the Ministry of
              Minority Affairs, aimed at building future-ready skills among India&apos;s minority
              communities. IIIT Kottayam was the first higher-education institute in the country
              selected to implement it, running an IoT Assistant training track alongside a
              leadership and entrepreneurship track for women.
            </p>
            <p>
              I&apos;m part of the IoT cohort, training in the practical skill set behind
              hardware-facing IoT roles: identifying, assembling, interfacing, and troubleshooting
              the electronics and cloud connections that make up a working IoT system — starting
              from device fundamentals and building up to a full sensor-to-cloud capstone project.
            </p>
            <div className="mt-2 rounded-lg border border-signal-500/25 bg-signal-500/5 dark:bg-signal-400/5 p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-copper-500 dark:text-copper-400">
                Current status
              </p>
              <p className="mt-1 font-semibold text-ink-900 dark:text-paper-50">
                {pmVikasStatus.currentDay} — {pmVikasStatus.currentTopic}
              </p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{pmVikasStatus.summary}</p>
            </div>
          </div>

          <div className="space-y-3">
            {facts.map((f) => (
              <div
                key={f.label}
                className="card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 p-4"
              >
                <p className="font-mono text-[11px] uppercase tracking-wider text-copper-500 dark:text-copper-400">
                  {f.label}
                </p>
                <p className="mt-1 text-sm text-ink-900 dark:text-paper-50">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="pm-vikas-modules"
        eyebrow="Curriculum"
        title="Training modules"
        className="bg-white/40 dark:bg-graphite-900/30"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pmVikasModules.map((m, i) => {
            const Icon = moduleIcons[i] ?? Cpu;
            return (
              <div
                key={m.title}
                className="card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 p-5"
              >
                <Icon className="text-signal-500 dark:text-signal-400" size={20} />
                <p className="mt-3 font-medium text-ink-900 dark:text-paper-50">{m.title}</p>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{m.detail}</p>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
