import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/lib/data";
import { Cpu, Goal, Sparkles } from "lucide-react";

const strengths = [
  {
    icon: Cpu,
    label: "Hardware-software integration",
    detail: "Comfortable moving between circuits, firmware, and code.",
  },
  {
    icon: Sparkles,
    label: "Fast, hands-on learner",
    detail: "Picks up new tools and platforms quickly through building.",
  },
  {
    icon: Goal,
    label: "Outcome-focused",
    detail: "Builds working prototypes, not just theoretical designs.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="From breadboard to prototype"
      description="A closer look at how I got here and what drives my work."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {profile.aboutParagraphs.map((p, i) => (
            <Reveal delay={i * 0.05} key={i}>
              <p className="text-ink-700 dark:text-paper-100/85 leading-relaxed">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="space-y-4">
          {strengths.map((s, i) => (
            <Reveal delay={i * 0.08} key={s.label}>
              <div className="card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 p-5">
                <s.icon className="text-signal-500 dark:text-signal-400" size={20} />
                <p className="mt-3 font-medium text-ink-900 dark:text-paper-50">
                  {s.label}
                </p>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
                  {s.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
