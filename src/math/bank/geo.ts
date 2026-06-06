import type { Problem, Lesson } from '../types';

// ===========================================================================
// 5.G — Geometry (coordinate plane, classifying 2D shapes)
// ===========================================================================

export const lessons: Lesson[] = [
  {
    domain: '5.G', standard: '5.G.1',
    title: 'The Coordinate Plane',
    steps: [
      'A point is written (x, y).',
      'x tells you how far RIGHT from 0; y tells you how far UP.',
      'Always move along x FIRST, then y.',
      'The origin is (0, 0).',
    ],
    example: '(3, 2) means 3 right and 2 up.',
    tip: 'Remember "x comes before y" just like in the alphabet — and you walk before you climb.',
  },
  {
    domain: '5.G', standard: '5.G.3',
    title: 'Classify Triangles & Quadrilaterals',
    steps: [
      'A square is a special rectangle (4 right angles + all sides equal).',
      'A rectangle is a special parallelogram.',
      'A rhombus has 4 equal sides; a square is a rhombus too.',
      'Properties of a category belong to ALL shapes in it.',
    ],
    example: 'Every square is a rectangle, but not every rectangle is a square.',
    tip: 'Think of nested boxes: squares ⊂ rectangles ⊂ parallelograms ⊂ quadrilaterals.',
  },
];

export const problems: Problem[] = [
  { id: 'geo-1', domain: '5.G', standard: '5.G.1', tier: 1, type: 'multiple-choice',
    prompt: 'Which point is at (3, 1)?',
    diagram: { kind: 'coordinate', points: [{ x: 3, y: 1, label: 'A' }, { x: 1, y: 3, label: 'B' }], max: 6 },
    choices: ['A', 'B', 'Neither', 'Both'], answer: 'A',
    hints: ['x first (right), then y (up).', '3 right and 1 up.'],
    explanation: '(3,1) means 3 right, 1 up — that is point A. Point B at (1,3) is the swap.' },
  { id: 'geo-2', domain: '5.G', standard: '5.G.3', tier: 1, type: 'multiple-choice',
    prompt: 'A shape has 4 equal sides and 4 right angles. What is it?',
    diagram: { kind: 'shape', shape: 'square' },
    choices: ['Square', 'Triangle', 'Trapezoid', 'Circle'], answer: 'Square',
    hints: ['4 right angles AND all sides equal.'],
    explanation: '4 right angles + 4 equal sides = a square.' },
  { id: 'geo-3', domain: '5.G', standard: '5.G.1', tier: 2, type: 'numeric',
    prompt: 'Start at (0,0). Move 4 right and 3 up. Write the point as x,y (e.g. 4,3).',
    answer: '4,3', acceptable: ['(4,3)', '4, 3', '4 3'],
    hints: ['x = right amount, y = up amount.'],
    explanation: '4 right and 3 up from the origin is (4, 3).' },
  { id: 'geo-4', domain: '5.G', standard: '5.G.3', tier: 2, type: 'multiple-choice',
    prompt: 'Which statement is ALWAYS true?',
    choices: ['Every square is a rectangle', 'Every rectangle is a square', 'Every triangle is a square', 'No square is a rectangle'], answer: 'Every square is a rectangle',
    hints: ['A square has all the properties of a rectangle plus equal sides.'],
    explanation: 'A square meets every rule of a rectangle (4 right angles), so every square IS a rectangle. The reverse is not true.' },
  { id: 'geo-5', domain: '5.G', standard: '5.G.2', tier: 3, type: 'numeric',
    prompt: 'A path goes from (1,2) to (1,6). How many units long is it?',
    diagram: { kind: 'coordinate', points: [{ x: 1, y: 2, label: 'P' }, { x: 1, y: 6, label: 'Q' }], max: 8 },
    answer: '4', acceptable: ['4', '4 units'],
    hints: ['Same x, so just compare the y-values.', '6 − 2.'],
    explanation: 'Same x = 1, so the length is the change in y: 6 − 2 = 4 units.' },
  { id: 'geo-6', domain: '5.G', standard: '5.G.4', tier: 3, type: 'multiple-choice',
    prompt: 'Which quadrilateral has exactly ONE pair of parallel sides?',
    diagram: { kind: 'shape', shape: 'trapezoid' },
    choices: ['Trapezoid', 'Rectangle', 'Rhombus', 'Square'], answer: 'Trapezoid',
    hints: ['Parallelograms have TWO pairs.', 'Which one has only one pair?'],
    explanation: 'A trapezoid has exactly one pair of parallel sides; the others all have two pairs.' },
  { id: 'geo-7', domain: '5.G', standard: '5.G.2', tier: 4, type: 'numeric',
    prompt: 'A rectangle has corners (1,1), (5,1), (5,4), (1,4). What is its AREA?',
    answer: '12', acceptable: ['12', '12 square units'],
    hints: ['Width = 5 − 1 = 4. Height = 4 − 1 = 3.', 'Area = width × height.'],
    explanation: 'Width = 4, height = 3, so area = 4 × 3 = 12 square units.' },
  { id: 'geo-8', domain: '5.G', standard: '5.G.3', tier: 4, type: 'constructed',
    prompt: 'Is a rhombus always a square? Explain why or why not.',
    answer: 'no', acceptable: ['no', 'angles', 'not always'],
    hints: ['A rhombus has 4 equal sides.', 'Does it always have right angles?'],
    explanation: 'No. A rhombus has 4 equal sides but its angles do not have to be right angles. Only when all 4 angles are 90° is the rhombus also a square.' },
];
