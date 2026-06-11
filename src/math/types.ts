// ---------------------------------------------------------------------------
// Math content model. Everything the game asks the kid is a `Problem`.
// Problems are data, so we can grow the bank without touching game code.
// ---------------------------------------------------------------------------

export type Domain = '5.OA' | '5.NBT' | '5.NF' | '5.MD' | '5.G' | 'bridge';

export const DOMAIN_INFO: Record<Domain, { label: string; short: string; blurb: string }> = {
  '5.OA': { label: 'Expressions & Patterns', short: 'OA', blurb: 'Order of operations, writing expressions, number patterns.' },
  '5.NBT': { label: 'Place Value & Decimals', short: 'NBT', blurb: 'Powers of 10, rounding, and decimal arithmetic.' },
  '5.NF': { label: 'Fractions', short: 'NF', blurb: 'Add, subtract, multiply, and divide fractions. (Most important!)' },
  '5.MD': { label: 'Measurement & Volume', short: 'MD', blurb: 'Unit conversions, line plots, and volume of solids.' },
  '5.G': { label: 'Geometry & Coordinates', short: 'G', blurb: 'Coordinate plane and classifying shapes.' },
  'bridge': { label: 'Course 3 Bridge', short: 'C3', blurb: 'Ratios, integers, and equations for advancement.' },
};

// RIT-aligned difficulty tiers. Higher = harder = higher MAP RIT score.
//  Tier 1 ~200-215 | Tier 2 ~215-230 | Tier 3 ~230-245 | Tier 4 245+
export type Tier = 1 | 2 | 3 | 4;

export type QuestionType = 'multiple-choice' | 'numeric' | 'constructed';

// Declarative diagrams drawn with Phaser Graphics (no image assets needed).
export type DiagramSpec =
  | { kind: 'coordinate'; points: { x: number; y: number; label?: string }[]; max?: number }
  | { kind: 'prism'; l: number; w: number; h: number }
  | { kind: 'fractionBar'; parts: number; shaded: number; second?: { parts: number; shaded: number } }
  | { kind: 'numberLine'; min: number; max: number; ticks: number; mark?: number }
  | { kind: 'shape'; shape: 'square' | 'rectangle' | 'rhombus' | 'trapezoid' | 'triangle' | 'parallelogram' }
  | { kind: 'barModel'; segments: number; labeled: number };

// One fully worked solution strategy. Every problem teaches 2-3 of these so
// kids see multiple ways to think (algorithm, visual model, estimation...).
export interface Solution {
  title: string;     // e.g. "Way 1: Common denominators"
  steps: string[];   // complete worked steps, kid-friendly, ending in the answer
}

export interface Problem {
  id: string;
  domain: Domain;
  standard: string;        // e.g. "5.NF.1"
  tier: Tier;
  type: QuestionType;
  prompt: string;
  diagram?: DiagramSpec;
  choices?: string[];      // for multiple-choice
  answer: string | number; // exact answer (numeric compares loosely)
  acceptable?: string[];   // extra accepted text answers (numeric/constructed)
  hints: string[];         // shown one at a time on a miss
  explanation: string;     // one-sentence quick takeaway (drill-mode flash)
  solutions: Solution[];   // 2-3 fully worked methods (practice/review modes)
}

// A short teaching card shown BEFORE practice so kids learn the skill first.
export interface Lesson {
  domain: Domain;
  standard: string;
  title: string;
  steps: string[];         // kid-friendly "how to do it" steps
  example: string;         // one fully worked example
  tip?: string;            // a MAP test-taking or mastery tip
}
