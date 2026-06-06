import type { Problem, Lesson } from '../types';

// ===========================================================================
// 5.OA — Operations & Algebraic Thinking
// ===========================================================================

export const lessons: Lesson[] = [
  {
    domain: '5.OA', standard: '5.OA.1',
    title: 'Order of Operations (PEMDAS)',
    steps: [
      'Parentheses / brackets / braces first — innermost first.',
      'Exponents (powers) next.',
      'Multiply & Divide left to right.',
      'Add & Subtract left to right.',
    ],
    example: '3 × (4 + 2) = 3 × 6 = 18. Do the parentheses BEFORE multiplying.',
    tip: 'Grouping symbols nest: braces { } hold brackets [ ] hold parentheses ( ). Work inside-out.',
  },
  {
    domain: '5.OA', standard: '5.OA.2',
    title: 'Write Expressions from Words',
    steps: [
      '"Sum" = +, "difference" = −, "product" = ×, "quotient" = ÷.',
      '"Twice / double" = × 2.  "Times as much" = ×.',
      'Use parentheses when a whole group is acted on.',
    ],
    example: '"Add 8 and 7, then multiply by 2" → 2 × (8 + 7).',
    tip: 'Read carefully: "2 times the sum" needs parentheses; "2 times 8, plus 7" does not.',
  },
  {
    domain: '5.OA', standard: '5.OA.3',
    title: 'Number Patterns & Rules',
    steps: [
      'Find the rule (e.g. "add 3" or "multiply by 2").',
      'Apply the rule to extend the pattern.',
      'Compare two patterns by lining up their terms.',
    ],
    example: 'Start 0, add 3: 0, 3, 6, 9, 12 …',
    tip: 'On MAP, you may plot pattern pairs as points (x, y) — look for the relationship between the two.',
  },
];

export const problems: Problem[] = [
  { id: 'oa-1', domain: '5.OA', standard: '5.OA.1', tier: 1, type: 'numeric',
    prompt: 'Evaluate: 2 + 3 × 4', answer: '14', acceptable: ['14'],
    hints: ['Multiply before adding.', '3 × 4 = 12, then + 2.'],
    explanation: 'Multiplication first: 3 × 4 = 12, then 2 + 12 = 14.' },
  { id: 'oa-2', domain: '5.OA', standard: '5.OA.1', tier: 1, type: 'multiple-choice',
    prompt: 'Which equals 20?', choices: ['4 × (2 + 3)', '4 × 2 + 3', '(4 × 2) + 3', '4 + 2 × 3'], answer: '4 × (2 + 3)',
    hints: ['Do the parentheses first.', '2 + 3 = 5, then × 4.'],
    explanation: '4 × (2 + 3) = 4 × 5 = 20.' },
  { id: 'oa-3', domain: '5.OA', standard: '5.OA.2', tier: 2, type: 'multiple-choice',
    prompt: 'Choose the expression for: "subtract 6 from 10, then multiply by 5".',
    choices: ['5 × (10 − 6)', '10 − 6 × 5', '(5 × 10) − 6', '10 − (6 × 5)'], answer: '5 × (10 − 6)',
    hints: ['"Then multiply" acts on the whole result.', 'Group the subtraction first.'],
    explanation: 'Do 10 − 6 first (group it), then × 5 → 5 × (10 − 6) = 20.' },
  { id: 'oa-4', domain: '5.OA', standard: '5.OA.1', tier: 2, type: 'numeric',
    prompt: 'Evaluate: 24 ÷ (2 + 4) × 3', answer: '12', acceptable: ['12'],
    hints: ['Parentheses first: 2 + 4 = 6.', 'Then left to right: 24 ÷ 6 = 4, × 3.'],
    explanation: '2 + 4 = 6; 24 ÷ 6 = 4; 4 × 3 = 12.' },
  { id: 'oa-5', domain: '5.OA', standard: '5.OA.1', tier: 3, type: 'numeric',
    prompt: 'Evaluate: 3 × [2 + (6 − 4)]', answer: '12', acceptable: ['12'],
    hints: ['Innermost first: 6 − 4 = 2.', 'Then 2 + 2 = 4, then × 3.'],
    explanation: 'Inside-out: 6 − 4 = 2; 2 + 2 = 4; 3 × 4 = 12.' },
  { id: 'oa-6', domain: '5.OA', standard: '5.OA.3', tier: 3, type: 'multiple-choice',
    prompt: 'Pattern A starts at 0 and adds 2. Pattern B starts at 0 and adds 4. How do B-terms compare to A-terms?',
    choices: ['B is always 2 times A', 'B is always 2 more than A', 'They are equal', 'A is twice B'], answer: 'B is always 2 times A',
    hints: ['List them: A = 0,2,4,6 … B = 0,4,8,12 …', 'Compare each pair.'],
    explanation: 'A: 0,2,4,6; B: 0,4,8,12. Each B term is exactly 2 × the matching A term.' },
  { id: 'oa-7', domain: '5.OA', standard: '5.OA.1', tier: 4, type: 'numeric',
    prompt: 'Evaluate: 5 + 2 × [12 ÷ (1 + 3)]', answer: '11', acceptable: ['11'],
    hints: ['Innermost: 1 + 3 = 4.', '12 ÷ 4 = 3; then 2 × 3 = 6; then + 5.'],
    explanation: '1 + 3 = 4; 12 ÷ 4 = 3; 2 × 3 = 6; 5 + 6 = 11.' },
  { id: 'oa-8', domain: '5.OA', standard: '5.OA.2', tier: 4, type: 'constructed',
    prompt: 'Write an expression (do not solve) for: "the product of 9 and 6, increased by half of 8". Explain your grouping.',
    answer: '9 × 6 + 8 ÷ 2', acceptable: ['9*6+8/2', '(9×6)+(8÷2)', '54+4'],
    hints: ['"Product of 9 and 6" = 9 × 6.', '"Half of 8" = 8 ÷ 2; "increased by" = +.'],
    explanation: '9 × 6 + 8 ÷ 2. Order of operations does the × and ÷ before the +, so no extra parentheses are needed (it equals 58).' },
];
