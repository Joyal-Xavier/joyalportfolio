"use client";

import { useState } from "react";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/lib/data";

const infoItems = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/joyalxaviera", href: contact.linkedin },
  { icon: Github, label: "GitHub", value: "Add your GitHub link", href: contact.github },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Open to internships and entry-level roles in embedded systems, IoT, and software engineering."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {infoItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "LinkedIn" || item.label === "GitHub" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 p-4 transition-colors hover:border-signal-400/50"
              >
                <item.icon size={18} className="text-signal-500 dark:text-signal-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-ink-500 dark:text-ink-300">{item.label}</p>
                  <p className="truncate text-sm font-medium text-ink-900 dark:text-paper-50">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-ink-900 dark:text-paper-50">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 w-full rounded-md border border-ink-300/30 dark:border-ink-500/30 bg-transparent px-3 py-2 text-sm text-ink-900 dark:text-paper-50 outline-none focus:border-signal-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink-900 dark:text-paper-50">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 w-full rounded-md border border-ink-300/30 dark:border-ink-500/30 bg-transparent px-3 py-2 text-sm text-ink-900 dark:text-paper-50 outline-none focus:border-signal-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-ink-900 dark:text-paper-50">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5 w-full rounded-md border border-ink-300/30 dark:border-ink-500/30 bg-transparent px-3 py-2 text-sm text-ink-900 dark:text-paper-50 outline-none focus:border-signal-500"
                placeholder="What would you like to talk about?"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-signal-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-signal-400"
            >
              <Send size={15} />
              Send Message
            </button>
            {sent && (
              <p className="text-sm text-copper-500 dark:text-copper-400">
                Opening your email client to send this message.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
