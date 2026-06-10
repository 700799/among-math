import type { Problem, Lesson, Domain, Tier } from './types';
import { generateFluency, generateFractionFluency, generateDecimalFluency, generatePowerOfTen } from './generators';
import { nextTier } from './adaptive';

import * as oa from './bank/oa';
import * as nbt from './bank/nbt';
import * as nf from './bank/nf';
import * as md from './bank/md';
import * as geo from './bank/geo';
import * as bridge from './bank/bridge';

// Single source of truth: every authored problem & lesson, by domain.
const BANKS: Record<Domain, { problems: Problem[]; lessons: Lesson[] }> = {
  '5.OA': oa, '5.NBT': nbt, '5.NF': nf, '5.MD': md, '5.G': geo, 'bridge': bridge,
};

export const ALL_DOMAINS: Domain[] = ['5.NF', '5.NBT', '5.OA', '5.MD', '5.G', 'bridge'];

export function getLessons(domain: Domain): Lesson[] {
  return BANKS[domain].lessons;
}

export function getProblems(domain: Domain): Problem[] {
  return BANKS[domain].problems;
}

export function getProblemById(id: string): Problem | undefined {
  for (const d of ALL_DOMAINS) {
    const p = BANKS[d].problems.find((x) => x.id === id);
    if (p) return p;
  }
  return undefined;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick ONE problem from a domain near the student's current level — called
// after every answer so difficulty truly adapts mid-set, just like NWEA MAP.
export function pickProblem(
  domain: Domain,
  currentRit: number,
  used: Set<string>,
  lastCorrect: boolean | null
): Problem {
  const tier = nextTier(currentRit, lastCorrect);
  const pool = getProblems(domain);
  const sorted = shuffle(pool).sort(
    (a, b) => Math.abs(a.tier - tier) - Math.abs(b.tier - tier)
  );
  const fresh = sorted.find((p) => !used.has(p.id));
  return fresh ?? sorted[0];
}

// Domain sequence for a MAP practice test — weighted like the real thing
// (fractions & decimals heaviest), then shuffled so topics interleave.
export function buildTestPlan(): Domain[] {
  const plan: Domain[] = [
    '5.NF', '5.NF', '5.NF', '5.NF',
    '5.NBT', '5.NBT', '5.NBT',
    '5.OA', '5.OA',
    '5.MD', '5.MD', '5.MD',
    '5.G', '5.G',
    'bridge',
  ];
  return shuffle(plan);
}

// A timed fluency drill (sabotage). Mix of arithmetic, fraction, decimal,
// and powers-of-ten quick facts.
export function getFluencyDrill(currentRit: number, count = 5): Problem[] {
  const tier = nextTier(currentRit, null);
  const out: Problem[] = [];
  const makers: Array<(t: Tier) => Problem> = [
    generateFluency, generateFluency, generateFractionFluency, generateDecimalFluency, generatePowerOfTen,
  ];
  for (let i = 0; i < count; i++) {
    out.push(makers[Math.floor(Math.random() * makers.length)](tier));
  }
  return out;
}

// Loose answer checker shared by every scene.
export function checkAnswer(problem: Problem, raw: string): boolean {
  const norm = (s: string) =>
    s.toLowerCase().trim().replace(/\s+/g, '').replace(/[$°]/g, '').replace('cups', '').replace('cup', '');
  const given = norm(raw);
  if (given === '') return false;

  const candidates = [String(problem.answer), ...(problem.acceptable ?? [])].map(norm);
  if (candidates.includes(given)) return true;

  // Numeric tolerance (handles 0.3 vs .30, trailing zeros, etc.)
  const gNum = Number(given);
  if (!Number.isNaN(gNum)) {
    for (const c of candidates) {
      const cNum = Number(c);
      if (!Number.isNaN(cNum) && Math.abs(cNum - gNum) < 1e-6) return true;
    }
  }

  // Constructed-response: accept if any key word/phrase is present.
  if (problem.type === 'constructed') {
    return candidates.some((c) => c.length > 0 && given.includes(c));
  }
  return false;
}

export type { Problem, Lesson, Domain, Tier };
