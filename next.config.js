// Single hardcoded admin password, as requested — set ADMIN_PASSWORD in your
// Vercel project's Environment Variables to override the fallback below.
// This is intentionally simple (one shared password, no user accounts),
// matching a personal portfolio's needs rather than a multi-user system.
const FALLBACK_PASSWORD = "pmvikas2026";

export function isValidPassword(candidate: unknown): boolean {
  if (typeof candidate !== "string" || candidate.length === 0) return false;
  const expected = process.env.ADMIN_PASSWORD || FALLBACK_PASSWORD;
  return candidate === expected;
}
