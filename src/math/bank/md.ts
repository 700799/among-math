import type { Problem, Lesson } from '../types';

// ===========================================================================
// 5.MD — Measurement & Data (unit conversion, line plots, volume)
// ===========================================================================

export const lessons: Lesson[] = [
  {
    domain: '5.MD', standard: '5.MD.1',
    title: 'Convert Measurement Units',
    steps: [
      'Know the key facts: 1 ft = 12 in, 1 m = 100 cm, 1 km = 1000 m, 1 lb = 16 oz, 1 gal = 4 qt.',
      'Bigger unit → smaller unit: MULTIPLY.',
      'Smaller unit → bigger unit: DIVIDE.',
    ],
    example: '3 ft = 3 × 12 = 36 in.',
    tip: 'Write the units beside the numbers so you can check they cancel correctly.',
  },
  {
    domain: '5.MD', standard: '5.MD.5',
    title: 'Volume of Rectangular Prisms',
    steps: [
      'Volume = length × width × height (V = l × w × h).',
      'You can also do V = base area × height.',
      'For an irregular solid, split it into boxes and add the volumes.',
      'Volume is measured in CUBIC units (cm³, in³).',
    ],
    example: 'A box 4 × 3 × 2 has V = 4 × 3 × 2 = 24 cubic units.',
    tip: 'Count layers: base layer of l×w cubes, stacked h high.',
  },
  {
    domain: '5.MD', standard: '5.MD.2',
    title: 'Line Plots with Fractions',
    steps: [
      'Each X on the line plot is one data point at that value.',
      'To find a total, multiply each value by how many Xs, then add.',
      'You can redistribute amounts evenly to find a fair share.',
    ],
    example: 'Three plants at 1/4 cup → 3 × 1/4 = 3/4 cup total.',
    tip: 'Line plots often ask for the difference between the tallest and shortest stacks.',
  },
];

export const problems: Problem[] = [
  { id: 'md-1', domain: '5.MD', standard: '5.MD.1', tier: 1, type: 'numeric',
    prompt: 'How many inches are in 2 feet?', answer: '24', acceptable: ['24', '24 in'],
    hints: ['1 foot = 12 inches.', '2 × 12.'],
    explanation: '2 ft × 12 in/ft = 24 inches.' },
  { id: 'md-2', domain: '5.MD', standard: '5.MD.5', tier: 1, type: 'numeric',
    prompt: 'Find the volume of a box 5 long, 2 wide, 3 high.',
    diagram: { kind: 'prism', l: 5, w: 2, h: 3 },
    answer: '30', acceptable: ['30', '30 cubic units'],
    hints: ['V = l × w × h.', '5 × 2 × 3.'],
    explanation: 'V = 5 × 2 × 3 = 30 cubic units.' },
  { id: 'md-3', domain: '5.MD', standard: '5.MD.1', tier: 2, type: 'numeric',
    prompt: 'A rope is 250 cm long. How many meters is that?', answer: '2.5', acceptable: ['2.5', '2.5 m'],
    hints: ['1 m = 100 cm.', 'Smaller→bigger: divide by 100.'],
    explanation: '250 cm ÷ 100 = 2.5 m.' },
  { id: 'md-4', domain: '5.MD', standard: '5.MD.5', tier: 2, type: 'numeric',
    prompt: 'A fish tank is 8 × 4 × 5 inches. What is its volume in cubic inches?',
    diagram: { kind: 'prism', l: 8, w: 4, h: 5 },
    answer: '160', acceptable: ['160'],
    hints: ['Base area = 8 × 4 = 32.', 'Times height 5.'],
    explanation: 'V = 8 × 4 × 5 = 160 cubic inches.' },
  { id: 'md-5', domain: '5.MD', standard: '5.MD.2', tier: 3, type: 'numeric',
    prompt: 'On a line plot, 4 cups hold 1/2 L each and 2 cups hold 1/4 L each. Total liters?',
    answer: '2.5', acceptable: ['2.5', '5/2', '2 1/2'],
    hints: ['4 × 1/2 = 2 L.', '2 × 1/4 = 1/2 L. Add.'],
    explanation: '4 × 1/2 = 2 L; 2 × 1/4 = 1/2 L; total = 2 1/2 = 2.5 L.' },
  { id: 'md-6', domain: '5.MD', standard: '5.MD.5', tier: 3, type: 'numeric',
    prompt: 'An L-shaped solid is made of a 3×3×2 box plus a 3×1×2 box. Total volume?',
    answer: '24', acceptable: ['24'],
    hints: ['Find each box: 3×3×2 and 3×1×2.', '18 + 6.'],
    explanation: 'First box 3×3×2 = 18; second 3×1×2 = 6; total = 18 + 6 = 24 cubic units.' },
  { id: 'md-7', domain: '5.MD', standard: '5.MD.1', tier: 4, type: 'numeric',
    prompt: 'A race is 2.5 km. A runner has gone 1750 m. How many METERS are left?',
    answer: '750', acceptable: ['750', '750 m'],
    hints: ['2.5 km = 2500 m.', '2500 − 1750.'],
    explanation: '2.5 km = 2500 m; 2500 − 1750 = 750 m left.' },
  { id: 'md-8', domain: '5.MD', standard: '5.MD.5', tier: 4, type: 'constructed',
    prompt: 'A box has volume 48 cm³ and a base of 6 cm × 2 cm. Explain how to find its height.',
    answer: '4', acceptable: ['4', '4 cm', 'divide'],
    hints: ['Base area = 6 × 2 = 12.', 'Height = Volume ÷ base area.'],
    explanation: 'Base area = 6 × 2 = 12 cm². Since V = base × height, height = 48 ÷ 12 = 4 cm.' },
];
