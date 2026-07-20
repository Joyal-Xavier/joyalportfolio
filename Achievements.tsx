"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Save, Trash2, Lock, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/components/AdminAuthProvider";

interface EntryMap {
  [dateKey: string]: { text: string; updatedAt?: string };
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}
function keyFor(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}
function labelFor(y: number, m: number, d: number) {
  return new Date(y, m, d).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function PmVikasCalendar() {
  const { isAdmin, password } = useAdminAuth();
  const today = useMemo(() => new Date(), []);

  const [entries, setEntries] = useState<EntryMap>({});
  const [loading, setLoading] = useState(true);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedKey, setSelectedKey] = useState(
    keyFor(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const loadEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/progress");
      const data = await res.json();
      if (data.ok) {
        const map: EntryMap = {};
        for (const row of data.entries as { date_key: string; entry_text: string; updated_at: string }[]) {
          map[row.date_key] = { text: row.entry_text, updatedAt: row.updated_at };
        }
        setEntries(map);

        const keys = Object.keys(map).sort().reverse();
        const currentMonthPrefix = `${viewYear}-${pad(viewMonth + 1)}`;
        const hasCurrentMonthEntry = keys.some((k) => k.startsWith(currentMonthPrefix));
        if (!hasCurrentMonthEntry && keys.length > 0) {
          const [y, m] = keys[0].split("-").map(Number);
          setViewYear(y);
          setViewMonth(m - 1);
          setSelectedKey(keys[0]);
        }
      } else {
        setStatus({ type: "error", message: data.error || "Could not load entries." });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Could not reach the database. Make sure DATABASE_URL is configured.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDraft(entries[selectedKey]?.text ?? "");
    setStatus({ type: "idle", message: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey]);

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  const goToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedKey(keyFor(today.getFullYear(), today.getMonth(), today.getDate()));
  };

  const handleSave = async () => {
    const text = draft.trim();
    if (!text) {
      setStatus({ type: "error", message: "Write something before saving." });
      return;
    }
    setSaving(true);
    setStatus({ type: "idle", message: "" });
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedKey, text, password }),
      });
      const data = await res.json();
      if (data.ok) {
        setEntries((prev) => ({ ...prev, [selectedKey]: { text } }));
        setStatus({ type: "success", message: "Saved — this update is now live in the database." });
      } else {
        setStatus({ type: "error", message: data.error || "Save failed." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error — could not save." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!entries[selectedKey]) {
      setStatus({ type: "error", message: "Nothing to delete for this day." });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/progress", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedKey, password }),
      });
      const data = await res.json();
      if (data.ok) {
        setEntries((prev) => {
          const next = { ...prev };
          delete next[selectedKey];
          return next;
        });
        setDraft("");
        setStatus({ type: "success", message: "Entry deleted from the database." });
      } else {
        setStatus({ type: "error", message: data.error || "Delete failed." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error — could not delete." });
    } finally {
      setSaving(false);
    }
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const todayKey = keyFor(today.getFullYear(), today.getMonth(), today.getDate());

  const stats = useMemo(() => {
    const keys = Object.keys(entries);
    const monthPrefix = `${viewYear}-${pad(viewMonth + 1)}`;
    const monthCount = keys.filter((k) => k.startsWith(monthPrefix)).length;

    let streak = 0;
    const cursor = new Date();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const k = keyFor(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
      if (entries[k]) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return { total: keys.length, monthCount, streak };
  }, [entries, viewYear, viewMonth]);

  const recent = useMemo(
    () => Object.entries(entries).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 15),
    [entries]
  );

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="space-y-6">
      {!isAdmin && (
        <div className="flex items-center gap-2 card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 px-4 py-3 text-sm text-ink-500 dark:text-ink-300">
          <Lock size={14} />
          Viewing in read-only mode. Log in from the top bar to add or edit entries.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Days logged" value={stats.total} />
        <StatCard label="Logged this month" value={stats.monthCount} />
        <StatCard label="Current streak" value={stats.streak} />
      </div>

      <div className="card-hover rounded-xl border border-ink-300/20 dark:border-ink-500/20 bg-white/70 dark:bg-graphite-900/70 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-ink-300/30 dark:border-ink-500/30 hover:border-signal-400"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-ink-300/30 dark:border-ink-500/30 hover:border-signal-400"
            >
              <ChevronRight size={15} />
            </button>
          </div>
          <p className="font-semibold text-ink-900 dark:text-paper-50">
            {new Date(viewYear, viewMonth, 1).toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </p>
          <button
            onClick={goToday}
            className="rounded-md border border-ink-300/30 dark:border-ink-500/30 px-3 py-1.5 text-xs font-medium hover:border-copper-400 hover:text-copper-500 dark:hover:text-copper-400"
          >
            Today
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-500 dark:text-ink-300 text-center mb-2">
          {WEEKDAYS.map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {loading
            ? Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-md bg-ink-300/10 dark:bg-ink-500/10 animate-pulse" />
              ))
            : cells.map((d, i) => {
                if (d === null) return <div key={`empty-${i}`} />;
                const dateKey = keyFor(viewYear, viewMonth, d);
                const isToday = dateKey === todayKey;
                const isSelected = dateKey === selectedKey;
                const hasEntry = Boolean(entries[dateKey]);

                return (
                  <button
                    key={dateKey}
                    onClick={() => setSelectedKey(dateKey)}
                    className={cn(
                      "relative aspect-square rounded-md border text-sm transition-colors",
                      "border-ink-300/20 dark:border-ink-500/20 bg-white/40 dark:bg-graphite-800/40",
                      isToday && "border-signal-500 dark:border-signal-400",
                      hasEntry && "bg-copper-400/10 border-copper-400/40",
                      isSelected && "bg-signal-500/10 border-signal-500"
                    )}
                  >
                    {d}
                    {hasEntry && (
                      <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-copper-500 dark:bg-copper-400" />
                    )}
                  </button>
                );
              })}
        </div>
      </div>

      <div className="card-hover rounded-xl border border-ink-300/20 dark:border-ink-500/20 bg-white/70 dark:bg-graphite-900/70 p-5">
        <p className="mb-2 font-mono text-xs tracking-wider text-copper-500 dark:text-copper-400">
          {labelFor(viewYear, viewMonth, Number(selectedKey.split("-")[2]))}
        </p>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          disabled={!isAdmin}
          placeholder={
            isAdmin
              ? "What did you cover today in the PM-VIKAS IoT training? e.g. Sensor interfacing module, ESP32 lab session, assessment prep..."
              : "Log in as admin to add today's update."
          }
          className="w-full rounded-md border border-ink-300/30 dark:border-ink-500/30 bg-transparent px-3 py-2 text-sm text-ink-900 dark:text-paper-50 outline-none focus:border-signal-500 disabled:opacity-60"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            onClick={handleSave}
            disabled={!isAdmin || saving}
            className="inline-flex items-center gap-2 rounded-md bg-signal-500 px-4 py-2 text-sm font-medium text-white hover:bg-signal-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={14} /> {saving ? "Saving..." : "Save entry"}
          </button>
          <button
            onClick={handleDelete}
            disabled={!isAdmin || saving}
            className="inline-flex items-center gap-2 rounded-md border border-ink-300/30 dark:border-ink-500/30 px-4 py-2 text-sm text-ink-500 dark:text-ink-300 hover:border-red-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={14} /> Delete
          </button>
          {status.type === "success" && (
            <span className="inline-flex items-center gap-1.5 text-sm text-copper-500 dark:text-copper-400">
              <CheckCircle2 size={14} /> {status.message}
            </span>
          )}
          {status.type === "error" && (
            <span className="inline-flex items-center gap-1.5 text-sm text-red-500">
              <XCircle size={14} /> {status.message}
            </span>
          )}
        </div>
      </div>

      <div className="card-hover rounded-xl border border-ink-300/20 dark:border-ink-500/20 bg-white/70 dark:bg-graphite-900/70 p-5">
        <h3 className="mb-4 font-semibold text-ink-900 dark:text-paper-50">Recent entries</h3>
        {loading ? (
          <p className="text-sm text-ink-500 dark:text-ink-300">Loading...</p>
        ) : recent.length === 0 ? (
          <p className="text-sm text-ink-500 dark:text-ink-300">
            No entries yet. {isAdmin ? "Pick a day above and log the first update." : "Check back once training updates are logged."}
          </p>
        ) : (
          <ul className="space-y-3">
            {recent.map(([dateKey, entry]) => (
              <li key={dateKey} className="border-l-2 border-copper-400 pl-3">
                <p className="font-mono text-xs text-copper-500 dark:text-copper-400">
                  {new Date(`${dateKey}T00:00:00`).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-ink-700 dark:text-paper-100/85">
                  {entry.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-hover rounded-lg border border-ink-300/20 dark:border-ink-500/20 bg-white/60 dark:bg-graphite-900/60 p-4">
      <p className="text-2xl font-semibold text-ink-900 dark:text-paper-50">{value}</p>
      <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">{label}</p>
    </div>
  );
}
