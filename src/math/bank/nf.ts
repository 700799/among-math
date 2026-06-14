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
    solutions: [
      {
        title: 'Way 1: Add the numerators',
        steps: [
          'Both denominators are 4, so the pieces are already the same size.',
          'Add only the tops: 1 + 2 = 3, and keep the denominator 4.',
          'So 1/4 + 2/4 = 3/4.',
        ],
      },
      {
        title: 'Way 2: Fraction bar picture',
        steps: [
          'Picture a bar cut into 4 equal parts with 1 part shaded.',
          'Shade 2 more parts for the second fraction.',
          'Now 3 of the 4 parts are shaded, so the total is 3/4.',
        ],
      },
    ],
  },
  {
    id: 'nf-2', domain: '5.NF', standard: '5.NF.2', tier: 1, type: 'numeric',
    prompt: 'A recipe needs 3/8 cup of sugar and you already added 1/8 cup. How much MORE do you need? (Answer as eighths, e.g. 2/8)',
    answer: '2/8', acceptable: ['1/4', '2/8 cup'],
    hints: ['Subtract: 3/8 − 1/8.', 'Same bottom, so 3 − 1 = 2 eighths.'],
    explanation: '3/8 − 1/8 = 2/8, which also equals 1/4 cup.',
    solutions: [
      {
        title: 'Way 1: Subtract the numerators',
        steps: [
          'You need 3/8 cup in all and have already added 1/8 cup.',
          'Subtract: 3/8 − 1/8. The bottoms match, so just do 3 − 1 = 2 eighths.',
          'You still need 2/8 cup, which is the same as 1/4 cup.',
        ],
      },
      {
        title: 'Way 2: Count up',
        steps: [
          'Start at 1/8 and count up by eighths until you reach 3/8.',
          '1/8 to 2/8 is one eighth, and 2/8 to 3/8 is one more eighth.',
          'That is 2 eighths of counting up, so you need 2/8 cup more.',
        ],
      },
    ],
  },
  // ---- Tier 2 ----
  {
    id: 'nf-3', domain: '5.NF', standard: '5.NF.1', tier: 2, type: 'multiple-choice',
    prompt: 'What is 1/2 + 1/3?',
    choices: ['2/5', '5/6', '2/6', '1/6'], answer: '5/6',
    hints: ['Common denominator of 2 and 3 is 6.', 'Rename: 1/2 = 3/6 and 1/3 = 2/6.'],
    explanation: 'Common denom 6: 1/2 = 3/6, 1/3 = 2/6. Add tops: 3 + 2 = 5 → 5/6.',
    solutions: [
      {
        title: 'Way 1: Common denominators',
        steps: [
          'Both 2 and 3 divide into 6, so use 6 as the common denominator.',
          'Rename each fraction: 1/2 = 3/6 and 1/3 = 2/6.',
          'Add the tops: 3 + 2 = 5, so the sum is 5/6.',
        ],
      },
      {
        title: 'Way 2: Fraction bar picture',
        steps: [
          'Cut a bar into 6 equal parts.',
          'One half of the bar covers 3 parts, and one third covers 2 parts.',
          'Together they cover 5 of the 6 parts, so 1/2 + 1/3 = 5/6.',
        ],
      },
      {
        title: 'Way 3: Estimate to check',
        steps: [
          'You are adding 1/2 plus a bit less than 1/2, so the sum should be a bit less than 1.',
          '5/6 is just under 1, so it makes sense. The answer is 5/6.',
        ],
      },
    ],
  },
  {
    id: 'nf-4', domain: '5.NF', standard: '5.NF.4', tier: 2, type: 'multiple-choice',
    prompt: 'What is 2/3 × 3/4?',
    choices: ['5/7', '6/12', '1/2', 'Both 6/12 and 1/2'], answer: 'Both 6/12 and 1/2',
    hints: ['Multiply tops, multiply bottoms.', '(2×3)/(3×4) = 6/12. Now simplify.'],
    explanation: '(2×3)/(3×4) = 6/12 = 1/2. Both forms are correct, so the best choice names both.',
    solutions: [
      {
        title: 'Way 1: Multiply straight across',
        steps: [
          'Multiply the tops: 2 × 3 = 6. Multiply the bottoms: 3 × 4 = 12.',
          'That gives 6/12, which simplifies to 1/2.',
          'Both 6/12 and 1/2 are correct, so pick the choice that names both.',
        ],
      },
      {
        title: 'Way 2: Simplify before multiplying',
        steps: [
          'In 2/3 × 3/4 there is a 3 on top and a 3 on the bottom, so they cancel.',
          'That leaves 2/1 × 1/4 = 2/4 = 1/2.',
          '1/2 is the same value as 6/12, so the best choice names both forms.',
        ],
      },
    ],
  },
  {
    id: 'nf-5', domain: '5.NF', standard: '5.NF.6', tier: 2, type: 'numeric',
    prompt: 'You walk 3/4 of a mile each day. How far do you walk in 4 days? (miles)',
    answer: '3', acceptable: ['3 miles', '3.0'],
    hints: ['4 × 3/4.', '4 × 3 = 12, over 4 → 12/4.'],
    explanation: '4 × 3/4 = 12/4 = 3 miles.',
    solutions: [
      {
        title: 'Way 1: Multiply',
        steps: [
          '4 days of walking 3/4 mile means 4 × 3/4.',
          'Multiply the top: 4 × 3 = 12, so the total is 12/4.',
          '12/4 = 3, so you walk 3 miles.',
        ],
      },
      {
        title: 'Way 2: Add one day at a time',
        steps: [
          'Day 1: 3/4. Day 2: 6/4. Day 3: 9/4. Day 4: 12/4.',
          'Every 4 fourths make 1 whole mile, and 12 fourths make 3 wholes.',
          'So in 4 days you walk 3 miles.',
        ],
      },
    ],
  },
  // ---- Tier 3 ----
  {
    id: 'nf-6', domain: '5.NF', standard: '5.NF.1', tier: 3, type: 'numeric',
    prompt: 'Compute 2 1/2 + 1 3/4. Give your answer as a mixed number (e.g. 4 1/4).',
    answer: '4 1/4', acceptable: ['17/4', '4.25'],
    hints: ['Add whole numbers: 2 + 1 = 3.', 'Add fractions: 1/2 + 3/4 = 2/4 + 3/4 = 5/4 = 1 1/4.'],
    explanation: 'Whole parts 2 + 1 = 3. Fractions 1/2 + 3/4 = 2/4 + 3/4 = 5/4 = 1 1/4. Total 3 + 1 1/4 = 4 1/4.',
    solutions: [
      {
        title: 'Way 1: Add wholes and fractions separately',
        steps: [
          'Add the whole numbers first: 2 + 1 = 3.',
          'Add the fractions: 1/2 + 3/4 = 2/4 + 3/4 = 5/4, which is 1 1/4.',
          'Combine the parts: 3 + 1 1/4 = 4 1/4.',
        ],
      },
      {
        title: 'Way 2: Improper fractions',
        steps: [
          'Convert both: 2 1/2 = 5/2 = 10/4 and 1 3/4 = 7/4.',
          'Add: 10/4 + 7/4 = 17/4.',
          '17/4 is 4 wholes with 1 fourth left over, so the answer is 4 1/4.',
        ],
      },
    ],
  },
  {
    id: 'nf-7', domain: '5.NF', standard: '5.NF.7', tier: 3, type: 'multiple-choice',
    prompt: 'How many 1/2-cup servings are in 4 cups of soup?',
    diagram: { kind: 'numberLine', min: 0, max: 4, ticks: 8, mark: 4 },
    choices: ['2', '6', '8', '1/8'], answer: '8',
    hints: ['This is 4 ÷ 1/2.', 'How many halves fit in 4 wholes?'],
    explanation: '4 ÷ 1/2 = 4 × 2 = 8 servings.',
    solutions: [
      {
        title: 'Way 1: How many fit?',
        steps: [
          'Ask: how many 1/2-cup servings fit into 4 cups?',
          'Each single cup holds 2 half-cup servings.',
          '4 cups × 2 servings per cup = 8 servings.',
        ],
      },
      {
        title: 'Way 2: Multiply by the reciprocal',
        steps: [
          'Dividing by 1/2 is the same as multiplying by 2.',
          '4 ÷ 1/2 = 4 × 2 = 8 servings.',
        ],
      },
    ],
  },
  // ---- Tier 4 ----
  {
    id: 'nf-8', domain: '5.NF', standard: '5.NF.5', tier: 4, type: 'multiple-choice',
    prompt: 'Without computing, is 7/8 × 4 greater than, less than, or equal to 4?',
    choices: ['Greater than 4', 'Less than 4', 'Equal to 4', 'Cannot tell'], answer: 'Less than 4',
    hints: ['7/8 is less than 1.', 'Multiplying by a number less than 1 scales DOWN.'],
    explanation: '7/8 < 1, so 7/8 × 4 scales 4 down — the product is less than 4. This is scaling reasoning (5.NF.5).',
    solutions: [
      {
        title: 'Way 1: Scaling reasoning',
        steps: [
          '7/8 is less than 1 whole.',
          'Multiplying a number by something less than 1 shrinks it.',
          'So 7/8 × 4 must be less than 4.',
        ],
      },
      {
        title: 'Way 2: Compute to confirm',
        steps: [
          '7/8 × 4 = 28/8.',
          '28/8 = 3 4/8 = 3 1/2, and 3 1/2 is less than 4.',
          'So the product is less than 4.',
        ],
      },
    ],
  },
  {
    id: 'nf-9', domain: '5.NF', standard: '5.NF.7', tier: 4, type: 'constructed',
    prompt: 'Explain, in your own words, why 1/3 ÷ 4 = 1/12. Use a picture or words.',
    answer: 'split', acceptable: ['1/12', 'twelfths', 'reciprocal', 'multiply by 1/4'],
    hints: ['Start with one-third of something.', 'You are sharing that third among 4 people.'],
    explanation: 'Take 1/3 of a whole and split it into 4 equal parts. Each part is 1/3 ÷ 4 = 1/3 × 1/4 = 1/12 of the whole. If you cut a whole into 3 then each third into 4, you get 12 equal pieces.',
    solutions: [
      {
        title: 'Way 1: Cut the picture',
        steps: [
          'Draw a whole cut into 3 equal parts and shade one third.',
          'Split that shaded third into 4 equal slivers, one for each person.',
          'If every third were cut the same way, the whole would have 12 equal pieces.',
          'Each sliver is 1 of those 12 pieces, so 1/3 ÷ 4 = 1/12.',
        ],
      },
      {
        title: 'Way 2: Multiply by the reciprocal',
        steps: [
          'Dividing by 4 is the same as taking 1/4 of an amount.',
          'So 1/3 ÷ 4 = 1/3 × 1/4.',
          'Multiply tops and bottoms: 1 × 1 = 1 and 3 × 4 = 12, giving 1/12.',
        ],
      },
    ],
  },
  {
    id: 'nf-10', domain: '5.NF', standard: '5.NF.6', tier: 4, type: 'numeric',
    prompt: 'A book is 2/3 read. There are 80 pages left. How many pages are in the WHOLE book?',
    answer: '240', acceptable: ['240 pages'],
    hints: ['80 pages is the unread 1/3.', 'If 1/3 = 80, then the whole (3/3) = 80 × 3.'],
    explanation: 'Read 2/3 means 1/3 is unread = 80 pages. Whole book = 3 × 80 = 240 pages.',
    solutions: [
      {
        title: 'Way 1: Find the unit fraction',
        steps: [
          'If 2/3 of the book is read, then 1/3 is still unread.',
          'That unread 1/3 equals the 80 pages left.',
          'The whole book is 3 thirds: 3 × 80 = 240 pages.',
        ],
      },
      {
        title: 'Way 2: Bar model',
        steps: [
          'Draw a bar split into 3 equal boxes: 2 boxes read, 1 box left.',
          'The leftover box stands for 80 pages, so every box is 80 pages.',
          'All 3 boxes together: 80 + 80 + 80 = 240 pages.',
        ],
      },
    ],
  },
  {
    id: 'nf-11', domain: '5.NF', standard: '5.NF.1', tier: 1, type: 'multiple-choice',
    prompt: 'Fill in the blank: 2/3 = ?/12',
    choices: ['4', '6', '8', '9'], answer: '8',
    hints: ['3 × 4 = 12, so multiply the top by 4 too.'],
    explanation: 'Multiply top and bottom by 4: 2/3 = 8/12.',
    solutions: [
      {
        title: 'Way 1: Scale up the fraction',
        steps: [
          'The denominator went from 3 to 12, and 3 × 4 = 12.',
          'Do the same thing to the top: 2 × 4 = 8.',
          'So 2/3 = 8/12, and the missing number is 8.',
        ],
      },
      {
        title: 'Way 2: Think in twelfths',
        steps: [
          'Cut a bar into 12 equal parts.',
          'One third of 12 parts is 4 parts, so two thirds is 8 parts.',
          '8 of the 12 parts are shaded, so the missing number is 8.',
        ],
      },
    ],
  },
  {
    id: 'nf-12', domain: '5.NF', standard: '5.NF.3', tier: 2, type: 'numeric',
    prompt: '5 cookies are shared equally by 4 friends. How many cookies does each friend get? (mixed number like 1 1/4, or decimal)',
    answer: '1 1/4', acceptable: ['5/4', '1.25'],
    hints: ['A fraction IS division: 5 ÷ 4 = 5/4.'],
    explanation: '5 ÷ 4 = 5/4 = 1 1/4 cookies each. Fractions are division (5.NF.3).',
    solutions: [
      {
        title: 'Way 1: Fraction as division',
        steps: [
          'Sharing 5 cookies equally among 4 friends means 5 ÷ 4.',
          'A fraction IS a division: 5 ÷ 4 = 5/4.',
          '5/4 = 1 1/4 cookies for each friend.',
        ],
      },
      {
        title: 'Way 2: Deal out the cookies',
        steps: [
          'Give each friend 1 whole cookie. That uses 4 of the 5 cookies.',
          'Cut the last cookie into 4 equal pieces, one piece per friend.',
          'Each friend gets 1 whole plus 1/4, which is 1 1/4 cookies.',
        ],
      },
    ],
  },
  {
    id: 'nf-13', domain: '5.NF', standard: '5.NF.2', tier: 2, type: 'multiple-choice',
    prompt: 'Which fraction is GREATER: 5/8 or 3/5?',
    choices: ['5/8', '3/5', 'They are equal', 'Cannot compare'], answer: '5/8',
    hints: ['Use a common denominator of 40.', '5/8 = 25/40 and 3/5 = 24/40.'],
    explanation: 'Common denominator 40: 5/8 = 25/40, 3/5 = 24/40. So 5/8 is greater (barely!).',
    solutions: [
      {
        title: 'Way 1: Common denominators',
        steps: [
          '8 × 5 = 40, so rename both fractions with denominator 40.',
          '5/8 = 25/40 and 3/5 = 24/40.',
          '25/40 is greater than 24/40, so 5/8 is greater.',
        ],
      },
      {
        title: 'Way 2: Compare to one half',
        steps: [
          'Both fractions are a little more than 1/2.',
          '5/8 is 1/8 above one half, and 3/5 is 1/10 above one half.',
          'Since 1/8 is bigger than 1/10, 5/8 sits farther above 1/2, so 5/8 is greater.',
        ],
      },
    ],
  },
  {
    id: 'nf-14', domain: '5.NF', standard: '5.NF.1', tier: 3, type: 'numeric',
    prompt: 'Compute 3/4 − 1/6. (answer in twelfths, like 5/12)',
    answer: '7/12', acceptable: [],
    hints: ['Common denominator of 4 and 6 is 12.', '3/4 = 9/12 and 1/6 = 2/12.'],
    explanation: '3/4 = 9/12, 1/6 = 2/12; 9/12 − 2/12 = 7/12.',
    solutions: [
      {
        title: 'Way 1: Common denominators',
        steps: [
          'The least common denominator of 4 and 6 is 12.',
          'Rename: 3/4 = 9/12 and 1/6 = 2/12.',
          'Subtract the tops: 9 − 2 = 7, so the answer is 7/12.',
        ],
      },
      {
        title: 'Way 2: Number line hops',
        steps: [
          'Mark a number line from 0 to 1 in twelfths.',
          'Start at 3/4, which is the 9th tick.',
          'Hop back 2 ticks for 1/6 and you land on the 7th tick: 7/12.',
        ],
      },
    ],
  },
  {
    id: 'nf-15', domain: '5.NF', standard: '5.NF.4', tier: 3, type: 'numeric',
    prompt: 'There are 30 students in class. 2/5 of them play soccer. How many students play soccer?',
    answer: '12', acceptable: ['12 students'],
    hints: ['"Of" means multiply: 2/5 × 30.', '30 ÷ 5 = 6, then × 2.'],
    explanation: '2/5 × 30 = 60/5 = 12 students.',
    solutions: [
      {
        title: 'Way 1: Divide then multiply',
        steps: [
          'Find 1/5 of 30 first: 30 ÷ 5 = 6 students.',
          '2/5 is twice as much: 2 × 6 = 12.',
          'So 12 students play soccer.',
        ],
      },
      {
        title: 'Way 2: Multiply straight across',
        steps: [
          '"Of" means multiply: 2/5 × 30 = 60/5.',
          '60 ÷ 5 = 12, so 12 students play soccer.',
        ],
      },
    ],
  },
  {
    id: 'nf-16', domain: '5.NF', standard: '5.NF.4', tier: 3, type: 'multiple-choice',
    prompt: 'A sticker is 1/2 inch wide and 3/4 inch tall. What is its AREA in square inches?',
    choices: ['3/8', '4/6', '5/4', '1/4'], answer: '3/8',
    hints: ['Area = width × height.', '1/2 × 3/4 = (1×3)/(2×4).'],
    explanation: 'Area = 1/2 × 3/4 = 3/8 square inch. Multiplying fractions finds areas too (5.NF.4b).',
    solutions: [
      {
        title: 'Way 1: Multiply the side lengths',
        steps: [
          'Area = width × height = 1/2 × 3/4.',
          'Tops: 1 × 3 = 3. Bottoms: 2 × 4 = 8.',
          'The area is 3/8 square inch.',
        ],
      },
      {
        title: 'Way 2: Grid picture',
        steps: [
          'Draw a square inch cut into 2 columns and 4 rows, making 8 equal parts.',
          'The sticker covers 1 column across and 3 rows up, which is 3 parts.',
          '3 of the 8 parts are covered, so the area is 3/8 square inch.',
        ],
      },
    ],
  },
  {
    id: 'nf-17', domain: '5.NF', standard: '5.NF.6', tier: 4, type: 'numeric',
    prompt: 'Compute 2 1/3 × 1 1/2. (mixed number like 3 1/2)',
    answer: '3 1/2', acceptable: ['7/2', '3.5'],
    hints: ['Convert to improper fractions: 7/3 and 3/2.', '(7×3)/(3×2) = 21/6.'],
    explanation: '2 1/3 = 7/3 and 1 1/2 = 3/2. Multiply: 21/6 = 7/2 = 3 1/2.',
    solutions: [
      {
        title: 'Way 1: Improper fractions',
        steps: [
          'Convert: 2 1/3 = 7/3 and 1 1/2 = 3/2.',
          'Multiply: (7 × 3)/(3 × 2) = 21/6.',
          'Simplify: 21/6 = 7/2 = 3 1/2.',
        ],
      },
      {
        title: 'Way 2: Cancel before multiplying',
        steps: [
          'Write 7/3 × 3/2 and cancel the 3 on top with the 3 on the bottom.',
          'That leaves 7/1 × 1/2 = 7/2.',
          '7/2 = 3 1/2.',
        ],
      },
      {
        title: 'Way 3: Whole plus half',
        steps: [
          'Multiplying by 1 1/2 means the number plus half of it.',
          'Half of 2 1/3 is 7/3 ÷ 2 = 7/6 = 1 1/6.',
          'Add: 2 1/3 + 1 1/6 = 2 2/6 + 1 1/6 = 3 3/6 = 3 1/2.',
        ],
      },
    ],
  },
  {
    id: 'nf-18', domain: '5.NF', standard: '5.NF.7', tier: 4, type: 'numeric',
    prompt: 'A 1/2-yard ribbon is cut into 3 EQUAL pieces. How long is each piece, in yards? (like 1/6)',
    answer: '1/6', acceptable: [],
    hints: ['This is 1/2 ÷ 3.', 'Dividing by 3 = multiplying by 1/3.'],
    explanation: '1/2 ÷ 3 = 1/2 × 1/3 = 1/6 yard per piece.',
    solutions: [
      {
        title: 'Way 1: Multiply by the reciprocal',
        steps: [
          'Cutting into 3 equal pieces means dividing by 3.',
          '1/2 ÷ 3 = 1/2 × 1/3 = 1/6.',
          'Each piece is 1/6 yard long.',
        ],
      },
      {
        title: 'Way 2: Picture the yard',
        steps: [
          'Picture a whole yard cut in half; the ribbon is one of those halves.',
          'Cut that half into 3 equal pieces; doing that to both halves would make 6 equal pieces.',
          'So each piece is 1 of 6 equal pieces of a yard: 1/6 yard.',
        ],
      },
    ],
  },
  {
    id: 'nf-19', domain: '5.NF', standard: '5.NF.7', tier: 4, type: 'constructed',
    prompt: 'Why is 4 ÷ 1/5 a BIG number (20) but 1/5 ÷ 4 a SMALL number (1/20)? Explain the difference.',
    answer: 'fit', acceptable: ['how many', 'share', 'split', '20'],
    hints: ['4 ÷ 1/5 asks: how many fifths fit in 4 wholes?', '1/5 ÷ 4 asks: split one fifth among 4.'],
    explanation: '4 ÷ 1/5 asks how many 1/5-size pieces fit into 4 wholes — 5 fit in each whole, so 20. But 1/5 ÷ 4 splits one small fifth into 4 even smaller parts, giving 1/20. Same numbers, opposite meanings!',
    solutions: [
      {
        title: 'Way 1: What each division asks',
        steps: [
          '4 ÷ 1/5 asks how many 1/5-size pieces fit inside 4 wholes.',
          'Each whole holds 5 fifths, so 4 wholes hold 4 × 5 = 20 pieces.',
          '1/5 ÷ 4 asks you to split one small fifth into 4 equal parts, giving 1/20.',
          'Fitting many small pieces gives a big answer; splitting a small piece gives a tiny one.',
        ],
      },
      {
        title: 'Way 2: Reciprocal rule',
        steps: [
          '4 ÷ 1/5 = 4 × 5 = 20, because dividing by 1/5 means multiplying by 5.',
          '1/5 ÷ 4 = 1/5 × 1/4 = 1/20, because dividing by 4 means taking one fourth.',
          'Multiplying by 5 grows the number, but taking 1/4 of a fifth shrinks it to 1/20.',
        ],
      },
    ],
  },
  // ---- New problems: Tier 1 ----
  {
    id: 'nf-20', domain: '5.NF', standard: '5.NF.1', tier: 1, type: 'multiple-choice',
    prompt: 'What is 3/5 + 1/5?',
    diagram: { kind: 'fractionBar', parts: 5, shaded: 3, second: { parts: 5, shaded: 1 } },
    choices: ['4/10', '4/5', '2/5', '4/25'], answer: '4/5',
    hints: ['The denominators are already the same.', 'Add only the tops: 3 + 1 = 4. Keep the 5.'],
    explanation: 'Same denominator, so add the numerators: 3 + 1 = 4 → 4/5.',
    solutions: [
      {
        title: 'Way 1: Add the numerators',
        steps: [
          'Both fractions are counted in fifths, so the pieces match.',
          'Add the tops: 3 + 1 = 4, and keep the denominator 5.',
          'So 3/5 + 1/5 = 4/5.',
        ],
      },
      {
        title: 'Way 2: Fraction bar picture',
        steps: [
          'Picture a bar cut into 5 equal parts with 3 parts shaded.',
          'Shade 1 more part for the second fraction.',
          'Now 4 of the 5 parts are shaded, so the sum is 4/5.',
        ],
      },
    ],
  },
  {
    id: 'nf-21', domain: '5.NF', standard: '5.NF.1', tier: 1, type: 'numeric',
    prompt: 'What is 5/6 − 2/6? (answer in sixths, like 1/6)',
    diagram: { kind: 'fractionBar', parts: 6, shaded: 5 },
    answer: '3/6', acceptable: ['1/2', '0.5'],
    hints: ['The denominators match, so only the tops change.', 'Subtract the tops: 5 − 2 = 3. Keep the 6.'],
    explanation: '5/6 − 2/6 = 3/6, which also equals 1/2.',
    solutions: [
      {
        title: 'Way 1: Subtract the numerators',
        steps: [
          'Both fractions are sixths, so the pieces are the same size.',
          'Subtract the tops: 5 − 2 = 3, and keep the denominator 6.',
          'So 5/6 − 2/6 = 3/6, which simplifies to 1/2.',
        ],
      },
      {
        title: 'Way 2: Take away shaded parts',
        steps: [
          'Shade 5 of the 6 parts of a bar.',
          'Erase 2 of the shaded parts to subtract 2/6.',
          '3 shaded parts remain out of 6, so the answer is 3/6.',
        ],
      },
    ],
  },
  {
    id: 'nf-22', domain: '5.NF', standard: '5.NF.1', tier: 1, type: 'multiple-choice',
    prompt: 'Fill in the blank: 3/4 = ?/8',
    choices: ['6', '7', '8', '12'], answer: '6',
    hints: ['The denominator went from 4 to 8. What did you multiply by?', '4 × 2 = 8, so multiply the top by 2 too.'],
    explanation: 'Multiply top and bottom by 2: 3/4 = 6/8.',
    solutions: [
      {
        title: 'Way 1: Scale up the fraction',
        steps: [
          'The denominator went from 4 to 8, and 4 × 2 = 8.',
          'Do the same to the top: 3 × 2 = 6.',
          'So 3/4 = 6/8, and the missing number is 6.',
        ],
      },
      {
        title: 'Way 2: Think in eighths',
        steps: [
          'Cut a bar into 8 equal parts.',
          'One fourth of 8 parts is 2 parts, so three fourths is 3 × 2 = 6 parts.',
          'That means 3/4 = 6/8, so the answer is 6.',
        ],
      },
    ],
  },
  {
    id: 'nf-23', domain: '5.NF', standard: '5.NF.3', tier: 1, type: 'multiple-choice',
    prompt: '3 brownies are shared equally by 4 kids. How much brownie does each kid get?',
    choices: ['3/4', '4/3', '1/3', '3/7'], answer: '3/4',
    hints: ['Sharing means dividing: 3 ÷ 4.', 'A fraction IS a division: 3 ÷ 4 = 3/4.'],
    explanation: 'Sharing 3 among 4 means 3 ÷ 4 = 3/4 of a brownie each.',
    solutions: [
      {
        title: 'Way 1: Fraction as division',
        steps: [
          'Sharing 3 brownies among 4 kids means 3 ÷ 4.',
          'A fraction is just a division written vertically: 3 ÷ 4 = 3/4.',
          'Each kid gets 3/4 of a brownie.',
        ],
      },
      {
        title: 'Way 2: Cut and deal',
        steps: [
          'Cut every brownie into 4 equal pieces, making 12 pieces in all.',
          'Deal them out: 12 pieces ÷ 4 kids = 3 pieces each.',
          'Each piece is 1/4 of a brownie, so 3 pieces is 3/4 of a brownie each.',
        ],
      },
    ],
  },
  {
    id: 'nf-24', domain: '5.NF', standard: '5.NF.4', tier: 1, type: 'numeric',
    prompt: 'What is 1/2 × 1/3? (like 1/4)',
    answer: '1/6', acceptable: [],
    hints: ['Multiply tops, then multiply bottoms.', '(1×1)/(2×3) = ?'],
    explanation: '1/2 × 1/3 = (1×1)/(2×3) = 1/6.',
    solutions: [
      {
        title: 'Way 1: Multiply straight across',
        steps: [
          'Multiply the tops: 1 × 1 = 1.',
          'Multiply the bottoms: 2 × 3 = 6.',
          'So 1/2 × 1/3 = 1/6.',
        ],
      },
      {
        title: 'Way 2: Half of a third',
        steps: [
          '1/2 × 1/3 means half OF one third.',
          'Cut a bar into 3 equal parts, then cut each part in half: now there are 6 equal parts.',
          'Half of one third is 1 of those 6 parts, so the answer is 1/6.',
        ],
      },
    ],
  },
  {
    id: 'nf-25', domain: '5.NF', standard: '5.NF.1', tier: 1, type: 'multiple-choice',
    prompt: 'Which number works as a common denominator for 1/3 and 1/4?',
    choices: ['7', '12', '3', '4'], answer: '12',
    hints: ['A common denominator is a number BOTH bottoms divide into.', 'Try 3 × 4.'],
    explanation: 'Both 3 and 4 divide into 12, so 12 is a common denominator.',
    solutions: [
      {
        title: 'Way 1: Multiply the denominators',
        steps: [
          'The product of two denominators always works: 3 × 4 = 12.',
          'Check: 12 ÷ 3 = 4 and 12 ÷ 4 = 3, both with no remainder.',
          'So 12 is a common denominator.',
        ],
      },
      {
        title: 'Way 2: List the multiples',
        steps: [
          'Multiples of 3: 3, 6, 9, 12, 15...',
          'Multiples of 4: 4, 8, 12, 16...',
          'The first number on both lists is 12, so 12 is the answer.',
        ],
      },
    ],
  },
  {
    id: 'nf-26', domain: '5.NF', standard: '5.NF.7', tier: 1, type: 'multiple-choice',
    prompt: 'What is 1/2 ÷ 2?',
    diagram: { kind: 'fractionBar', parts: 4, shaded: 1 },
    choices: ['1/4', '1', '2', '1/2'], answer: '1/4',
    hints: ['You are splitting one half into 2 equal parts.', 'Dividing by 2 is the same as multiplying by 1/2.'],
    explanation: 'Splitting 1/2 into 2 equal parts gives 1/4 each.',
    solutions: [
      {
        title: 'Way 1: Split the picture',
        steps: [
          'Start with half of a bar.',
          'Cut that half into 2 equal parts; cutting both halves that way makes 4 equal parts in the whole.',
          'Each part is 1 of 4 equal parts, so 1/2 ÷ 2 = 1/4.',
        ],
      },
      {
        title: 'Way 2: Multiply by the reciprocal',
        steps: [
          'Dividing by 2 is the same as multiplying by 1/2.',
          '1/2 ÷ 2 = 1/2 × 1/2 = 1/4.',
        ],
      },
    ],
  },
  {
    id: 'nf-27', domain: '5.NF', standard: '5.NF.2', tier: 1, type: 'multiple-choice',
    prompt: 'Without computing exactly, is 2/5 + 1/3 more than 1 or less than 1?',
    choices: ['More than 1', 'Less than 1', 'Exactly 1', 'Cannot tell'], answer: 'Less than 1',
    hints: ['Compare each fraction to the benchmark 1/2.', 'Both fractions are LESS than 1/2, so what can their sum be?'],
    explanation: 'Both 2/5 and 1/3 are less than 1/2, so their sum must be less than 1.',
    solutions: [
      {
        title: 'Way 1: Benchmark of one half',
        steps: [
          '2/5 is less than 1/2 because half of 5 is 2.5 and 2 is below that.',
          '1/3 is also less than 1/2.',
          'Two numbers each below 1/2 add to something below 1, so the sum is less than 1.',
        ],
      },
      {
        title: 'Way 2: Add exactly to check',
        steps: [
          'Common denominator 15: 2/5 = 6/15 and 1/3 = 5/15.',
          '6/15 + 5/15 = 11/15, and 11/15 is less than 15/15 = 1.',
          'So the sum is less than 1.',
        ],
      },
    ],
  },
  {
    id: 'nf-28', domain: '5.NF', standard: '5.NF.4', tier: 1, type: 'numeric',
    prompt: 'A pizza has 8 slices. You eat 1/4 of the pizza. How many slices did you eat?',
    answer: '2', acceptable: ['2 slices', '2.0'],
    hints: ['"Of" means multiply: 1/4 × 8.', 'Split 8 slices into 4 equal groups. How many in one group?'],
    explanation: '1/4 of 8 = 8 ÷ 4 = 2 slices.',
    solutions: [
      {
        title: 'Way 1: Divide into equal groups',
        steps: [
          'One fourth means 1 of 4 equal groups.',
          'Split 8 slices into 4 equal groups: 8 ÷ 4 = 2 slices per group.',
          'You ate 2 slices.',
        ],
      },
      {
        title: 'Way 2: Multiply',
        steps: [
          '"Of" means multiply: 1/4 × 8 = 8/4.',
          '8/4 = 2, so you ate 2 slices.',
        ],
      },
    ],
  },
  {
    id: 'nf-29', domain: '5.NF', standard: '5.NF.3', tier: 1, type: 'numeric',
    prompt: 'One sandwich is shared equally by 3 friends. What fraction of the sandwich does each friend get? (like 1/4)',
    answer: '1/3', acceptable: [],
    hints: ['Sharing 1 thing among 3 means 1 ÷ 3.', 'A fraction is a division: 1 ÷ 3 = 1/3.'],
    explanation: '1 ÷ 3 = 1/3 of the sandwich each.',
    solutions: [
      {
        title: 'Way 1: Fraction as division',
        steps: [
          'Sharing 1 sandwich among 3 friends is the division 1 ÷ 3.',
          'Writing that division as a fraction gives 1/3.',
          'Each friend gets 1/3 of the sandwich.',
        ],
      },
      {
        title: 'Way 2: Cut the sandwich',
        steps: [
          'Cut the sandwich into 3 equal pieces, one for each friend.',
          'Each piece is 1 of 3 equal pieces of the whole.',
          'So each friend gets 1/3 of the sandwich.',
        ],
      },
    ],
  },
  {
    id: 'nf-30', domain: '5.NF', standard: '5.NF.7', tier: 1, type: 'multiple-choice',
    prompt: 'How many 1/4 pieces fit in 1 whole?',
    diagram: { kind: 'fractionBar', parts: 4, shaded: 4 },
    choices: ['2', '3', '4', '8'], answer: '4',
    hints: ['This is asking 1 ÷ 1/4.', 'A whole cut into fourths has how many pieces?'],
    explanation: '1 ÷ 1/4 = 4, because a whole holds 4 fourths.',
    solutions: [
      {
        title: 'Way 1: Count the pieces',
        steps: [
          'Cut one whole into fourths.',
          'Count the pieces: there are exactly 4.',
          'So 4 pieces of size 1/4 fit in 1 whole.',
        ],
      },
      {
        title: 'Way 2: Multiply by the reciprocal',
        steps: [
          '1 ÷ 1/4 is the same as 1 × 4.',
          '1 × 4 = 4, so the answer is 4.',
        ],
      },
    ],
  },
  {
    id: 'nf-31', domain: '5.NF', standard: '5.NF.1', tier: 1, type: 'numeric',
    prompt: 'What is 7/10 − 3/10? (answer in tenths, like 5/10)',
    answer: '4/10', acceptable: ['2/5', '0.4'],
    hints: ['The denominators already match.', 'Subtract the tops: 7 − 3 = 4. Keep the 10.'],
    explanation: '7/10 − 3/10 = 4/10, which simplifies to 2/5.',
    solutions: [
      {
        title: 'Way 1: Subtract the numerators',
        steps: [
          'Both fractions are tenths, so the pieces are the same size.',
          'Subtract the tops: 7 − 3 = 4, and keep the denominator 10.',
          'So 7/10 − 3/10 = 4/10, which simplifies to 2/5.',
        ],
      },
      {
        title: 'Way 2: Think in dimes',
        steps: [
          'A tenth of a dollar is a dime, so 7/10 is like 7 dimes.',
          'Take away 3 dimes: 7 − 3 = 4 dimes left.',
          '4 dimes is 4/10 of a dollar, so the answer is 4/10.',
        ],
      },
    ],
  },
  // ---- New problems: Tier 2 ----
  {
    id: 'nf-32', domain: '5.NF', standard: '5.NF.1', tier: 2, type: 'multiple-choice',
    prompt: 'What is 1/4 + 1/3?',
    choices: ['2/7', '7/12', '2/12', '1/12'], answer: '7/12',
    hints: ['Find a common denominator for 4 and 3.', 'Rename: 1/4 = 3/12 and 1/3 = 4/12.'],
    explanation: '1/4 = 3/12 and 1/3 = 4/12, so the sum is 7/12.',
    solutions: [
      {
        title: 'Way 1: Common denominators',
        steps: [
          '4 × 3 = 12, so use 12 as the common denominator.',
          'Rename: 1/4 = 3/12 and 1/3 = 4/12.',
          'Add the tops: 3 + 4 = 7, so the sum is 7/12.',
        ],
      },
      {
        title: 'Way 2: Rule out wrong answers by size',
        steps: [
          'Adding two positive fractions must give MORE than either one, so the sum is bigger than 1/3.',
          '2/7, 2/12, and 1/12 are all smaller than 1/3, so they cannot be right.',
          'Checking 7/12 with common denominators: 3/12 + 4/12 = 7/12. The answer is 7/12.',
        ],
      },
    ],
  },
  {
    id: 'nf-33', domain: '5.NF', standard: '5.NF.1', tier: 2, type: 'numeric',
    prompt: 'What is 2/3 − 1/2? (like 1/4)',
    answer: '1/6', acceptable: [],
    hints: ['Common denominator of 3 and 2 is 6.', 'Rename: 2/3 = 4/6 and 1/2 = 3/6.'],
    explanation: '2/3 = 4/6 and 1/2 = 3/6, so the difference is 1/6.',
    solutions: [
      {
        title: 'Way 1: Common denominators',
        steps: [
          'The common denominator of 3 and 2 is 6.',
          'Rename: 2/3 = 4/6 and 1/2 = 3/6.',
          'Subtract the tops: 4 − 3 = 1, so the answer is 1/6.',
        ],
      },
      {
        title: 'Way 2: Number line in sixths',
        steps: [
          'Mark a number line from 0 to 1 in sixths.',
          '2/3 sits at the 4th tick and 1/2 sits at the 3rd tick.',
          'The gap between them is 1 tick, so 2/3 − 1/2 = 1/6.',
        ],
      },
    ],
  },
  {
    id: 'nf-34', domain: '5.NF', standard: '5.NF.2', tier: 2, type: 'multiple-choice',
    prompt: 'Maya added 1/2 + 1/3 and got 2/5. What mistake did she make?',
    choices: [
      'She added the numerators and the denominators',
      'She forgot to simplify her answer',
      'She subtracted instead of adding',
      'She used a common denominator that was too big',
    ],
    answer: 'She added the numerators and the denominators',
    hints: ['Look at where the 2 and the 5 in 2/5 came from.', '1 + 1 = 2 on top and 2 + 3 = 5 on the bottom — is that allowed?'],
    explanation: 'Maya added tops AND bottoms; you must rename with a common denominator first, giving 5/6.',
    solutions: [
      {
        title: 'Way 1: Spot the pattern in her answer',
        steps: [
          'In 2/5, the top is 1 + 1 = 2 and the bottom is 2 + 3 = 5.',
          'That shows she added the numerators and the denominators straight across.',
          'Denominators are piece sizes, not counts, so they cannot be added.',
          'Her mistake was adding the numerators and the denominators.',
        ],
      },
      {
        title: 'Way 2: Check with an estimate',
        steps: [
          '1/2 + 1/3 must be MORE than 1/2, since you added something to 1/2.',
          'But 2/5 is LESS than 1/2, so her answer cannot be right.',
          'The correct sum is 3/6 + 2/6 = 5/6; she added numerators and denominators.',
        ],
      },
    ],
  },
  {
    id: 'nf-35', domain: '5.NF', standard: '5.NF.4', tier: 2, type: 'numeric',
    prompt: 'What is 3/4 × 2/5? Give your answer in simplest form. (like 1/4)',
    answer: '3/10', acceptable: ['6/20', '0.3'],
    hints: ['Multiply tops, multiply bottoms.', '(3×2)/(4×5) = 6/20. Now simplify.'],
    explanation: '3/4 × 2/5 = 6/20 = 3/10.',
    solutions: [
      {
        title: 'Way 1: Multiply straight across',
        steps: [
          'Multiply the tops: 3 × 2 = 6.',
          'Multiply the bottoms: 4 × 5 = 20.',
          'Simplify 6/20 by dividing top and bottom by 2: the answer is 3/10.',
        ],
      },
      {
        title: 'Way 2: Simplify before multiplying',
        steps: [
          'In 3/4 × 2/5, the 2 on top and the 4 on the bottom share a factor of 2.',
          'Divide both by 2: now it is 3/2 × 1/5.',
          'Multiply: (3 × 1)/(2 × 5) = 3/10.',
        ],
      },
    ],
  },
  {
    id: 'nf-36', domain: '5.NF', standard: '5.NF.6', tier: 2, type: 'numeric',
    prompt: 'Each glass holds 2/3 cup of juice. How many cups fill 6 glasses?',
    answer: '4', acceptable: ['4 cups', '12/3', '4.0'],
    hints: ['Multiply: 6 × 2/3.', '6 × 2 = 12, over 3 → 12/3.'],
    explanation: '6 × 2/3 = 12/3 = 4 cups.',
    solutions: [
      {
        title: 'Way 1: Multiply',
        steps: [
          '6 glasses of 2/3 cup each means 6 × 2/3.',
          'Multiply the top: 6 × 2 = 12, giving 12/3.',
          '12/3 = 4, so you need 4 cups of juice.',
        ],
      },
      {
        title: 'Way 2: Group the thirds',
        steps: [
          'Each glass uses 2 thirds, so 6 glasses use 12 thirds of a cup.',
          'Every 3 thirds make 1 whole cup, and 12 ÷ 3 = 4.',
          'So 6 glasses take 4 cups.',
        ],
      },
    ],
  },
  {
    id: 'nf-37', domain: '5.NF', standard: '5.NF.3', tier: 2, type: 'multiple-choice',
    prompt: 'Which mixed number equals 7 ÷ 2?',
    choices: ['3 1/2', '3', '2 1/2', '14'], answer: '3 1/2',
    hints: ['A fraction is a division: 7 ÷ 2 = 7/2.', 'How many 2s in 7, and what is left over?'],
    explanation: '7 ÷ 2 = 7/2 = 3 1/2.',
    solutions: [
      {
        title: 'Way 1: Fraction as division',
        steps: [
          'Write the division as a fraction: 7 ÷ 2 = 7/2.',
          '7/2 means 7 halves: 6 halves make 3 wholes, with 1 half left.',
          'So 7 ÷ 2 = 3 1/2.',
        ],
      },
      {
        title: 'Way 2: Divide with a remainder',
        steps: [
          '2 goes into 7 three times, since 2 × 3 = 6.',
          'There is 1 left over, and 1 shared by 2 is 1/2.',
          'So 7 ÷ 2 = 3 1/2.',
        ],
      },
    ],
  },
  {
    id: 'nf-38', domain: '5.NF', standard: '5.NF.7', tier: 2, type: 'multiple-choice',
    prompt: 'What is 1/3 ÷ 2?',
    choices: ['1/6', '2/3', '1/5', '6'], answer: '1/6',
    hints: ['You are splitting one third into 2 equal parts.', 'Dividing by 2 = multiplying by 1/2.'],
    explanation: '1/3 ÷ 2 = 1/3 × 1/2 = 1/6.',
    solutions: [
      {
        title: 'Way 1: Split the picture',
        steps: [
          'Start with one third of a bar.',
          'Cut it into 2 equal parts; cutting every third that way makes 6 equal parts in the whole.',
          'Each part is 1/6, so 1/3 ÷ 2 = 1/6.',
        ],
      },
      {
        title: 'Way 2: Multiply by the reciprocal',
        steps: [
          'Dividing by 2 is the same as multiplying by 1/2.',
          '1/3 × 1/2 = 1/6.',
          'So 1/3 ÷ 2 = 1/6.',
        ],
      },
    ],
  },
  {
    id: 'nf-39', domain: '5.NF', standard: '5.NF.7', tier: 2, type: 'numeric',
    prompt: 'What is 5 ÷ 1/3?',
    answer: '15', acceptable: ['15.0'],
    hints: ['Ask: how many thirds fit in 5 wholes?', 'Each whole holds 3 thirds.'],
    explanation: '5 ÷ 1/3 = 5 × 3 = 15.',
    solutions: [
      {
        title: 'Way 1: How many fit?',
        steps: [
          'Ask: how many 1/3-size pieces fit in 5 wholes?',
          'Each whole holds 3 thirds.',
          '5 wholes × 3 thirds each = 15.',
        ],
      },
      {
        title: 'Way 2: Multiply by the reciprocal',
        steps: [
          'Dividing by 1/3 is the same as multiplying by 3.',
          '5 × 3 = 15, so 5 ÷ 1/3 = 15.',
        ],
      },
    ],
  },
  {
    id: 'nf-40', domain: '5.NF', standard: '5.NF.2', tier: 2, type: 'multiple-choice',
    prompt: 'Estimate: 7/8 + 1/10 is CLOSEST to which number?',
    diagram: { kind: 'numberLine', min: 0, max: 1, ticks: 8 },
    choices: ['0', '1/2', '1', '2'], answer: '1',
    hints: ['Compare each fraction to the benchmarks 0, 1/2, and 1.', '7/8 is almost 1, and 1/10 is almost 0.'],
    explanation: '7/8 is nearly 1 and 1/10 is nearly 0, so the sum is closest to 1.',
    solutions: [
      {
        title: 'Way 1: Use benchmarks',
        steps: [
          '7/8 is only 1/8 away from 1, so it is almost 1.',
          '1/10 is tiny, very close to 0.',
          'Almost 1 plus almost 0 is close to 1, so the sum is closest to 1.',
        ],
      },
      {
        title: 'Way 2: Add exactly to check',
        steps: [
          'Common denominator 40: 7/8 = 35/40 and 1/10 = 4/40.',
          '35/40 + 4/40 = 39/40.',
          '39/40 is just below 40/40 = 1, so the sum is closest to 1.',
        ],
      },
    ],
  },
  {
    id: 'nf-41', domain: '5.NF', standard: '5.NF.1', tier: 2, type: 'numeric',
    prompt: 'Jade has 5/6 yard of ribbon and uses 1/3 yard on a gift. How much ribbon is left, in yards? (like 1/4)',
    answer: '1/2', acceptable: ['3/6', '0.5'],
    hints: ['Subtract: 5/6 − 1/3.', 'Rename 1/3 as 2/6 first.'],
    explanation: '5/6 − 2/6 = 3/6 = 1/2 yard left.',
    solutions: [
      {
        title: 'Way 1: Common denominators',
        steps: [
          'Rename 1/3 in sixths: 1/3 = 2/6.',
          'Subtract: 5/6 − 2/6 = 3/6.',
          '3/6 simplifies to 1/2, so 1/2 yard of ribbon is left.',
        ],
      },
      {
        title: 'Way 2: Number line hops',
        steps: [
          'Mark a number line from 0 to 1 in sixths and start at 5/6.',
          '1/3 equals 2 sixths, so hop back 2 ticks.',
          'You land on 3/6, which is 1/2 yard.',
        ],
      },
    ],
  },
  {
    id: 'nf-42', domain: '5.NF', standard: '5.NF.4', tier: 2, type: 'multiple-choice',
    prompt: 'A pan of brownies is 1/2 full. Sam eats 1/3 OF what is left. What fraction of the whole pan did Sam eat?',
    diagram: { kind: 'fractionBar', parts: 6, shaded: 1 },
    choices: ['1/6', '1/5', '2/5', '5/6'], answer: '1/6',
    hints: ['"Of" means multiply: 1/3 × 1/2.', 'Multiply tops and bottoms: (1×1)/(3×2).'],
    explanation: '1/3 of 1/2 = 1/3 × 1/2 = 1/6 of the pan.',
    solutions: [
      {
        title: 'Way 1: Multiply the fractions',
        steps: [
          'Eating 1/3 OF 1/2 means 1/3 × 1/2.',
          'Multiply tops: 1 × 1 = 1. Multiply bottoms: 3 × 2 = 6.',
          'Sam ate 1/6 of the whole pan.',
        ],
      },
      {
        title: 'Way 2: Cut the pan',
        steps: [
          'Picture the half-full pan; cut that half into 3 equal strips.',
          'Sam eats 1 strip. Cutting the whole pan that way would make 6 strips.',
          'One strip is 1/6 of the pan, so Sam ate 1/6.',
        ],
      },
    ],
  },
  {
    id: 'nf-43', domain: '5.NF', standard: '5.NF.5', tier: 2, type: 'multiple-choice',
    prompt: 'Without computing, which product is GREATER than 5?',
    choices: ['5 × 1/2', '5 × 2/3', '5 × 3/2', '5 × 1'], answer: '5 × 3/2',
    hints: ['Compare each fraction factor to 1.', 'Multiplying by a fraction greater than 1 scales UP.'],
    explanation: 'Only 3/2 is greater than 1, so only 5 × 3/2 is greater than 5.',
    solutions: [
      {
        title: 'Way 1: Scaling reasoning',
        steps: [
          'Multiplying by a fraction less than 1 shrinks a number; greater than 1 grows it.',
          '1/2 and 2/3 are less than 1, and 1 keeps 5 the same.',
          '3/2 is greater than 1, so 5 × 3/2 is the only product greater than 5.',
        ],
      },
      {
        title: 'Way 2: Compute each product',
        steps: [
          '5 × 1/2 = 2 1/2 and 5 × 2/3 = 10/3 = 3 1/3, both less than 5.',
          '5 × 1 = 5 exactly.',
          '5 × 3/2 = 15/2 = 7 1/2, which is greater than 5. That is the answer.',
        ],
      },
    ],
  },
  {
    id: 'nf-44', domain: '5.NF', standard: '5.NF.3', tier: 2, type: 'numeric',
    prompt: 'An art teacher splits 12 pounds of clay equally among 8 students. How many pounds does each student get? (mixed number like 1 1/2)',
    answer: '1 1/2', acceptable: ['3/2', '12/8', '1.5'],
    hints: ['A fraction is a division: 12 ÷ 8 = 12/8.', 'Simplify 12/8, or think: 8 pounds gives 1 each, then split the last 4.'],
    explanation: '12 ÷ 8 = 12/8 = 3/2 = 1 1/2 pounds each.',
    solutions: [
      {
        title: 'Way 1: Fraction as division',
        steps: [
          'Sharing 12 pounds among 8 students means 12 ÷ 8 = 12/8.',
          'Simplify by dividing top and bottom by 4: 12/8 = 3/2.',
          '3/2 = 1 1/2 pounds for each student.',
        ],
      },
      {
        title: 'Way 2: Deal out the clay',
        steps: [
          'Give each of the 8 students 1 pound. That uses 8 pounds.',
          '4 pounds remain for 8 students, and 4 ÷ 8 = 1/2 pound each.',
          'Each student gets 1 + 1/2 = 1 1/2 pounds.',
        ],
      },
    ],
  },
  {
    id: 'nf-45', domain: '5.NF', standard: '5.NF.6', tier: 2, type: 'multiple-choice',
    prompt: 'Marcus has $20 and spends 2/5 of it on a game. How much money does he spend?',
    choices: ['$8', '$4', '$10', '$12'], answer: '$8',
    hints: ['Find 1/5 of 20 first.', '20 ÷ 5 = 4, then multiply by 2.'],
    explanation: '2/5 × 20 = 8, so Marcus spends $8.',
    solutions: [
      {
        title: 'Way 1: Divide then multiply',
        steps: [
          'Find 1/5 of $20: 20 ÷ 5 = $4.',
          '2/5 is twice that: 2 × 4 = $8.',
          'Marcus spends $8.',
        ],
      },
      {
        title: 'Way 2: Bar model',
        steps: [
          'Draw a bar for $20 split into 5 equal boxes.',
          'Each box is 20 ÷ 5 = $4, and spending 2/5 means 2 boxes.',
          '2 boxes = 4 + 4 = $8 spent.',
        ],
      },
    ],
  },
  {
    id: 'nf-46', domain: '5.NF', standard: '5.NF.1', tier: 2, type: 'multiple-choice',
    prompt: 'Which sum equals EXACTLY 1?',
    choices: ['1/2 + 1/3', '1/4 + 3/4', '2/3 + 1/2', '1/5 + 3/5'], answer: '1/4 + 3/4',
    hints: ['A sum equals 1 when the parts make a complete whole.', 'Look for two fractions with the same denominator whose tops add to the bottom.'],
    explanation: '1/4 + 3/4 = 4/4 = 1.',
    solutions: [
      {
        title: 'Way 1: Same-denominator check',
        steps: [
          '1/4 + 3/4 has matching denominators, so add tops: 1 + 3 = 4.',
          '4/4 means 4 of 4 equal parts, which is exactly 1 whole.',
          'So 1/4 + 3/4 is the sum that equals exactly 1.',
        ],
      },
      {
        title: 'Way 2: Test every choice',
        steps: [
          '1/2 + 1/3 = 3/6 + 2/6 = 5/6, less than 1.',
          '2/3 + 1/2 = 4/6 + 3/6 = 7/6, more than 1, and 1/5 + 3/5 = 4/5, less than 1.',
          '1/4 + 3/4 = 4/4 = 1 exactly, so it is the answer.',
        ],
      },
    ],
  },
  {
    id: 'nf-47', domain: '5.NF', standard: '5.NF.7', tier: 2, type: 'numeric',
    prompt: 'A bag holds 1/4 pound of trail mix. Two hikers share it equally. How much does each hiker get, in pounds? (like 1/6)',
    answer: '1/8', acceptable: [],
    hints: ['This is 1/4 ÷ 2.', 'Dividing by 2 = multiplying by 1/2.'],
    explanation: '1/4 ÷ 2 = 1/4 × 1/2 = 1/8 pound each.',
    solutions: [
      {
        title: 'Way 1: Multiply by the reciprocal',
        steps: [
          'Sharing 1/4 pound between 2 hikers means 1/4 ÷ 2.',
          'Dividing by 2 is the same as multiplying by 1/2: 1/4 × 1/2 = 1/8.',
          'Each hiker gets 1/8 pound.',
        ],
      },
      {
        title: 'Way 2: Cut the pieces smaller',
        steps: [
          'Picture a pound bar cut into fourths; the bag is one fourth.',
          'Cut that fourth in half; cutting every fourth that way makes 8 equal pieces per pound.',
          'Each hiker gets 1 piece, which is 1/8 pound.',
        ],
      },
    ],
  },
  {
    id: 'nf-48', domain: '5.NF', standard: '5.NF.2', tier: 2, type: 'constructed',
    prompt: 'A friend says 2/6 + 3/6 = 5/12. Explain what went wrong and give the correct sum.',
    answer: 'denominator', acceptable: ['5/6', 'keep the denominator', 'same size pieces', 'do not add denominators', 'sixths'],
    hints: ['The pieces are already the same size — sixths.', 'When denominators match, only the tops get added.'],
    explanation: 'The friend added the denominators, but sixths plus sixths are still sixths: 2/6 + 3/6 = 5/6.',
    solutions: [
      {
        title: 'Way 1: Pieces stay the same size',
        steps: [
          'Both fractions count sixths, so all the pieces are already the same size.',
          'Adding 2 sixths and 3 sixths gives 5 sixths, not 5 twelfths.',
          'The friend wrongly added the denominators; the correct sum is 5/6.',
        ],
      },
      {
        title: 'Way 2: Estimate to spot the error',
        steps: [
          '2/6 + 3/6 should be close to 1, since 5 of 6 parts is nearly a whole.',
          'But 5/12 is less than 1/2, way too small.',
          'That signals the denominator was changed by mistake; keeping it gives 5/6.',
        ],
      },
    ],
  },
  {
    id: 'nf-49', domain: '5.NF', standard: '5.NF.4', tier: 2, type: 'constructed',
    prompt: 'Use a square to explain why 1/2 × 1/2 = 1/4.',
    diagram: { kind: 'shape', shape: 'square' },
    answer: 'fourth', acceptable: ['1/4', 'quarter', 'four equal parts', 'half of a half', '4 parts'],
    hints: ['Shade half of the square, then take half of THAT.', 'How many pieces that size would fill the whole square?'],
    explanation: 'Half of a half of the square is 1 of 4 equal parts, so 1/2 × 1/2 = 1/4.',
    solutions: [
      {
        title: 'Way 1: Fold the square',
        steps: [
          'Cut a square in half with a vertical line and shade one half.',
          'Now cut the square in half the other way and keep half of the shaded part.',
          'The square is now in 4 equal parts and you kept 1 of them.',
          'So half of a half is 1/4, which means 1/2 × 1/2 = 1/4.',
        ],
      },
      {
        title: 'Way 2: Multiply the fractions',
        steps: [
          'Multiply tops: 1 × 1 = 1. Multiply bottoms: 2 × 2 = 4.',
          'That gives 1/4, matching the picture of 4 equal parts.',
          'So 1/2 × 1/2 = 1/4.',
        ],
      },
    ],
  },
  // ---- New problems: Tier 3 ----
  {
    id: 'nf-50', domain: '5.NF', standard: '5.NF.1', tier: 3, type: 'numeric',
    prompt: 'Compute 3 1/3 − 1 1/2. Give your answer as a mixed number (like 1 1/6).',
    answer: '1 5/6', acceptable: ['11/6'],
    hints: ['Use sixths: 1/3 = 2/6 and 1/2 = 3/6.', 'You cannot take 3/6 from 2/6, so regroup one whole into 6/6.'],
    explanation: '3 2/6 − 1 3/6 = 2 8/6 − 1 3/6 = 1 5/6.',
    solutions: [
      {
        title: 'Way 1: Regroup with common denominators',
        steps: [
          'Rename in sixths: 3 1/3 = 3 2/6 and 1 1/2 = 1 3/6.',
          'Since 2/6 is less than 3/6, regroup: 3 2/6 = 2 8/6.',
          'Subtract: 2 8/6 − 1 3/6 = 1 5/6.',
        ],
      },
      {
        title: 'Way 2: Improper fractions',
        steps: [
          'Convert: 3 1/3 = 10/3 = 20/6 and 1 1/2 = 3/2 = 9/6.',
          'Subtract: 20/6 − 9/6 = 11/6.',
          '11/6 = 1 5/6.',
        ],
      },
      {
        title: 'Way 3: Count up from 1 1/2',
        steps: [
          'From 1 1/2, add 1/2 to reach 2. From 2, add 1 1/3 to reach 3 1/3.',
          'Total counted up: 1/2 + 1 1/3 = 3/6 + 1 2/6 = 1 5/6.',
          'So the difference is 1 5/6.',
        ],
      },
    ],
  },
  {
    id: 'nf-51', domain: '5.NF', standard: '5.NF.1', tier: 3, type: 'multiple-choice',
    prompt: 'What is 2 3/4 + 1 2/3?',
    choices: ['3 5/7', '4 5/12', '4 1/12', '3 5/12'], answer: '4 5/12',
    hints: ['Common denominator of 4 and 3 is 12.', '3/4 = 9/12 and 2/3 = 8/12, so the fractions add to 17/12.'],
    explanation: '2 9/12 + 1 8/12 = 3 17/12 = 4 5/12.',
    solutions: [
      {
        title: 'Way 1: Add wholes and fractions separately',
        steps: [
          'Wholes: 2 + 1 = 3.',
          'Fractions in twelfths: 3/4 = 9/12 and 2/3 = 8/12, so 9/12 + 8/12 = 17/12.',
          '17/12 = 1 5/12, and 3 + 1 5/12 = 4 5/12.',
        ],
      },
      {
        title: 'Way 2: Improper fractions',
        steps: [
          'Convert: 2 3/4 = 11/4 = 33/12 and 1 2/3 = 5/3 = 20/12.',
          'Add: 33/12 + 20/12 = 53/12.',
          '53/12 = 4 remainder 5, so the sum is 4 5/12.',
        ],
      },
    ],
  },
  {
    id: 'nf-52', domain: '5.NF', standard: '5.NF.2', tier: 3, type: 'numeric',
    prompt: 'Liam ran 1/2 mile, biked 2/3 mile, and walked 1/4 mile. How far did he travel in all? (mixed number like 1 1/12)',
    answer: '1 5/12', acceptable: ['17/12'],
    hints: ['Find a denominator that 2, 3, and 4 all divide into.', 'In twelfths: 6/12 + 8/12 + 3/12.'],
    explanation: '6/12 + 8/12 + 3/12 = 17/12 = 1 5/12 miles.',
    solutions: [
      {
        title: 'Way 1: Common denominator of 12',
        steps: [
          '2, 3, and 4 all divide into 12, so rename everything in twelfths.',
          '1/2 = 6/12, 2/3 = 8/12, and 1/4 = 3/12.',
          'Add the tops: 6 + 8 + 3 = 17, giving 17/12 = 1 5/12 miles.',
        ],
      },
      {
        title: 'Way 2: Pair up friendly fractions first',
        steps: [
          'Add 1/2 + 1/4 first: 2/4 + 1/4 = 3/4.',
          'Now add 3/4 + 2/3 = 9/12 + 8/12 = 17/12.',
          '17/12 = 1 5/12 miles in all.',
        ],
      },
      {
        title: 'Way 3: Estimate to check',
        steps: [
          '1/2 + 2/3 is more than 1 since both are at least one half.',
          'Adding 1/4 more lands between 1 and 2, so a mixed number like 1 5/12 is sensible.',
          'The exact total is 1 5/12 miles.',
        ],
      },
    ],
  },
  {
    id: 'nf-53', domain: '5.NF', standard: '5.NF.4', tier: 3, type: 'multiple-choice',
    prompt: 'A garden plot is 2/3 yard long and 3/5 yard wide. What is its area in square yards?',
    diagram: { kind: 'shape', shape: 'rectangle' },
    choices: ['2/5', '5/8', '6/8', '1 4/15'], answer: '2/5',
    hints: ['Area = length × width = 2/3 × 3/5.', 'Multiply tops and bottoms: 6/15, then simplify.'],
    explanation: '2/3 × 3/5 = 6/15 = 2/5 square yard.',
    solutions: [
      {
        title: 'Way 1: Multiply then simplify',
        steps: [
          'Area = length × width = 2/3 × 3/5.',
          'Tops: 2 × 3 = 6. Bottoms: 3 × 5 = 15. That is 6/15.',
          'Divide top and bottom by 3: the area is 2/5 square yard.',
        ],
      },
      {
        title: 'Way 2: Cancel before multiplying',
        steps: [
          'In 2/3 × 3/5, the 3 on top cancels the 3 on the bottom.',
          'That leaves 2/1 × 1/5 = 2/5.',
          'The area is 2/5 square yard.',
        ],
      },
      {
        title: 'Way 3: Grid picture',
        steps: [
          'Cut a square yard into 3 columns and 5 rows: 15 equal parts.',
          'The plot covers 2 columns and 3 rows, which is 2 × 3 = 6 parts.',
          '6 of 15 parts is 6/15 = 2/5 square yard.',
        ],
      },
    ],
  },
  {
    id: 'nf-54', domain: '5.NF', standard: '5.NF.5', tier: 3, type: 'multiple-choice',
    prompt: 'Without multiplying, which statement about 2/3 × 9 is TRUE?',
    choices: [
      'The product is greater than 9',
      'The product is less than 9',
      'The product is equal to 9',
      'The product is equal to 2/3',
    ],
    answer: 'The product is less than 9',
    hints: ['Compare the factor 2/3 to 1.', 'Multiplying by a fraction less than 1 scales the other factor DOWN.'],
    explanation: '2/3 < 1, so 2/3 × 9 must be less than 9 (it is 6).',
    solutions: [
      {
        title: 'Way 1: Scaling reasoning',
        steps: [
          'The factor 2/3 is less than 1.',
          'Multiplying 9 by a number less than 1 shrinks it.',
          'So 2/3 × 9 is less than 9, and that statement is true.',
        ],
      },
      {
        title: 'Way 2: Compute to confirm',
        steps: [
          '2/3 × 9 = 18/3 = 6.',
          '6 is less than 9.',
          'So the true statement is that the product is less than 9.',
        ],
      },
    ],
  },
  {
    id: 'nf-55', domain: '5.NF', standard: '5.NF.6', tier: 3, type: 'numeric',
    prompt: 'One batch of muffins uses 3/4 cup of flour. How much flour is needed for 2 1/2 batches? (mixed number like 1 1/8)',
    answer: '1 7/8', acceptable: ['15/8', '1.875'],
    hints: ['Multiply: 3/4 × 2 1/2.', 'Convert 2 1/2 to 5/2 first.'],
    explanation: '3/4 × 5/2 = 15/8 = 1 7/8 cups of flour.',
    solutions: [
      {
        title: 'Way 1: Improper fractions',
        steps: [
          'Convert the mixed number: 2 1/2 = 5/2.',
          'Multiply: 3/4 × 5/2 = 15/8.',
          '15/8 = 1 7/8 cups of flour.',
        ],
      },
      {
        title: 'Way 2: Break apart the batches',
        steps: [
          '2 whole batches use 2 × 3/4 = 6/4 = 1 1/2 cups.',
          'Half a batch uses half of 3/4, which is 3/8 cup.',
          'Add: 1 1/2 + 3/8 = 1 4/8 + 3/8 = 1 7/8 cups.',
        ],
      },
    ],
  },
  {
    id: 'nf-56', domain: '5.NF', standard: '5.NF.7', tier: 3, type: 'multiple-choice',
    prompt: 'A chef has 6 pounds of beef and makes 1/4-pound burgers. How many burgers can the chef make?',
    diagram: { kind: 'numberLine', min: 0, max: 6, ticks: 24, mark: 6 },
    choices: ['24', '10', '2', '12'], answer: '24',
    hints: ['This is 6 ÷ 1/4.', 'Each pound makes 4 burgers.'],
    explanation: '6 ÷ 1/4 = 6 × 4 = 24 burgers.',
    solutions: [
      {
        title: 'Way 1: How many fit?',
        steps: [
          'Ask: how many 1/4-pound portions fit in 6 pounds?',
          'Each pound holds 4 quarter-pound portions.',
          '6 pounds × 4 burgers per pound = 24 burgers.',
        ],
      },
      {
        title: 'Way 2: Multiply by the reciprocal',
        steps: [
          'Dividing by 1/4 is the same as multiplying by 4.',
          '6 ÷ 1/4 = 6 × 4 = 24 burgers.',
        ],
      },
    ],
  },
  {
    id: 'nf-57', domain: '5.NF', standard: '5.NF.3', tier: 3, type: 'multiple-choice',
    prompt: 'Which story matches the fraction 3/8?',
    choices: [
      '3 pizzas shared equally by 8 friends',
      '8 pizzas shared equally by 3 friends',
      '3 pizzas with 8 slices each',
      '8 friends who each eat 3 pizzas',
    ],
    answer: '3 pizzas shared equally by 8 friends',
    hints: ['3/8 means 3 ÷ 8.', 'Which story divides 3 things among 8 people?'],
    explanation: '3/8 = 3 ÷ 8, which matches sharing 3 pizzas among 8 friends.',
    solutions: [
      {
        title: 'Way 1: Fraction as division',
        steps: [
          'The fraction 3/8 means the division 3 ÷ 8.',
          'Sharing 3 pizzas equally among 8 friends is exactly 3 ÷ 8.',
          'So the matching story is 3 pizzas shared equally by 8 friends.',
        ],
      },
      {
        title: 'Way 2: Test each story',
        steps: [
          '8 pizzas for 3 friends is 8 ÷ 3 = 8/3, too big.',
          '3 pizzas with 8 slices each is 24 slices, and 8 friends eating 3 pizzas each is 24 pizzas.',
          'Only sharing 3 pizzas among 8 friends gives 3/8 of a pizza per person.',
        ],
      },
    ],
  },
  {
    id: 'nf-58', domain: '5.NF', standard: '5.NF.1', tier: 3, type: 'numeric',
    prompt: 'Compute 4 1/6 − 2 2/3. Give your answer as a mixed number (like 1 1/2).',
    answer: '1 1/2', acceptable: ['3/2', '9/6', '1.5'],
    hints: ['Rename 2/3 in sixths: 2/3 = 4/6.', '1/6 is less than 4/6, so regroup one whole into 6/6.'],
    explanation: '4 1/6 = 3 7/6; then 3 7/6 − 2 4/6 = 1 3/6 = 1 1/2.',
    solutions: [
      {
        title: 'Way 1: Regroup with common denominators',
        steps: [
          'Rename: 2 2/3 = 2 4/6, so the problem is 4 1/6 − 2 4/6.',
          'Since 1/6 is less than 4/6, regroup: 4 1/6 = 3 7/6.',
          'Subtract: 3 7/6 − 2 4/6 = 1 3/6 = 1 1/2.',
        ],
      },
      {
        title: 'Way 2: Improper fractions',
        steps: [
          'Convert: 4 1/6 = 25/6 and 2 2/3 = 8/3 = 16/6.',
          'Subtract: 25/6 − 16/6 = 9/6.',
          '9/6 = 3/2 = 1 1/2.',
        ],
      },
    ],
  },
  {
    id: 'nf-59', domain: '5.NF', standard: '5.NF.2', tier: 3, type: 'multiple-choice',
    prompt: 'Without computing exactly, which sum is GREATER than 1?',
    choices: ['5/8 + 4/7', '1/3 + 2/5', '1/2 + 3/8', '2/5 + 1/2'], answer: '5/8 + 4/7',
    hints: ['Compare each fraction to the benchmark 1/2.', 'If BOTH fractions are bigger than 1/2, the sum beats 1.'],
    explanation: '5/8 and 4/7 are each greater than 1/2, so their sum is greater than 1.',
    solutions: [
      {
        title: 'Way 1: Benchmark of one half',
        steps: [
          '5/8 is more than 1/2 because half of 8 is 4 and 5 is bigger than 4.',
          '4/7 is more than 1/2 because half of 7 is 3.5 and 4 is bigger.',
          'Two fractions each over 1/2 must add to more than 1, so 5/8 + 4/7 is the answer.',
        ],
      },
      {
        title: 'Way 2: Rule out the other sums',
        steps: [
          '1/3 + 2/5: both are under 1/2, so the sum is under 1.',
          '1/2 + 3/8 = 7/8 and 2/5 + 1/2 = 9/10, both under 1.',
          'Only 5/8 + 4/7 = 35/56 + 32/56 = 67/56 is greater than 1.',
        ],
      },
    ],
  },
  {
    id: 'nf-60', domain: '5.NF', standard: '5.NF.4', tier: 3, type: 'numeric',
    prompt: 'What is 5/6 × 3/10? Give your answer in simplest form. (like 1/5)',
    answer: '1/4', acceptable: ['15/60', '3/12', '0.25'],
    hints: ['Multiply tops and bottoms, or cancel first.', '(5×3)/(6×10) = 15/60. Simplify all the way down.'],
    explanation: '5/6 × 3/10 = 15/60 = 1/4.',
    solutions: [
      {
        title: 'Way 1: Multiply then simplify',
        steps: [
          'Tops: 5 × 3 = 15. Bottoms: 6 × 10 = 60.',
          'That gives 15/60.',
          'Divide top and bottom by 15: the answer is 1/4.',
        ],
      },
      {
        title: 'Way 2: Cancel before multiplying',
        steps: [
          'The 5 on top and the 10 on the bottom share a factor of 5: now 1/6 × 3/2.',
          'The 3 on top and the 6 on the bottom share a factor of 3: now 1/2 × 1/2.',
          '1/2 × 1/2 = 1/4.',
        ],
      },
    ],
  },
  {
    id: 'nf-61', domain: '5.NF', standard: '5.NF.6', tier: 3, type: 'numeric',
    prompt: 'Ava has $24 of birthday money. She spends 3/8 of it on a book. How many dollars does she spend?',
    answer: '9', acceptable: ['$9', '9 dollars'],
    hints: ['Find 1/8 of 24 first.', '24 ÷ 8 = 3, then multiply by 3.'],
    explanation: '3/8 × 24 = 9, so Ava spends $9.',
    solutions: [
      {
        title: 'Way 1: Divide then multiply',
        steps: [
          'Find 1/8 of $24: 24 ÷ 8 = $3.',
          '3/8 is three of those parts: 3 × 3 = $9.',
          'Ava spends $9.',
        ],
      },
      {
        title: 'Way 2: Multiply straight across',
        steps: [
          '3/8 × 24 = (3 × 24)/8 = 72/8.',
          '72 ÷ 8 = 9.',
          'Ava spends $9 on the book.',
        ],
      },
      {
        title: 'Way 3: Bar model',
        steps: [
          'Draw a bar for $24 cut into 8 equal boxes of $3 each.',
          'Shade 3 boxes for the book: 3 + 3 + 3 = $9.',
          'So she spends $9.',
        ],
      },
    ],
  },
  {
    id: 'nf-62', domain: '5.NF', standard: '5.NF.7', tier: 3, type: 'constructed',
    prompt: 'A 1/2-pound block of clay is shared equally by 5 students. Explain why each student gets 1/10 of a pound.',
    answer: '1/10', acceptable: ['tenth', 'multiply by 1/5', '10 equal pieces', 'split', 'reciprocal'],
    hints: ['You are splitting one half into 5 equal parts.', 'If both halves of a pound were split into 5, how many pieces would there be?'],
    explanation: 'Splitting 1/2 into 5 equal parts is 1/2 ÷ 5 = 1/2 × 1/5 = 1/10 pound each.',
    solutions: [
      {
        title: 'Way 1: Cut the picture',
        steps: [
          'Picture a 1-pound bar cut in half; the class has one of the halves.',
          'Cut that half into 5 equal pieces, one per student.',
          'Cutting both halves that way would make 10 equal pieces in the pound.',
          'Each piece is 1 of 10 equal pieces, so each student gets 1/10 pound.',
        ],
      },
      {
        title: 'Way 2: Multiply by the reciprocal',
        steps: [
          'Sharing among 5 means dividing by 5, which is multiplying by 1/5.',
          '1/2 ÷ 5 = 1/2 × 1/5 = 1/10.',
          'So each student gets 1/10 of a pound.',
        ],
      },
    ],
  },
  {
    id: 'nf-63', domain: '5.NF', standard: '5.NF.2', tier: 3, type: 'constructed',
    prompt: 'Jaden says 3/4 + 5/6 is less than 1. Without finding the exact sum, explain how you know he is wrong.',
    answer: 'half', acceptable: ['1/2', 'greater than 1', 'more than 1', 'benchmark', '19/12'],
    hints: ['Compare each fraction to the benchmark 1/2.', 'If each addend is bigger than 1/2, how big must the sum be?'],
    explanation: 'Both 3/4 and 5/6 are greater than 1/2, so the sum must be greater than 1.',
    solutions: [
      {
        title: 'Way 1: Benchmark of one half',
        steps: [
          '3/4 is greater than 1/2, and 5/6 is also greater than 1/2.',
          'Two numbers that are each more than 1/2 must add to more than 1.',
          'So the sum is greater than 1 and Jaden is wrong.',
        ],
      },
      {
        title: 'Way 2: Compare to a whole',
        steps: [
          '5/6 alone is already close to 1, just 1/6 short.',
          'Adding 3/4, which is much bigger than 1/6, pushes the total past 1.',
          'Exact check: 9/12 + 10/12 = 19/12 = 1 7/12, so Jaden is wrong.',
        ],
      },
    ],
  },
  {
    id: 'nf-64', domain: '5.NF', standard: '5.NF.5', tier: 3, type: 'multiple-choice',
    prompt: 'Without computing, which expression equals EXACTLY 8?',
    choices: ['8 × 2/3', '8 × 6/6', '8 × 5/4', '8 × 1/8'], answer: '8 × 6/6',
    hints: ['Multiplying by 1 keeps a number the same.', 'Which fraction equals exactly 1?'],
    explanation: '6/6 = 1, so 8 × 6/6 = 8 with no change.',
    solutions: [
      {
        title: 'Way 1: Find the fraction equal to 1',
        steps: [
          'A fraction with the same top and bottom equals 1, and 6/6 = 1.',
          'Multiplying by 1 does not change a number.',
          'So 8 × 6/6 = 8 exactly.',
        ],
      },
      {
        title: 'Way 2: Scaling check on every choice',
        steps: [
          '2/3 and 1/8 are less than 1, so those products shrink below 8.',
          '5/4 is more than 1, so that product grows above 8.',
          'Only 6/6 = 1 leaves 8 unchanged, so 8 × 6/6 is the answer.',
        ],
      },
    ],
  },
  {
    id: 'nf-65', domain: '5.NF', standard: '5.NF.1', tier: 3, type: 'multiple-choice',
    prompt: 'What number makes this true? 1/2 + ? = 9/10',
    choices: ['2/5', '4/5', '7/10', '1/5'], answer: '2/5',
    hints: ['Work backwards: subtract 1/2 from 9/10.', '1/2 = 5/10, so the missing piece is 9/10 − 5/10.'],
    explanation: '9/10 − 5/10 = 4/10 = 2/5.',
    solutions: [
      {
        title: 'Way 1: Work backwards with subtraction',
        steps: [
          'The missing addend is 9/10 − 1/2.',
          'Rename: 1/2 = 5/10, so 9/10 − 5/10 = 4/10.',
          '4/10 simplifies to 2/5, so the missing number is 2/5.',
        ],
      },
      {
        title: 'Way 2: Test the choices',
        steps: [
          'Try 2/5: 1/2 + 2/5 = 5/10 + 4/10 = 9/10. It works.',
          'A quick check of 4/5 gives 5/10 + 8/10 = 13/10, too big.',
          'So the answer is 2/5.',
        ],
      },
    ],
  },
  {
    id: 'nf-66', domain: '5.NF', standard: '5.NF.3', tier: 3, type: 'numeric',
    prompt: 'A coach cuts a 9-foot rope into 4 equal jump ropes. How long is each jump rope, in feet? (mixed number like 2 1/4)',
    answer: '2 1/4', acceptable: ['9/4', '2.25'],
    hints: ['A fraction is a division: 9 ÷ 4 = 9/4.', '4 goes into 9 twice with 1 left over.'],
    explanation: '9 ÷ 4 = 9/4 = 2 1/4 feet each.',
    solutions: [
      {
        title: 'Way 1: Fraction as division',
        steps: [
          'Cutting 9 feet into 4 equal pieces means 9 ÷ 4 = 9/4.',
          '9/4 means 9 fourths: 8 fourths make 2 wholes with 1 fourth left.',
          'Each jump rope is 2 1/4 feet long.',
        ],
      },
      {
        title: 'Way 2: Divide with a remainder',
        steps: [
          '4 goes into 9 two times, since 4 × 2 = 8.',
          'There is 1 foot left over, and 1 ÷ 4 = 1/4 foot for each piece.',
          'Each piece is 2 + 1/4 = 2 1/4 feet.',
        ],
      },
    ],
  },
  {
    id: 'nf-67', domain: '5.NF', standard: '5.NF.4', tier: 3, type: 'multiple-choice',
    prompt: 'What is 3/4 of 2/3?',
    diagram: { kind: 'fractionBar', parts: 12, shaded: 6 },
    choices: ['1/2', '6/7', '5/12', '3/8'], answer: '1/2',
    hints: ['"Of" means multiply: 3/4 × 2/3.', 'Multiply: 6/12. Now simplify.'],
    explanation: '3/4 × 2/3 = 6/12 = 1/2.',
    solutions: [
      {
        title: 'Way 1: Multiply then simplify',
        steps: [
          '3/4 of 2/3 means 3/4 × 2/3.',
          'Tops: 3 × 2 = 6. Bottoms: 4 × 3 = 12. That is 6/12.',
          '6/12 simplifies to 1/2.',
        ],
      },
      {
        title: 'Way 2: Cancel before multiplying',
        steps: [
          'In 3/4 × 2/3, the 3s cancel and the 2 with the 4 leaves 1/2.',
          'That gives 1/2 × 1/1 = 1/2.',
          'So 3/4 of 2/3 is 1/2.',
        ],
      },
      {
        title: 'Way 3: Grid picture',
        steps: [
          'Cut a bar into 12 equal parts; 2/3 of the bar is 8 parts.',
          'Take 3/4 of those 8 parts: 8 × 3/4 = 6 parts.',
          '6 of 12 parts is 6/12 = 1/2.',
        ],
      },
    ],
  },
  // ---- New problems: Tier 4 ----
  {
    id: 'nf-68', domain: '5.NF', standard: '5.NF.1', tier: 4, type: 'numeric',
    prompt: 'Compute 5 1/4 − 2 5/6. Give your answer as a mixed number (like 2 1/12).',
    answer: '2 5/12', acceptable: ['29/12'],
    hints: ['Use twelfths: 1/4 = 3/12 and 5/6 = 10/12.', '3/12 is less than 10/12, so regroup one whole into 12/12.'],
    explanation: '5 3/12 = 4 15/12; then 4 15/12 − 2 10/12 = 2 5/12.',
    solutions: [
      {
        title: 'Way 1: Regroup with common denominators',
        steps: [
          'Rename in twelfths: 5 1/4 = 5 3/12 and 2 5/6 = 2 10/12.',
          'Since 3/12 is less than 10/12, regroup: 5 3/12 = 4 15/12.',
          'Subtract: 4 15/12 − 2 10/12 = 2 5/12.',
        ],
      },
      {
        title: 'Way 2: Improper fractions',
        steps: [
          'Convert: 5 1/4 = 21/4 = 63/12 and 2 5/6 = 17/6 = 34/12.',
          'Subtract: 63/12 − 34/12 = 29/12.',
          '29/12 = 2 5/12.',
        ],
      },
      {
        title: 'Way 3: Count up from 2 5/6',
        steps: [
          'From 2 5/6, add 1/6 to reach 3. From 3, add 2 1/4 to reach 5 1/4.',
          'Total counted up: 1/6 + 2 1/4 = 2/12 + 2 3/12 = 2 5/12.',
          'So the difference is 2 5/12.',
        ],
      },
    ],
  },
  {
    id: 'nf-69', domain: '5.NF', standard: '5.NF.2', tier: 4, type: 'multiple-choice',
    prompt: 'A trail is 3 miles long. Nora hiked 3/4 mile before lunch and 1 1/3 miles after lunch. How much of the trail is LEFT?',
    choices: ['11/12 mile', '1 1/12 miles', '2 1/12 miles', '1 11/12 miles'], answer: '11/12 mile',
    hints: ['First add the two hikes: 3/4 + 1 1/3.', 'Then subtract that total from 3 miles.'],
    explanation: '3/4 + 1 1/3 = 2 1/12, and 3 − 2 1/12 = 11/12 mile left.',
    solutions: [
      {
        title: 'Way 1: Add, then subtract',
        steps: [
          'Add the hikes in twelfths: 3/4 = 9/12 and 1 1/3 = 1 4/12.',
          '9/12 + 1 4/12 = 1 13/12 = 2 1/12 miles hiked.',
          'Subtract from the trail: 3 − 2 1/12 = 2 12/12 − 2 1/12 = 11/12 mile left.',
        ],
      },
      {
        title: 'Way 2: Subtract one hike at a time',
        steps: [
          'Start with 3 miles and take away 3/4: 3 − 3/4 = 2 1/4.',
          'Now take away 1 1/3: 2 1/4 − 1 1/3 = 2 3/12 − 1 4/12.',
          'Regroup: 1 15/12 − 1 4/12 = 11/12 mile left.',
        ],
      },
      {
        title: 'Way 3: Estimate to pick wisely',
        steps: [
          'She hiked about 3/4 + 1 1/3, which is a bit more than 2 miles.',
          'So a bit less than 1 mile remains, ruling out the choices near or above 2.',
          'The exact amount left is 11/12 mile.',
        ],
      },
    ],
  },
  {
    id: 'nf-70', domain: '5.NF', standard: '5.NF.6', tier: 4, type: 'numeric',
    prompt: 'A smoothie recipe uses 1 3/4 cups of berries per batch. How many cups are needed for 3 1/2 batches? (mixed number like 6 1/8)',
    answer: '6 1/8', acceptable: ['49/8', '6.125'],
    hints: ['Convert both to improper fractions: 7/4 and 7/2.', 'Multiply: (7 × 7)/(4 × 2).'],
    explanation: '7/4 × 7/2 = 49/8 = 6 1/8 cups of berries.',
    solutions: [
      {
        title: 'Way 1: Improper fractions',
        steps: [
          'Convert: 1 3/4 = 7/4 and 3 1/2 = 7/2.',
          'Multiply: (7 × 7)/(4 × 2) = 49/8.',
          '49/8 = 6 1/8 cups of berries.',
        ],
      },
      {
        title: 'Way 2: Break apart the batches',
        steps: [
          '3 whole batches: 3 × 1 3/4 = 5 1/4 cups.',
          'Half a batch: half of 1 3/4 = 7/8 cup.',
          'Add: 5 1/4 + 7/8 = 5 2/8 + 7/8 = 5 9/8 = 6 1/8 cups.',
        ],
      },
    ],
  },
  {
    id: 'nf-71', domain: '5.NF', standard: '5.NF.7', tier: 4, type: 'multiple-choice',
    prompt: 'Coach Lee has 5 quarts of water and fills 1/2-quart bottles. He needs 12 full bottles for the team. Which is TRUE?',
    choices: [
      'Yes, he can fill exactly 12 bottles',
      'No, he can fill only 10 bottles',
      'No, he can fill only 8 bottles',
      'Yes, he can fill 12 with 2 bottles to spare',
    ],
    answer: 'No, he can fill only 10 bottles',
    hints: ['First find 5 ÷ 1/2.', 'Each quart fills 2 bottles, so compare 5 × 2 with 12.'],
    explanation: '5 ÷ 1/2 = 10 bottles, which is fewer than the 12 he needs.',
    solutions: [
      {
        title: 'Way 1: How many fit?',
        steps: [
          'Ask: how many 1/2-quart bottles fit in 5 quarts?',
          'Each quart fills 2 bottles, so 5 quarts fill 5 × 2 = 10 bottles.',
          '10 is fewer than the 12 needed, so he can fill only 10 bottles.',
        ],
      },
      {
        title: 'Way 2: Work backwards from 12 bottles',
        steps: [
          '12 bottles at 1/2 quart each need 12 × 1/2 = 6 quarts.',
          'Coach Lee has only 5 quarts, which is 1 quart short.',
          'So he cannot fill 12; with 5 quarts he fills only 10 bottles.',
        ],
      },
    ],
  },
  {
    id: 'nf-72', domain: '5.NF', standard: '5.NF.5', tier: 4, type: 'constructed',
    prompt: 'Without multiplying, explain how 3/4 × 5/6 compares to 5/6. Is the product bigger, smaller, or equal?',
    answer: 'smaller', acceptable: ['less', 'less than 5/6', 'shrinks', '3/4 is less than 1', 'scales down'],
    hints: ['Compare the factor 3/4 to 1.', 'What happens when you take only PART of 5/6?'],
    explanation: 'Multiplying by 3/4, a number less than 1, scales 5/6 down, so the product is smaller than 5/6.',
    solutions: [
      {
        title: 'Way 1: Scaling reasoning',
        steps: [
          'The factor 3/4 is less than 1.',
          'Multiplying any number by a factor less than 1 shrinks it.',
          'So 3/4 × 5/6 is smaller than 5/6, with no computing needed.',
        ],
      },
      {
        title: 'Way 2: Taking part of an amount',
        steps: [
          '3/4 × 5/6 means taking only 3/4 OF the amount 5/6.',
          'Taking part of something always leaves less than the whole amount.',
          'So the product must be smaller than 5/6.',
        ],
      },
      {
        title: 'Way 3: Verify by computing',
        steps: [
          '3/4 × 5/6 = 15/24 = 5/8.',
          'Compare with a common denominator: 5/8 = 15/24 and 5/6 = 20/24.',
          '15/24 is less than 20/24, so the product is indeed smaller than 5/6.',
        ],
      },
    ],
  },
  {
    id: 'nf-73', domain: '5.NF', standard: '5.NF.2', tier: 4, type: 'numeric',
    prompt: 'Mia had 2 1/2 yards of fabric. She used 7/8 yard for a pillow and 3/4 yard for a bag. How many yards are left? (like 7/8)',
    answer: '7/8', acceptable: ['0.875'],
    hints: ['Rename everything in eighths: 2 1/2 = 20/8.', 'Add what she used first: 7/8 + 6/8.'],
    explanation: '20/8 − 7/8 − 6/8 = 7/8 yard left.',
    solutions: [
      {
        title: 'Way 1: Rename everything in eighths',
        steps: [
          'Convert: 2 1/2 = 5/2 = 20/8 and 3/4 = 6/8.',
          'Add the used fabric: 7/8 + 6/8 = 13/8.',
          'Subtract: 20/8 − 13/8 = 7/8 yard left.',
        ],
      },
      {
        title: 'Way 2: Subtract one project at a time',
        steps: [
          'Start with 2 1/2 and remove the pillow: 2 4/8 − 7/8 = 1 12/8 − 7/8 = 1 5/8.',
          'Remove the bag: 1 5/8 − 6/8 = 13/8 − 6/8 = 7/8.',
          'So 7/8 yard of fabric is left.',
        ],
      },
      {
        title: 'Way 3: Estimate to check',
        steps: [
          'She used about 7/8 + 3/4, which is a little more than 1 1/2 yards.',
          '2 1/2 minus about 1 5/8 leaves a bit less than 1 yard.',
          'The exact answer, 7/8 yard, fits that estimate.',
        ],
      },
    ],
  },
  {
    id: 'nf-74', domain: '5.NF', standard: '5.NF.4', tier: 4, type: 'multiple-choice',
    prompt: 'A poster is 1 1/2 feet wide and 2/3 foot tall. What is its area?',
    choices: ['1 square foot', '3/4 square foot', '1 1/2 square feet', '2 1/6 square feet'], answer: '1 square foot',
    hints: ['Area = width × height = 1 1/2 × 2/3.', 'Convert 1 1/2 to 3/2 and multiply.'],
    explanation: '3/2 × 2/3 = 6/6 = 1 square foot.',
    solutions: [
      {
        title: 'Way 1: Improper fractions',
        steps: [
          'Convert: 1 1/2 = 3/2.',
          'Multiply: 3/2 × 2/3 = 6/6.',
          '6/6 = 1, so the area is 1 square foot.',
        ],
      },
      {
        title: 'Way 2: Cancel before multiplying',
        steps: [
          'In 3/2 × 2/3, the 2s cancel and the 3s cancel.',
          'That leaves 1 × 1 = 1.',
          'The area is exactly 1 square foot.',
        ],
      },
      {
        title: 'Way 3: Break apart the width',
        steps: [
          'Area of the 1-foot part: 1 × 2/3 = 2/3 square foot.',
          'Area of the 1/2-foot part: 1/2 × 2/3 = 1/3 square foot.',
          'Add: 2/3 + 1/3 = 1 square foot.',
        ],
      },
    ],
  },
  {
    id: 'nf-75', domain: '5.NF', standard: '5.NF.3', tier: 4, type: 'multiple-choice',
    prompt: 'Which statement about the fraction 11/4 is TRUE?',
    choices: [
      'It equals 11 divided by 4, which is 2 3/4',
      'It equals 4 divided by 11',
      'It is less than 2',
      'It equals 2 1/4',
    ],
    answer: 'It equals 11 divided by 4, which is 2 3/4',
    hints: ['A fraction means top ÷ bottom.', 'How many whole 4s are in 11, and what is left over?'],
    explanation: '11/4 = 11 ÷ 4 = 2 remainder 3, which is 2 3/4.',
    solutions: [
      {
        title: 'Way 1: Fraction as division',
        steps: [
          'A fraction means top divided by bottom, so 11/4 = 11 ÷ 4.',
          '4 goes into 11 two times with 3 left over, and 3 ÷ 4 = 3/4.',
          'So 11/4 = 2 3/4, making the first statement true.',
        ],
      },
      {
        title: 'Way 2: Rule out the false statements',
        steps: [
          '4 divided by 11 is 4/11, a number less than 1, so that is wrong.',
          '11/4 is 11 fourths and 8 fourths make 2, so 11/4 is MORE than 2.',
          '2 1/4 = 9/4, not 11/4. Only the 2 3/4 statement is true.',
        ],
      },
    ],
  },
  {
    id: 'nf-76', domain: '5.NF', standard: '5.NF.7', tier: 4, type: 'numeric',
    prompt: 'A 1/2-gallon jug of paint is shared equally by 4 art tables. Each table pours its share equally into 2 jars. What fraction of a gallon is in each jar? (like 1/12)',
    answer: '1/16', acceptable: [],
    hints: ['First find each table: 1/2 ÷ 4.', 'Then split that share again: divide by 2.'],
    explanation: '1/2 ÷ 4 = 1/8 per table, and 1/8 ÷ 2 = 1/16 gallon per jar.',
    solutions: [
      {
        title: 'Way 1: Divide twice',
        steps: [
          'Each table gets 1/2 ÷ 4 = 1/2 × 1/4 = 1/8 gallon.',
          'Each jar gets 1/8 ÷ 2 = 1/8 × 1/2 = 1/16 gallon.',
          'So each jar holds 1/16 of a gallon.',
        ],
      },
      {
        title: 'Way 2: Count all the jars',
        steps: [
          'There are 4 tables × 2 jars = 8 jars in all.',
          'So the half gallon is split 8 ways: 1/2 ÷ 8 = 1/2 × 1/8.',
          'That is 1/16 gallon in each jar.',
        ],
      },
    ],
  },
  {
    id: 'nf-77', domain: '5.NF', standard: '5.NF.1', tier: 4, type: 'multiple-choice',
    prompt: 'Leo computed 3 1/4 − 1 3/4 and got 2 1/2. The correct answer is 1 1/2. What mistake did Leo make?',
    choices: [
      'He subtracted 1/4 from 3/4 instead of regrouping',
      'He used the wrong common denominator',
      'He added instead of subtracting',
      'He made no mistake; 2 1/2 is correct',
    ],
    answer: 'He subtracted 1/4 from 3/4 instead of regrouping',
    hints: ['Look at the fraction parts: can you take 3/4 away from 1/4?', 'Leo flipped them and did 3/4 − 1/4 instead.'],
    explanation: 'Leo did 3/4 − 1/4 backwards instead of regrouping 3 1/4 as 2 5/4; the true answer is 1 1/2.',
    solutions: [
      {
        title: 'Way 1: Recreate the error',
        steps: [
          'Leo did 3 − 1 = 2 and then 3/4 − 1/4 = 1/2, getting 2 1/2.',
          'But the problem needs 1/4 − 3/4, which you cannot do without regrouping.',
          'Correct way: 3 1/4 = 2 5/4, then 2 5/4 − 1 3/4 = 1 2/4 = 1 1/2.',
          'So his mistake was subtracting 1/4 from 3/4 instead of regrouping.',
        ],
      },
      {
        title: 'Way 2: Improper fraction check',
        steps: [
          'Convert: 3 1/4 = 13/4 and 1 3/4 = 7/4.',
          '13/4 − 7/4 = 6/4 = 1 1/2, so 2 1/2 is too big by exactly 1.',
          'That extra 1 comes from flipping the fraction subtraction instead of regrouping.',
        ],
      },
    ],
  },
  {
    id: 'nf-78', domain: '5.NF', standard: '5.NF.6', tier: 4, type: 'numeric',
    prompt: 'A museum ticket costs $12. Students pay only 2/3 of the full price. How many dollars do 4 student tickets cost in all?',
    answer: '32', acceptable: ['$32', '32 dollars'],
    hints: ['First find one student ticket: 2/3 × 12.', 'Then multiply that price by 4 students.'],
    explanation: 'One student ticket is 2/3 × 12 = $8, so 4 tickets cost 4 × 8 = $32.',
    solutions: [
      {
        title: 'Way 1: Price one ticket first',
        steps: [
          'One student ticket: 2/3 × 12 = 24/3 = $8.',
          'Four tickets: 4 × 8 = $32.',
          'The total cost is $32.',
        ],
      },
      {
        title: 'Way 2: Total full price first',
        steps: [
          'Four full-price tickets would cost 4 × 12 = $48.',
          'Students pay 2/3 of that: 2/3 × 48 = 96/3 = $32.',
          'So the 4 student tickets cost $32.',
        ],
      },
    ],
  },
  {
    id: 'nf-79', domain: '5.NF', standard: '5.NF.2', tier: 4, type: 'constructed',
    prompt: 'Without adding exactly, is 11/12 + 9/10 closer to 1 or closer to 2? Explain your reasoning.',
    answer: '2', acceptable: ['close to 2', 'almost 2', 'near 2', 'each is close to 1', 'about 2'],
    hints: ['Compare each fraction to the benchmark 1.', '11/12 is only 1/12 away from 1. How far is 9/10 from 1?'],
    explanation: 'Each addend is barely below 1, so the sum is just under 1 + 1 = 2, much closer to 2.',
    solutions: [
      {
        title: 'Way 1: Benchmark each addend to 1',
        steps: [
          '11/12 is only 1/12 short of 1, so it is almost 1.',
          '9/10 is only 1/10 short of 1, so it is almost 1 too.',
          'Almost 1 plus almost 1 is almost 2, so the sum is closer to 2.',
        ],
      },
      {
        title: 'Way 2: Measure the total shortfall',
        steps: [
          'Together the two fractions fall short of 2 by 1/12 + 1/10.',
          '1/12 + 1/10 = 5/60 + 6/60 = 11/60, which is far less than 1/2.',
          'Falling short of 2 by less than 1/2 means the sum is closer to 2.',
        ],
      },
    ],
  },
  {
    id: 'nf-80', domain: '5.NF', standard: '5.NF.7', tier: 4, type: 'numeric',
    prompt: 'A baker needs 2 1/2 cups of flour and only has a 1/8-cup scoop. How many scoops does the baker need?',
    answer: '20', acceptable: ['20 scoops'],
    hints: ['Ask: how many eighths are in 2 1/2 cups?', 'Each cup holds 8 scoops, and a half cup holds 4.'],
    explanation: '2 1/2 ÷ 1/8 = 5/2 × 8 = 20 scoops.',
    solutions: [
      {
        title: 'Way 1: Count scoops per cup',
        steps: [
          'Each whole cup takes 8 scoops of 1/8 cup.',
          '2 cups take 2 × 8 = 16 scoops, and the half cup takes 4 scoops.',
          '16 + 4 = 20 scoops in all.',
        ],
      },
      {
        title: 'Way 2: Multiply by the reciprocal',
        steps: [
          'The question is 2 1/2 ÷ 1/8, and 2 1/2 = 5/2.',
          'Dividing by 1/8 is multiplying by 8: 5/2 × 8 = 40/2.',
          '40/2 = 20, so the baker needs 20 scoops.',
        ],
      },
    ],
  },
];
