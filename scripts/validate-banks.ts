// Bank content validator — run with: npm run validate
// Catches structural/content errors that 400 hand-authored problems invite.
import { ALL_DOMAINS, getProblems, getLessons, checkAnswer } from '../src/math/index';
import type { Domain } from '../src/math/types';

const MIN_COUNTS: Record<Domain, number> = {
  '5.NF': 78, '5.NBT': 64, '5.OA': 56, '5.MD': 62, '5.G': 56, 'bridge': 62,
};

let errors = 0;
function err(msg: string) {
  errors++;
  console.error(`  ❌ ${msg}`);
}

const ids = new Set<string>();
let grandTotal = 0;

for (const domain of ALL_DOMAINS) {
  const problems = getProblems(domain);
  grandTotal += problems.length;
  const tiers = [1, 2, 3, 4].map((t) => problems.filter((p) => p.tier === t).length);
  console.log(`${domain}: ${problems.length} problems (tiers ${tiers.join('/')}), ${getLessons(domain).length} lessons`);

  if (problems.length < MIN_COUNTS[domain]) {
    err(`${domain} has ${problems.length} problems; expected at least ${MIN_COUNTS[domain]}`);
  }
  tiers.forEach((n, i) => {
    if (n === 0) err(`${domain} has no tier-${i + 1} problems`);
  });

  for (const p of problems) {
    const tag = `${p.id}`;
    if (ids.has(p.id)) err(`duplicate id ${tag}`);
    ids.add(p.id);
    if (p.domain !== domain) err(`${tag}: domain mismatch (${p.domain} in ${domain} bank)`);
    if (![1, 2, 3, 4].includes(p.tier)) err(`${tag}: bad tier ${p.tier}`);
    if (!p.prompt.trim()) err(`${tag}: empty prompt`);
    if (!p.explanation.trim()) err(`${tag}: empty explanation`);
    if (!p.hints.length) err(`${tag}: no hints`);

    // 2-3 fully worked solutions, each with real steps
    if (!p.solutions || p.solutions.length < 2 || p.solutions.length > 3) {
      err(`${tag}: needs 2-3 solutions, has ${p.solutions?.length ?? 0}`);
    } else {
      p.solutions.forEach((s, i) => {
        if (!s.title.trim()) err(`${tag}: solution ${i + 1} has no title`);
        if (s.steps.length < 2) err(`${tag}: solution ${i + 1} has ${s.steps.length} step(s); needs >= 2`);
        if (s.steps.some((st) => !st.trim())) err(`${tag}: solution ${i + 1} has an empty step`);
      });
    }

    if (p.type === 'multiple-choice') {
      if (!p.choices || p.choices.length < 2) err(`${tag}: multiple-choice without choices`);
      else if (!p.choices.includes(String(p.answer))) err(`${tag}: answer "${p.answer}" not among choices`);
    }

    // The canonical answer must pass the game's own checker.
    if (p.type !== 'constructed' && !checkAnswer(p, String(p.answer))) {
      err(`${tag}: canonical answer fails checkAnswer`);
    }
    for (const alt of p.acceptable ?? []) {
      if (p.type !== 'constructed' && !checkAnswer(p, alt)) err(`${tag}: acceptable "${alt}" fails checkAnswer`);
    }
  }
}

console.log(`\nTotal authored problems: ${grandTotal}`);
if (errors) {
  console.error(`\n${errors} error(s) found.`);
  process.exit(1);
}
console.log('✅ All banks valid.');
