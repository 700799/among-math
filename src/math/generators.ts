import type { Problem, Tier } from './types';

// ---------------------------------------------------------------------------
// Procedural fluency generators. These create endless quick problems for
// warm-ups and sabotage drills, so daily practice never runs out.
// ---------------------------------------------------------------------------

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
let counter = 0;
function nextId(): string {
  counter += 1;
  return `gen-${counter}`;
}

// A fast arithmetic fact whose difficulty scales with the tier.
export function generateFluency(tier: Tier): Problem {
  const ops: Array<'+' | '−' | '×' | '÷'> = tier <= 1 ? ['+', '−'] : tier === 2 ? ['+', '−', '×'] : ['+', '−', '×', '÷'];
  const op = ops[rand(0, ops.length - 1)];
  const cap = tier === 1 ? 12 : tier === 2 ? 20 : tier === 3 ? 50 : 99;

  let a = rand(2, cap);
  let b = rand(2, cap);
  let answer: number;
  let prompt: string;

  switch (op) {
    case '+':
      answer = a + b; prompt = `${a} + ${b}`; break;
    case '−':
      if (b > a) [a, b] = [b, a];
      answer = a - b; prompt = `${a} − ${b}`; break;
    case '×':
      a = rand(2, tier >= 4 ? 25 : 12); b = rand(2, tier >= 4 ? 12 : 9);
      answer = a * b; prompt = `${a} × ${b}`; break;
    default: // ÷ — build from a product so it stays whole
      b = rand(2, tier >= 4 ? 12 : 9);
      answer = rand(2, tier >= 4 ? 12 : 9);
      a = b * answer; prompt = `${a} ÷ ${b}`; break;
  }

  return {
    id: nextId(), domain: '5.NBT', standard: 'fluency', tier, type: 'numeric',
    prompt: `Quick! ${prompt} = ?`, answer,
    hints: ['Take a breath and compute carefully.'],
    explanation: `${prompt} = ${answer}.`,
  };
}

// A quick fraction fact (same denominator) for fraction fluency.
export function generateFractionFluency(tier: Tier): Problem {
  const d = [2, 3, 4, 5, 6, 8][rand(0, tier >= 3 ? 5 : 3)];
  const x = rand(1, d - 1);
  const y = rand(1, d - 1);
  const add = Math.random() < 0.5;
  let top = add ? x + y : Math.abs(x - y);
  const prompt = add ? `${x}/${d} + ${y}/${d}` : `${Math.max(x, y)}/${d} − ${Math.min(x, y)}/${d}`;
  if (!add) top = Math.abs(x - y);
  const g = gcd(top, d) || 1;
  const simp = top === 0 ? '0' : `${top / g}/${d / g}`;
  return {
    id: nextId(), domain: '5.NF', standard: 'fluency', tier, type: 'numeric',
    prompt: `Quick! ${prompt} = ?  (answer like ${top}/${d})`,
    answer: `${top}/${d}`, acceptable: [simp, String(top / g === d / g ? 1 : '')].filter(Boolean),
    hints: ['Same denominator — just add or subtract the tops.'],
    explanation: `${prompt} = ${top}/${d}${simp !== `${top}/${d}` ? ` = ${simp}` : ''}.`,
  };
}
