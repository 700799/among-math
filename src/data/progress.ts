import type { Domain } from '../math/types';
import { ALL_DOMAINS } from '../math/index';
import { ritForTier } from '../math/adaptive';

// ---------------------------------------------------------------------------
// All persistence funnels through here: one versioned localStorage key.
// Tracks the crewmate choice, coins, unlocks, per-domain mastery & RIT,
// missed problems for review, and MAP practice-test history.
// ---------------------------------------------------------------------------

const KEY = 'among-math:v1';

export interface DomainStat {
  attempts: number;
  correct: number;
  rit: number;      // running RIT estimate for this domain
  completed: boolean; // task finished at least once this run
}

export interface TestRecord {
  date: string;   // ISO date
  rit: number;
  correct: number;
  total: number;
}

export interface SaveData {
  name: string;
  colorIndex: number;
  coins: number;
  bestRit: number;
  streak: number;
  muted: boolean;
  unlocks: string[];        // cosmetic/reward ids
  equippedHat: string | null;
  equippedPet: string | null;
  missed: string[];         // authored problem ids answered wrong (for review)
  tests: TestRecord[];      // MAP practice test history (most recent first)
  stats: Record<Domain, DomainStat>;
}

function freshStats(): Record<Domain, DomainStat> {
  const s = {} as Record<Domain, DomainStat>;
  for (const d of ALL_DOMAINS) {
    s[d] = { attempts: 0, correct: 0, rit: ritForTier(1), completed: false };
  }
  return s;
}

function defaults(): SaveData {
  return {
    name: 'Crewmate',
    colorIndex: 1,
    coins: 0,
    bestRit: ritForTier(1),
    streak: 0,
    muted: false,
    unlocks: [],
    equippedHat: null,
    equippedPet: null,
    missed: [],
    tests: [],
    stats: freshStats(),
  };
}

let cache: SaveData | null = null;

export function load(): SaveData {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      // Backfill any fields/domains added since the save was written.
      const base = defaults();
      cache = { ...base, ...parsed, stats: { ...base.stats, ...(parsed.stats ?? {}) } };
      return cache;
    }
  } catch {
    /* ignore corrupt save */
  }
  cache = defaults();
  return cache;
}

export function save(data: SaveData): void {
  cache = data;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage may be unavailable; keep in-memory */
  }
}

export function update(mut: (d: SaveData) => void): SaveData {
  const d = load();
  mut(d);
  save(d);
  return d;
}

// Overall RIT = average of domain RITs (kept in sync with bestRit).
export function overallRit(d: SaveData = load()): number {
  const vals = ALL_DOMAINS.map((dom) => d.stats[dom].rit);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

// Remember a missed authored problem so the kid can review it later.
// Generated drill items (gen-*) are skipped — they can't be looked up again.
export function recordMiss(problemId: string): void {
  if (problemId.startsWith('gen-')) return;
  update((d) => {
    if (!d.missed.includes(problemId)) {
      d.missed.push(problemId);
      if (d.missed.length > 30) d.missed.shift();
    }
  });
}

export function clearMiss(problemId: string): void {
  update((d) => {
    d.missed = d.missed.filter((id) => id !== problemId);
  });
}

export function recordTest(rec: TestRecord): void {
  update((d) => {
    d.tests.unshift(rec);
    if (d.tests.length > 5) d.tests.length = 5;
  });
}

export function resetAll(): void {
  cache = defaults();
  save(cache);
}
