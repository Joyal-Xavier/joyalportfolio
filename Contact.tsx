"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginWidget } from "@/components/LoginWidget";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pm-vikas", label: "PM-VIKAS" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-paper-50/80 dark:bg-graphite-950/80 backdrop-blur-md border-b border-ink-300/10 dark:border-ink-500/10"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Primary">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-wide text-ink-900 dark:text-paper-50"
        >
          JX<span className="text-copper-500 dark:text-copper-400">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  active
                    ? "text-signal-500 dark:text-signal-400"
                    : "text-ink-700 dark:text-paper-100/80 hover:text-signal-500 dark:hover:text-signal-400"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-signal-500 dark:bg-signal-400" />
                )}
              </Link>
            );
          })}
          <div className="ml-3 flex items-center gap-3 border-l border-ink-300/20 dark:border-ink-500/20 pl-3">
            <LoginWidget />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-300/30 dark:border-ink-500/30"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink-300/10 dark:border-ink-500/10 bg-paper-50/95 dark:bg-graphite-950/95 backdrop-blur-md">
          <div className="flex flex-col px-6 py-4 gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-2 py-2.5 text-sm font-medium rounded-md",
                  pathname === item.href
                    ? "text-signal-500 dark:text-signal-400"
                    : "text-ink-700 dark:text-paper-100/80"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 px-2">
              <LoginWidget />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
