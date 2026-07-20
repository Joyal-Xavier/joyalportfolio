import { Pool } from "pg";
import { pmVikasLog } from "@/lib/data";

// Uses whatever Postgres connection string Vercel injects once you connect a
// database (Neon or Supabase) from the Storage tab of your Vercel project.
// Locally, set DATABASE_URL in a .env.local file to point at the same database.
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. In Vercel: Project -> Storage -> Connect Database (Neon or Supabase), " +
          "which adds this automatically. Locally: add it to a .env.local file."
      );
    }
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

let tableReady: Promise<void> | null = null;

async function seedInitialLog(): Promise<void> {
  // Only seeds if the table is empty, so it never overwrites real edits made later.
  const { rows } = await getPool().query<{ count: string }>(
    "SELECT COUNT(*)::text as count FROM pm_vikas_progress"
  );
  if (Number(rows[0]?.count ?? "0") > 0) return;

  for (const entry of pmVikasLog) {
    const text = `${entry.title}\n\n${entry.text}`;
    await getPool().query(
      `INSERT INTO pm_vikas_progress (date_key, entry_text, updated_at)
       VALUES ($1, $2, now())
       ON CONFLICT (date_key) DO NOTHING`,
      [entry.date, text]
    );
  }
}

function ensureTable(): Promise<void> {
  if (!tableReady) {
    tableReady = getPool()
      .query(
        `CREATE TABLE IF NOT EXISTS pm_vikas_progress (
           date_key TEXT PRIMARY KEY,
           entry_text TEXT NOT NULL,
           updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
         );`
      )
      .then(() => seedInitialLog());
  }
  return tableReady;
}

export interface ProgressRow {
  date_key: string;
  entry_text: string;
  updated_at: string;
}

export async function getAllEntries(): Promise<ProgressRow[]> {
  await ensureTable();
  const { rows } = await getPool().query<ProgressRow>(
    "SELECT date_key, entry_text, updated_at FROM pm_vikas_progress ORDER BY date_key DESC"
  );
  return rows;
}

export async function upsertEntry(dateKey: string, text: string): Promise<void> {
  await ensureTable();
  await getPool().query(
    `INSERT INTO pm_vikas_progress (date_key, entry_text, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (date_key) DO UPDATE SET entry_text = EXCLUDED.entry_text, updated_at = now()`,
    [dateKey, text]
  );
}

export async function deleteEntry(dateKey: string): Promise<void> {
  await ensureTable();
  await getPool().query("DELETE FROM pm_vikas_progress WHERE date_key = $1", [dateKey]);
}
