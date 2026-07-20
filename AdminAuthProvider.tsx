import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I build with"
      description="A working toolkit spanning firmware, hardware platforms, and the software layer that ties them together."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal delay={i * 0.06} key={group.category}>
            <div className="h-full card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 p-6 transition-colors hover:border-signal-400/50">
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink-500 dark:text-ink-300">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-signal-500/30 bg-signal-500/5 px-3 py-1 text-sm text-ink-900 dark:text-paper-100 dark:border-signal-400/30 dark:bg-signal-400/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
