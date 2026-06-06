import type { Tier } from './types';

// ---------------------------------------------------------------------------
// Adaptive engine. Mirrors how NWEA MAP adjusts: a correct answer nudges the
// next question harder, a miss nudges it easier. We also keep a running
// RIT-like estimate so kids/parents can track progress toward ~235-250+.
// ---------------------------------------------------------------------------

// Center RIT of each tier (rough 5th-grade-to-MAP mapping).
const TIER_RIT: Record<Tier, number> = { 1: 207, 2: 222, 3: 237, 4: 250 };

export const RIT_GOAL = 235; // SRVUSD Course 3 "aim high" target (≈90th %ile)
export const RIT_MIN = 180;
export const RIT_MAX = 265;

export function tierForRit(rit: number): Tier {
  if (rit < 215) return 1;
  if (rit < 230) return 2;
  if (rit < 245) return 3;
  return 4;
}

export function ritForTier(tier: Tier): number {
  return TIER_RIT[tier];
}

// Update a running RIT estimate after one answer.
// Correct on a hard item raises more; a miss on an easy item drops more.
export function updateRit(currentRit: number, itemTier: Tier, correct: boolean): number {
  const itemRit = TIER_RIT[itemTier];
  const gap = itemRit - currentRit; // positive if the item was above the student
  let delta: number;
  if (correct) {
    delta = 4 + Math.max(0, gap) * 0.3; // bonus for beating a harder item
  } else {
    delta = -(4 + Math.max(0, -gap) * 0.3); // bigger drop for missing an easy item
  }
  const next = currentRit + delta;
  return Math.round(Math.min(RIT_MAX, Math.max(RIT_MIN, next)));
}

// Choose the next item's tier from the current RIT, with a little variety.
export function nextTier(currentRit: number, lastCorrect: boolean | null): Tier {
  let base = tierForRit(currentRit);
  if (lastCorrect === true && base < 4 && Math.random() < 0.5) base = (base + 1) as Tier;
  if (lastCorrect === false && base > 1 && Math.random() < 0.5) base = (base - 1) as Tier;
  return base;
}

// Percentile-ish label for encouragement (not an official MAP norm).
export function ritBadge(rit: number): { label: string; pct: number } {
  const pct = Math.round(Math.min(99, Math.max(5, ((rit - 195) / (255 - 195)) * 99)));
  let label = 'Keep going!';
  if (rit >= 250) label = 'Course 3 superstar! 🌟';
  else if (rit >= RIT_GOAL) label = 'Course 3 ready! 🚀';
  else if (rit >= 225) label = 'Almost there! 💪';
  else if (rit >= 210) label = 'Building skills! 📈';
  return { label, pct };
}
