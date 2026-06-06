import type { Problem, Lesson } from '../types';

// ===========================================================================
// bridge — Course 3 readiness: ratios/rates/%, integers, simple equations
// These go BEYOND 5th grade to show acceleration readiness for SRVUSD MAP.
// ===========================================================================

export const lessons: Lesson[] = [
  {
    domain: 'bridge', standard: '6.RP.1',
    title: 'Ratios, Rates & Percent',
    steps: [
      'A ratio compares two amounts, like 3 : 2 or 3 to 2.',
      'A unit rate is "per one" — divide to get it (miles per hour).',
      'Percent means "out of 100": 25% = 25/100 = 0.25.',
      'To find a percent of a number, multiply by its decimal form.',
    ],
    example: '20% of 50 = 0.20 × 50 = 10.',
    tip: 'Build a ratio table to scale up or down without mistakes.',
  },
  {
    domain: 'bridge', standard: '6.NS.5',
    title: 'Integers (Negative Numbers)',
    steps: [
      'Negative numbers are LEFT of 0 on the number line.',
      'The farther left, the smaller: −5 < −2.',
      'Adding a negative moves you left; subtracting a negative moves you right.',
      'Opposite numbers (3 and −3) are the same distance from 0.',
    ],
    example: '−3 + 5 = 2 (start at −3, move 5 right).',
    tip: 'Think of temperatures or money owed to picture negatives.',
  },
  {
    domain: 'bridge', standard: '6.EE.7',
    title: 'Solve Simple Equations',
    steps: [
      'A variable (like x) stands for an unknown number.',
      'Do the OPPOSITE operation to undo what is around x.',
      'Whatever you do to one side, do to the other side too.',
      'Check by plugging your answer back in.',
    ],
    example: 'x + 4 = 10 → subtract 4 from both sides → x = 6.',
    tip: 'Keep the equation "balanced" like a scale — both sides stay equal.',
  },
];

export const problems: Problem[] = [
  { id: 'br-1', domain: 'bridge', standard: '6.NS.5', tier: 1, type: 'multiple-choice',
    prompt: 'Which number is smaller: −4 or −1?',
    diagram: { kind: 'numberLine', min: -5, max: 5, ticks: 10, mark: -4 },
    choices: ['−4', '−1', 'They are equal', 'Cannot tell'], answer: '−4',
    hints: ['Farther left = smaller.'],
    explanation: '−4 is farther left on the number line, so −4 < −1.' },
  { id: 'br-2', domain: 'bridge', standard: '6.RP.3', tier: 1, type: 'numeric',
    prompt: 'What is 50% of 30?', answer: '15', acceptable: ['15'],
    hints: ['50% = half.'],
    explanation: '50% means half, so 30 ÷ 2 = 15.' },
  { id: 'br-3', domain: 'bridge', standard: '6.EE.7', tier: 2, type: 'numeric',
    prompt: 'Solve for x:  x + 7 = 12', answer: '5', acceptable: ['5', 'x=5'],
    hints: ['Undo +7 by subtracting 7 from both sides.'],
    explanation: 'x + 7 = 12 → x = 12 − 7 = 5.' },
  { id: 'br-4', domain: 'bridge', standard: '6.RP.2', tier: 2, type: 'numeric',
    prompt: 'A car goes 120 miles in 2 hours. What is the unit rate in miles per hour?',
    answer: '60', acceptable: ['60', '60 mph'],
    hints: ['Per ONE hour: divide by 2.'],
    explanation: '120 ÷ 2 = 60 miles per hour.' },
  { id: 'br-5', domain: 'bridge', standard: '6.NS.5', tier: 3, type: 'numeric',
    prompt: 'The temperature is −3°C and rises 8°C. What is the new temperature?',
    answer: '5', acceptable: ['5', '5°C', '5 C'],
    hints: ['Start at −3, move 8 right.'],
    explanation: '−3 + 8 = 5°C.' },
  { id: 'br-6', domain: 'bridge', standard: '6.RP.3', tier: 3, type: 'numeric',
    prompt: 'A shirt costs $40. It is 25% off. What is the SALE price in dollars?',
    answer: '30', acceptable: ['30', '$30'],
    hints: ['25% of 40 = 0.25 × 40 = 10 off.', '40 − 10.'],
    explanation: '25% of 40 is 10; sale price = 40 − 10 = $30.' },
  { id: 'br-7', domain: 'bridge', standard: '6.EE.7', tier: 4, type: 'numeric',
    prompt: 'Solve for x:  3x = 21', answer: '7', acceptable: ['7', 'x=7'],
    hints: ['3 times x = 21.', 'Divide both sides by 3.'],
    explanation: '3x = 21 → x = 21 ÷ 3 = 7.' },
  { id: 'br-8', domain: 'bridge', standard: '6.EE.7', tier: 4, type: 'constructed',
    prompt: 'Solve 2x + 3 = 11 and explain each step.',
    answer: '4', acceptable: ['4', 'x=4'],
    hints: ['First undo +3 (subtract 3).', 'Then undo ×2 (divide by 2).'],
    explanation: 'Subtract 3 from both sides: 2x = 8. Divide both sides by 2: x = 4. Check: 2(4)+3 = 11. ✓' },
];
