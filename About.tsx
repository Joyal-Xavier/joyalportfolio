"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      description="Independent and coursework projects spanning embedded systems, sensors, and image processing."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal delay={i * 0.08} key={project.title}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex h-full flex-col card-hover rounded-xl border border-ink-300/20 dark:border-ink-500/20 bg-white/70 dark:bg-graphite-900/70 p-6"
            >
              <p className="eyebrow">{project.tagline}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink-900 dark:text-paper-50">
                {project.title}
              </h3>
              <p className="mt-3 text-ink-500 dark:text-ink-300 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-signal-500/10 px-2.5 py-1 font-mono text-xs text-signal-500 dark:bg-signal-400/10 dark:text-signal-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <p className="text-xs font-mono uppercase tracking-wider text-ink-500 dark:text-ink-300">
                  Key features
                </p>
                <ul className="mt-2 space-y-1.5">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-ink-700 dark:text-paper-100/85"
                    >
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-copper-500 dark:text-copper-400"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <p className="text-xs font-mono uppercase tracking-wider text-ink-500 dark:text-ink-300">
                  Challenge solved
                </p>
                <p className="mt-2 text-sm text-ink-700 dark:text-paper-100/85">
                  {project.challenges}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-mono uppercase tracking-wider text-ink-500 dark:text-ink-300">
                  Outcome
                </p>
                <p className="mt-2 text-sm text-ink-700 dark:text-paper-100/85">
                  {project.outcome}
                </p>
              </div>

              <div className="mt-6 flex gap-3 pt-4 border-t border-ink-300/15 dark:border-ink-500/15">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-900 dark:text-paper-50 hover:text-signal-500 dark:hover:text-signal-400"
                  >
                    <Github size={15} /> Code
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-ink-300 dark:text-ink-500">
                    <Github size={15} /> Code coming soon
                  </span>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-signal-500 dark:text-signal-400 hover:text-signal-400"
                  >
                    <ExternalLink size={15} /> Live demo
                  </a>
                )}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
