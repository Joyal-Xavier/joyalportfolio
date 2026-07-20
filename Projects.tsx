"use client";

import { useState } from "react";
import { LogIn, ShieldCheck } from "lucide-react";
import { useAdminAuth } from "@/components/AdminAuthProvider";

export function LoginWidget() {
  const { isAdmin, login, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAdmin) {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-copper-400/10 px-3 py-1.5 text-xs font-medium text-copper-500 dark:text-copper-400">
          <ShieldCheck size={13} /> Admin active
        </span>
        <button
          onClick={logout}
          className="text-xs text-ink-500 dark:text-ink-300 hover:text-signal-500 dark:hover:text-signal-400"
        >
          Log out
        </button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const ok = await login(pwd);
    setLoading(false);
    if (ok) {
      setOpen(false);
      setPwd("");
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 items-center gap-1.5 rounded-full border border-ink-300/30 dark:border-ink-500/30 px-3 text-xs font-medium text-ink-700 dark:text-paper-100 hover:border-copper-400 hover:text-copper-500 dark:hover:text-copper-400"
      >
        <LogIn size={13} /> Login
      </button>
      {open && (
        <form
          onSubmit={submit}
          className="absolute right-0 top-10 z-50 w-60 card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-paper-50 dark:bg-graphite-900 p-4 shadow-xl"
        >
          <label className="text-xs font-medium text-ink-500 dark:text-ink-300">
            Admin password
          </label>
          <input
            type="password"
            autoFocus
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Enter your password"
            className="mt-1.5 w-full rounded-md border border-ink-300/30 dark:border-ink-500/30 bg-transparent px-2.5 py-1.5 text-sm outline-none focus:border-signal-500"
          />
          {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full rounded-md bg-signal-500 py-1.5 text-xs font-medium text-white hover:bg-signal-400 disabled:opacity-60"
          >
            {loading ? "Checking..." : "Log in"}
          </button>
        </form>
      )}
    </div>
  );
}
