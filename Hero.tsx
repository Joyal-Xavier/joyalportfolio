import { GraduationCap } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { education } from "@/lib/data";

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <div className="grid gap-5 sm:grid-cols-2">
        {education.map((ed, i) => (
          <Reveal delay={i * 0.08} key={ed.school}>
            <div className="h-full card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 p-6">
              <GraduationCap
                size={22}
                className="text-signal-500 dark:text-signal-400"
              />
              <p className="mt-3 font-mono text-xs tracking-wider text-copper-500 dark:text-copper-400">
                {ed.duration}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-ink-900 dark:text-paper-50">
                {ed.school}
              </h3>
              <p className="mt-1 text-ink-700 dark:text-paper-100/85">
                {ed.detail}
              </p>
              {ed.board && (
                <p className="text-sm text-ink-500 dark:text-ink-300">
                  {ed.board}
                </p>
              )}
              {ed.note && (
                <p className="mt-2 text-sm font-medium text-signal-500 dark:text-signal-400">
                  {ed.note}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
