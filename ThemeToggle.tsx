import { Trophy } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { AchievementsGallery } from "@/components/AchievementsGallery";
import { achievements } from "@/lib/data";

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Leadership & volunteering"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal delay={i * 0.08} key={a.title}>
            <div className="flex h-full gap-4 card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 p-6">
              <Trophy
                size={20}
                className="shrink-0 text-copper-500 dark:text-copper-400"
              />
              <div>
                <h3 className="font-medium text-ink-900 dark:text-paper-50">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
                  {a.detail}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <AchievementsGallery />
    </Section>
  );
}
