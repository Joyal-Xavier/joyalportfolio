"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink-300/30 dark:border-ink-500/30 text-ink-700 dark:text-paper-100 transition-colors hover:border-copper-400 hover:text-copper-500 dark:hover:text-copper-400"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
