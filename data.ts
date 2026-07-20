import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked"
      description="Internships that took me from lab exercises to real hardware and infrastructure."
    >
      <div className="relative border-l border-ink-300/25 dark:border-ink-500/25 pl-8 space-y-12">
        {experience.map((job, i) => (
          <Reveal delay={i * 0.1} key={job.role}>
            <div className="relative">
              <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full bg-signal-500 dark:bg-signal-400 ring-4 ring-paper-50 dark:ring-graphite-950" />
              <p className="font-mono text-xs tracking-wider text-copper-500 dark:text-copper-400">
                {job.duration}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-ink-900 dark:text-paper-50">
                {job.role}
              </h3>
              <p className="text-signal-500 dark:text-signal-400">{job.org}</p>
              <ul className="mt-3 space-y-2">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-ink-700 dark:text-paper-100/85"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-300 dark:bg-ink-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
