import { BadgeCheck } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Certifications & training"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal delay={i * 0.06} key={cert.title}>
            <div className="h-full card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 p-6">
              <BadgeCheck
                size={20}
                className="text-copper-500 dark:text-copper-400"
              />
              <h3 className="mt-3 font-medium text-ink-900 dark:text-paper-50">
                {cert.title}
              </h3>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
                {cert.issuer}
                {cert.year ? ` · ${cert.year}` : ""}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
