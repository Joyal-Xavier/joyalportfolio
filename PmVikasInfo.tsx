import { Github, Linkedin, Mail } from "lucide-react";
import { contact, profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-300/15 dark:border-ink-500/15 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-sm text-ink-500 dark:text-ink-300">
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="text-ink-500 dark:text-ink-300 hover:text-signal-500 dark:hover:text-signal-400"
          >
            <Mail size={18} />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-ink-500 dark:text-ink-300 hover:text-signal-500 dark:hover:text-signal-400"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink-500 dark:text-ink-300 hover:text-signal-500 dark:hover:text-signal-400"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
