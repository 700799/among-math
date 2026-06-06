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
- **Adaptive difficulty (RIT-like).** Correct answers push harder questions; misses ease off —
  mirroring NWEA MAP. A running RIT estimate per domain feeds the **Mission Report**.
- **Timed fluency drills** (sabotages) simulate MAP pacing — forgiving, never a hard game-over.
- **Rewards & streaks** keep it fun: earn coins, unlock cosmetics, celebrate at the win screen.

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
