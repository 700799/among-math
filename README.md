# Among Math 🚀

An **Among Us–style** top-down spaceship game where the **math problems ARE the tasks**.
Built to help a 5th grader master the California math standards and ace the **NWEA MAP Growth**
test to qualify for **SRVUSD Course 3** (the accelerated path toward Algebra 1).

> Walk the ship → step on a glowing console → **learn the skill, then solve problems** to
> complete the task → survive timed "reactor sabotage" fluency drills → finish every task to
> win and unlock rewards. Difficulty adapts like the real MAP test, and a **RIT meter** tracks
> progress toward the **235+ goal (~90th percentile)** needed for Course 3.

## Why this helps qualify for Course 3

- **Learn-it-first tutorials.** Every station opens with kid-friendly lesson cards (steps,
  a worked example, and a MAP tip) *before* practice — so kids learn, not just guess.
- **Full 5th-grade coverage** across all CA domains, plus a **Course 3 bridge**:
  - `5.OA` Expressions & patterns · `5.NBT` Place value & decimals · `5.NF` Fractions
  - `5.MD` Measurement & volume · `5.G` Geometry & coordinates
  - `bridge` Ratios/rates/%, integers, and simple equations (shows acceleration readiness)
- **Live-adaptive difficulty (RIT-like).** Each NEXT question is chosen from the kid's
  updated RIT after every answer — exactly how NWEA MAP works.
- **🧪 MAP Practice Simulation.** A 15-question mixed adaptive test (weighted toward
  fractions/decimals like the real thing): no hints, no mid-test answer reveals, then a full
  results screen — estimated RIT, percentile, per-topic breakdown, and test history.
- **Missed-problem review.** Every wrong answer is saved; review them from the Mission
  Report (or right after a test) — solving one correctly clears it. Targeted re-practice
  is the fastest way to grow a RIT score.
- **400 authored problems, each solved 2–3 ways.** After answering in practice, the
  panel switches to a **Way 1 | Way 2 | Way 3** view with complete numbered steps for
  every method (algorithm vs. visual model vs. estimation vs. work-backward) — kids
  learn flexible thinking, not just one trick.
- **Timed fluency drills** (sabotages) simulate MAP pacing — forgiving, never a hard game-over.
  Drills mix whole-number, fraction, decimal, and powers-of-10 quick facts.
- **Rewards you can SEE.** Earned hats float on the crewmate's head, pets follow it around
  the ship, and the gold badge stars the name. Coins + streak bonuses + a cosmetics shop.
- **Sound & juice.** Synth sound effects (correct/wrong/coin/fanfare/alarm — zero audio
  assets) with a mute toggle, camera shake on sabotage, streak flames in the HUD.

## Tech

- **Phaser 3** + **TypeScript** + **Vite** — a tiny static client, **no backend**.
- Single-player with wandering **AI bot crewmates** for Among Us atmosphere.
- All sprites are **generated at runtime** (no image assets to license or load).
- Progress saves to `localStorage` (per-domain mastery, RIT, coins, unlocks).

## Run it

```bash
npm install
npm run dev      # play locally at http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Deploy (Vercel)

The client is fully static. `vercel.json` is preconfigured:
build command `npm run build`, output `dist`. Connect the repo to Vercel and deploy —
no server required.

## How to add more problems

Everything is data-driven — **no game code changes needed**:

- Add problems to `src/math/bank/<domain>.ts` (`problems: Problem[]`).
- Add teaching cards to the same file (`lessons: Lesson[]`).
- Tag each problem with a `tier` (1–4) so the adaptive engine places it by difficulty.
- Give every problem 2–3 `solutions` (different strategies, full worked steps) — the
  type system requires it, and `npm run validate` checks the whole bank (unique ids,
  answers match choices, solution structure, tier coverage).

Current bank: **400 problems** — 5.NF 80 · 5.NBT 68 · 5.MD 66 · bridge 66 · 5.OA 60 · 5.G 60.

Key files:

| Area | File |
| --- | --- |
| Problem & lesson model | `src/math/types.ts` |
| Problem banks | `src/math/bank/*.ts` |
| Adaptive engine + RIT | `src/math/adaptive.ts` |
| Fluency generators | `src/math/generators.ts` |
| Query API + answer checking | `src/math/index.ts` |
| Progress persistence | `src/data/progress.ts` |
| Game scenes | `src/scenes/*.ts` |

## Controls

- **Move:** Arrow keys / WASD, or tap/click to walk.
- **Start a task:** stand on a glowing console and press **SPACE** (or tap it).
- **Answer:** click choices, use the on-screen keypad (or your keyboard) for numbers.
- **ESC:** return to the menu. Open the **Mission Report** to track RIT progress.
