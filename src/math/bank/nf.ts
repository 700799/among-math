import type { Problem, Lesson } from '../types';

// ===========================================================================
// 5.NF — Number & Operations: Fractions  (the most important domain for MAP)
// ===========================================================================

export const lessons: Lesson[] = [
  {
    domain: '5.NF', standard: '5.NF.1',
    title: 'Add & Subtract Fractions with Unlike Denominators',
    steps: [
      'Find a common denominator (a number both bottoms divide into).',
      'Rename each fraction so they share that denominator.',
      'Add or subtract ONLY the numerators (tops). Keep the denominator.',
      'Simplify if you can.',
    ],
    example: '1/2 + 1/3  →  common denom 6  →  3/6 + 2/6 = 5/6.',
    tip: 'You can always use the product of the two denominators as a common denominator (2×3 = 6).',
  },
  {
    domain: '5.NF', standard: '5.NF.4',
    title: 'Multiply Fractions',
    steps: [
      'Multiply the numerators (tops) together.',
      'Multiply the denominators (bottoms) together.',
      'Simplify the result.',
      'Remember: "of" means multiply (1/2 OF 1/3 = 1/2 × 1/3).',
    ],
    example: '2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2.',
    tip: 'Multiplying by a fraction less than 1 makes a number SMALLER — that is scaling.',
  },
  {
    domain: '5.NF', standard: '5.NF.7',
    title: 'Divide with Unit Fractions',
    steps: [
      'Whole ÷ unit fraction: ask "how many of this small piece fit?" (4 ÷ 1/2 = 8).',
      'Unit fraction ÷ whole: split the small piece into more pieces (1/2 ÷ 4 = 1/8).',
      'Trick: dividing is the same as multiplying by the flip (reciprocal).',
    ],
    example: '1/3 ÷ 2 = 1/3 × 1/2 = 1/6.',
    tip: 'Draw a picture or a number line if you are unsure which way to go.',
  },
];

export const problems: Problem[] = [
  // ---- Tier 1 ----
  {
    id: 'nf-1', domain: '5.NF', standard: '5.NF.1', tier: 1, type: 'multiple-choice',
    prompt: 'What is 1/4 + 2/4?',
    diagram: { kind: 'fractionBar', parts: 4, shaded: 1, second: { parts: 4, shaded: 2 } },
    choices: ['3/8', '3/4', '1/2', '2/8'], answer: '3/4',
    hints: ['The denominators are already the same.', 'Add only the tops: 1 + 2 = 3. Keep the 4.'],
    explanation: 'Same denominator, so add the numerators: 1 + 2 = 3, keep the 4 → 3/4.',
  },
  {
    id: 'nf-2', domain: '5.NF', standard: '5.NF.2', tier: 1, type: 'numeric',
    prompt: 'A recipe needs 3/8 cup of sugar and you already added 1/8 cup. How much MORE do you need? (Answer as eighths, e.g. 2/8)',
    answer: '2/8', acceptable: ['1/4', '2/8 cup'],
    hints: ['Subtract: 3/8 − 1/8.', 'Same bottom, so 3 − 1 = 2 eighths.'],
    explanation: '3/8 − 1/8 = 2/8, which also equals 1/4 cup.',
  },
  // ---- Tier 2 ----
  {
    id: 'nf-3', domain: '5.NF', standard: '5.NF.1', tier: 2, type: 'multiple-choice',
    prompt: 'What is 1/2 + 1/3?',
    choices: ['2/5', '5/6', '2/6', '1/6'], answer: '5/6',
    hints: ['Common denominator of 2 and 3 is 6.', 'Rename: 1/2 = 3/6 and 1/3 = 2/6.'],
    explanation: 'Common denom 6: 1/2 = 3/6, 1/3 = 2/6. Add tops: 3 + 2 = 5 → 5/6.',
  },
  {
    id: 'nf-4', domain: '5.NF', standard: '5.NF.4', tier: 2, type: 'multiple-choice',
    prompt: 'What is 2/3 × 3/4?',
    choices: ['5/7', '6/12', '1/2', 'Both 6/12 and 1/2'], answer: 'Both 6/12 and 1/2',
    hints: ['Multiply tops, multiply bottoms.', '(2×3)/(3×4) = 6/12. Now simplify.'],
    explanation: '(2×3)/(3×4) = 6/12 = 1/2. Both forms are correct, so the best choice names both.',
  },
  {
    id: 'nf-5', domain: '5.NF', standard: '5.NF.6', tier: 2, type: 'numeric',
    prompt: 'You walk 3/4 of a mile each day. How far do you walk in 4 days? (miles)',
    answer: '3', acceptable: ['3 miles', '3.0'],
    hints: ['4 × 3/4.', '4 × 3 = 12, over 4 → 12/4.'],
    explanation: '4 × 3/4 = 12/4 = 3 miles.',
  },
  // ---- Tier 3 ----
  {
    id: 'nf-6', domain: '5.NF', standard: '5.NF.1', tier: 3, type: 'numeric',
    prompt: 'Compute 2 1/2 + 1 3/4. Give your answer as a mixed number (e.g. 4 1/4).',
    answer: '4 1/4', acceptable: ['17/4', '4.25'],
    hints: ['Add whole numbers: 2 + 1 = 3.', 'Add fractions: 1/2 + 3/4 = 2/4 + 3/4 = 5/4 = 1 1/4.'],
    explanation: 'Whole parts 2 + 1 = 3. Fractions 1/2 + 3/4 = 2/4 + 3/4 = 5/4 = 1 1/4. Total 3 + 1 1/4 = 4 1/4.',
  },
  {
    id: 'nf-7', domain: '5.NF', standard: '5.NF.7', tier: 3, type: 'multiple-choice',
    prompt: 'How many 1/2-cup servings are in 4 cups of soup?',
    diagram: { kind: 'numberLine', min: 0, max: 4, ticks: 8, mark: 4 },
    choices: ['2', '6', '8', '1/8'], answer: '8',
    hints: ['This is 4 ÷ 1/2.', 'How many halves fit in 4 wholes?'],
    explanation: '4 ÷ 1/2 = 4 × 2 = 8 servings.',
  },
  // ---- Tier 4 ----
  {
    id: 'nf-8', domain: '5.NF', standard: '5.NF.5', tier: 4, type: 'multiple-choice',
    prompt: 'Without computing, is 7/8 × 4 greater than, less than, or equal to 4?',
    choices: ['Greater than 4', 'Less than 4', 'Equal to 4', 'Cannot tell'], answer: 'Less than 4',
    hints: ['7/8 is less than 1.', 'Multiplying by a number less than 1 scales DOWN.'],
    explanation: '7/8 < 1, so 7/8 × 4 scales 4 down — the product is less than 4. This is scaling reasoning (5.NF.5).',
  },
  {
    id: 'nf-9', domain: '5.NF', standard: '5.NF.7', tier: 4, type: 'constructed',
    prompt: 'Explain, in your own words, why 1/3 ÷ 4 = 1/12. Use a picture or words.',
    answer: 'split', acceptable: ['1/12', 'twelfths', 'reciprocal', 'multiply by 1/4'],
    hints: ['Start with one-third of something.', 'You are sharing that third among 4 people.'],
    explanation: 'Take 1/3 of a whole and split it into 4 equal parts. Each part is 1/3 ÷ 4 = 1/3 × 1/4 = 1/12 of the whole. If you cut a whole into 3 then each third into 4, you get 12 equal pieces.',
  },
  {
    id: 'nf-10', domain: '5.NF', standard: '5.NF.6', tier: 4, type: 'numeric',
    prompt: 'A book is 2/3 read. There are 80 pages left. How many pages are in the WHOLE book?',
    answer: '240', acceptable: ['240 pages'],
    hints: ['80 pages is the unread 1/3.', 'If 1/3 = 80, then the whole (3/3) = 80 × 3.'],
    explanation: 'Read 2/3 means 1/3 is unread = 80 pages. Whole book = 3 × 80 = 240 pages.',
  },
  {
    id: 'nf-11', domain: '5.NF', standard: '5.NF.1', tier: 1, type: 'multiple-choice',
    prompt: 'Fill in the blank: 2/3 = ?/12',
    choices: ['4', '6', '8', '9'], answer: '8',
    hints: ['3 × 4 = 12, so multiply the top by 4 too.'],
    explanation: 'Multiply top and bottom by 4: 2/3 = 8/12.',
  },
  {
    id: 'nf-12', domain: '5.NF', standard: '5.NF.3', tier: 2, type: 'numeric',
    prompt: '5 cookies are shared equally by 4 friends. How many cookies does each friend get? (mixed number like 1 1/4, or decimal)',
    answer: '1 1/4', acceptable: ['5/4', '1.25'],
    hints: ['A fraction IS division: 5 ÷ 4 = 5/4.'],
    explanation: '5 ÷ 4 = 5/4 = 1 1/4 cookies each. Fractions are division (5.NF.3).',
  },
  {
    id: 'nf-13', domain: '5.NF', standard: '5.NF.2', tier: 2, type: 'multiple-choice',
    prompt: 'Which fraction is GREATER: 5/8 or 3/5?',
    choices: ['5/8', '3/5', 'They are equal', 'Cannot compare'], answer: '5/8',
    hints: ['Use a common denominator of 40.', '5/8 = 25/40 and 3/5 = 24/40.'],
    explanation: 'Common denominator 40: 5/8 = 25/40, 3/5 = 24/40. So 5/8 is greater (barely!).',
  },
  {
    id: 'nf-14', domain: '5.NF', standard: '5.NF.1', tier: 3, type: 'numeric',
    prompt: 'Compute 3/4 − 1/6. (answer in twelfths, like 5/12)',
    answer: '7/12', acceptable: [],
    hints: ['Common denominator of 4 and 6 is 12.', '3/4 = 9/12 and 1/6 = 2/12.'],
    explanation: '3/4 = 9/12, 1/6 = 2/12; 9/12 − 2/12 = 7/12.',
  },
  {
    id: 'nf-15', domain: '5.NF', standard: '5.NF.4', tier: 3, type: 'numeric',
    prompt: 'There are 30 students in class. 2/5 of them play soccer. How many students play soccer?',
    answer: '12', acceptable: ['12 students'],
    hints: ['"Of" means multiply: 2/5 × 30.', '30 ÷ 5 = 6, then × 2.'],
    explanation: '2/5 × 30 = 60/5 = 12 students.',
  },
  {
    id: 'nf-16', domain: '5.NF', standard: '5.NF.4', tier: 3, type: 'multiple-choice',
    prompt: 'A sticker is 1/2 inch wide and 3/4 inch tall. What is its AREA in square inches?',
    choices: ['3/8', '4/6', '5/4', '1/4'], answer: '3/8',
    hints: ['Area = width × height.', '1/2 × 3/4 = (1×3)/(2×4).'],
    explanation: 'Area = 1/2 × 3/4 = 3/8 square inch. Multiplying fractions finds areas too (5.NF.4b).',
  },
  {
    id: 'nf-17', domain: '5.NF', standard: '5.NF.6', tier: 4, type: 'numeric',
    prompt: 'Compute 2 1/3 × 1 1/2. (mixed number like 3 1/2)',
    answer: '3 1/2', acceptable: ['7/2', '3.5'],
    hints: ['Convert to improper fractions: 7/3 and 3/2.', '(7×3)/(3×2) = 21/6.'],
    explanation: '2 1/3 = 7/3 and 1 1/2 = 3/2. Multiply: 21/6 = 7/2 = 3 1/2.',
  },
  {
    id: 'nf-18', domain: '5.NF', standard: '5.NF.7', tier: 4, type: 'numeric',
    prompt: 'A 1/2-yard ribbon is cut into 3 EQUAL pieces. How long is each piece, in yards? (like 1/6)',
    answer: '1/6', acceptable: [],
    hints: ['This is 1/2 ÷ 3.', 'Dividing by 3 = multiplying by 1/3.'],
    explanation: '1/2 ÷ 3 = 1/2 × 1/3 = 1/6 yard per piece.',
  },
  {
    id: 'nf-19', domain: '5.NF', standard: '5.NF.7', tier: 4, type: 'constructed',
    prompt: 'Why is 4 ÷ 1/5 a BIG number (20) but 1/5 ÷ 4 a SMALL number (1/20)? Explain the difference.',
    answer: 'fit', acceptable: ['how many', 'share', 'split', '20'],
    hints: ['4 ÷ 1/5 asks: how many fifths fit in 4 wholes?', '1/5 ÷ 4 asks: split one fifth among 4.'],
    explanation: '4 ÷ 1/5 asks how many 1/5-size pieces fit into 4 wholes — 5 fit in each whole, so 20. But 1/5 ÷ 4 splits one small fifth into 4 even smaller parts, giving 1/20. Same numbers, opposite meanings!',
  },
];
