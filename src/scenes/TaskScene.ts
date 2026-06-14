import Phaser from 'phaser';
import { Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import type { Domain, Problem } from '../math/types';
import { DOMAIN_INFO } from '../math/types';
import { getLessons, pickProblem, getProblemById } from '../math/index';
import { ProblemPanel } from '../ui/ProblemPanel';
import { update, load, overallRit, recordMiss, clearMiss } from '../data/progress';
import { updateRit } from '../math/adaptive';
import { awardForAnswer, awardTaskComplete } from '../game/Rewards';
import { sfx } from '../ui/sfx';

const MODAL_W = 640;
const MODAL_H = 540;
const SET_SIZE = 4;
const PASS_RATIO = 0.6; // % correct needed to mark the task complete

interface TaskData {
  domain?: Domain;     // station mode: which domain to practice
  review?: boolean;    // review mode: replay missed problems from any domain
}

// A station task: first a kid-friendly lesson, then a LIVE-adaptive problem
// set — each next question is picked from the kid's updated RIT, like MAP.
// Also doubles as the "review missed problems" mode (entered from Report).
export class TaskScene extends Phaser.Scene {
  private domain: Domain = '5.NF';
  private review = false;
  private reviewQueue: Problem[] = [];
  private used = new Set<string>();
  private lastCorrect: boolean | null = null;
  private idx = 0;
  private total = SET_SIZE;
  private correct = 0;
  private panel?: ProblemPanel;
  private body!: Phaser.GameObjects.Container;
  private progressText!: Phaser.GameObjects.Text;

  constructor() {
    super('Task');
  }

  create(data: TaskData) {
    this.review = !!data.review;
    this.domain = data.domain ?? '5.NF';
    this.idx = 0;
    this.correct = 0;
    this.used = new Set();
    this.lastCorrect = null;

    if (this.review) {
      this.reviewQueue = load().missed
        .map((id) => getProblemById(id))
        .filter((p): p is Problem => !!p)
        .slice(0, 6);
      this.total = this.reviewQueue.length;
    } else {
      this.total = SET_SIZE;
    }

    // dim the ship (or stand alone when entered from Report)
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.55);
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, MODAL_W, MODAL_H, Theme.bgPanel)
      .setStrokeStyle(3, this.review ? Theme.warn : Theme.accent);

    const title = this.review
      ? '🔁 Review Missed Problems'
      : `${DOMAIN_INFO[this.domain].short} — ${DOMAIN_INFO[this.domain].label}`;
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - MODAL_H / 2 + 24, title, {
      fontFamily: 'Trebuchet MS', fontSize: '22px', color: this.review ? Theme.css.warn : Theme.css.accent, fontStyle: 'bold',
    }).setOrigin(0.5);

    this.progressText = this.add.text(GAME_WIDTH / 2 + MODAL_W / 2 - 16, GAME_HEIGHT / 2 - MODAL_H / 2 + 24, '', {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim,
    }).setOrigin(1, 0.5);

    // close/leave button
    const close = this.add.text(GAME_WIDTH / 2 - MODAL_W / 2 + 16, GAME_HEIGHT / 2 - MODAL_H / 2 + 24, '✕', {
      fontFamily: 'Trebuchet MS', fontSize: '20px', color: Theme.css.bad,
    }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
    close.on('pointerdown', () => { sfx.click(); this.leave(); });

    this.body = this.add.container(0, 0);

    if (this.review) {
      if (this.total === 0) { this.finishSet(); return; }
      this.showProblem();
    } else {
      this.showLesson();
    }
  }

  // ---- Lesson phase: flip through teaching cards before practicing ----
  private showLesson() {
    const lessons = getLessons(this.domain);
    const top = GAME_HEIGHT / 2 - MODAL_H / 2;
    const left = GAME_WIDTH / 2 - MODAL_W / 2;
    let cardIdx = 0;

    const render = () => {
      this.body.removeAll(true);
      const lesson = lessons[cardIdx];
      let y = top + 70;

      this.body.add(this.add.text(GAME_WIDTH / 2, y, '📚 Learn it first', {
        fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.warn,
      }).setOrigin(0.5));
      y += 30;

      this.body.add(this.add.text(GAME_WIDTH / 2, y, lesson.title, {
        fontFamily: 'Trebuchet MS', fontSize: '20px', color: Theme.css.text, fontStyle: 'bold',
        align: 'center', wordWrap: { width: MODAL_W - 60 },
      }).setOrigin(0.5, 0));
      y += 56;

      lesson.steps.forEach((s, i) => {
        const t = this.add.text(left + 40, y, `${i + 1}.  ${s}`, {
          fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.text, wordWrap: { width: MODAL_W - 80 },
        });
        this.body.add(t);
        y += t.height + 8;
      });

      y += 6;
      const ex = this.add.text(GAME_WIDTH / 2, y, `Example:  ${lesson.example}`, {
        fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.good, fontStyle: 'italic',
        align: 'center', wordWrap: { width: MODAL_W - 60 },
      }).setOrigin(0.5, 0);
      this.body.add(ex);
      y += ex.height + 10;

      if (lesson.tip) {
        const tip = this.add.text(GAME_WIDTH / 2, y, `💡 ${lesson.tip}`, {
          fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.accent,
          align: 'center', wordWrap: { width: MODAL_W - 60 },
        }).setOrigin(0.5, 0);
        this.body.add(tip);
      }

      // nav: card x/n, prev/next, start
      const by = GAME_HEIGHT / 2 + MODAL_H / 2 - 40;
      this.body.add(this.add.text(GAME_WIDTH / 2, by - 26, `Lesson ${cardIdx + 1} of ${lessons.length}`, {
        fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
      }).setOrigin(0.5));

      if (cardIdx > 0) {
        this.body.add(this.bigButton(GAME_WIDTH / 2 - 230, by, '◀ Back', Theme.bgPanelLight, () => { sfx.click(); cardIdx--; render(); }, Theme.css.text));
      }
      if (cardIdx < lessons.length - 1) {
        this.body.add(this.bigButton(GAME_WIDTH / 2 + 160, by, 'Next lesson ▶', Theme.accentDim, () => { sfx.click(); cardIdx++; render(); }));
      }
      this.body.add(this.bigButton(GAME_WIDTH / 2 - 30, by, '▶ Start practice', Theme.good, () => { sfx.click(); this.startPractice(); }));
    };
    render();
  }

  // ---- Practice phase (live adaptive) ----
  private startPractice() {
    this.idx = 0;
    this.correct = 0;
    this.used = new Set();
    this.lastCorrect = null;
    this.showProblem();
  }

  private nextProblem(): Problem {
    if (this.review) return this.reviewQueue[this.idx];
    const rit = load().stats[this.domain].rit;
    const p = pickProblem(this.domain, rit, this.used, this.lastCorrect);
    this.used.add(p.id);
    return p;
  }

  private showProblem() {
    this.body.removeAll(true);
    if (this.panel) { this.panel.destroy(); this.panel = undefined; }

    if (this.idx >= this.total) { this.finishSet(); return; }

    this.progressText.setText(`Q ${this.idx + 1}/${this.total}`);
    const problem = this.nextProblem();
    this.panel = new ProblemPanel(this, GAME_WIDTH / 2, GAME_HEIGHT / 2 - MODAL_H / 2 + 70, {
      problem,
      width: MODAL_W,
      onAnswered: (correct) => this.onAnswered(problem, correct),
    });
  }

  private onAnswered(problem: Problem, correct: boolean) {
    if (correct) this.correct++;
    this.lastCorrect = correct;
    update((d) => {
      const st = d.stats[problem.domain];
      st.attempts++;
      if (correct) st.correct++;
      st.rit = updateRit(st.rit, problem.tier, correct);
      if (st.rit > d.bestRit) d.bestRit = st.rit;
    });
    if (correct) {
      if (this.review) clearMiss(problem.id);
    } else {
      recordMiss(problem.id);
    }
    const coins = awardForAnswer(correct);
    if (coins > 0) sfx.coin();
    this.idx++;
    this.showProblem();
  }

  private finishSet() {
    this.body.removeAll(true);
    if (this.panel) { this.panel.destroy(); this.panel = undefined; }
    const cy = GAME_HEIGHT / 2;

    if (this.review) {
      const remaining = load().missed.length;
      sfx.taskDone();
      this.body.add(this.add.text(GAME_WIDTH / 2, cy - 60, this.total === 0 ? '🎉 Nothing to review!' : '🧠 Review complete!', {
        fontFamily: 'Trebuchet MS', fontSize: '28px', color: Theme.css.good, fontStyle: 'bold',
      }).setOrigin(0.5));
      this.body.add(this.add.text(GAME_WIDTH / 2, cy - 14, this.total === 0
        ? 'You have no missed problems saved. Go crush some tasks!'
        : `You fixed ${this.correct} of ${this.total}. ${remaining ? `${remaining} still saved for next time.` : 'All caught up — amazing!'}`, {
        fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.text, align: 'center', wordWrap: { width: MODAL_W - 60 },
      }).setOrigin(0.5));
      this.body.add(this.bigButton(GAME_WIDTH / 2, cy + 50, '📋 Back to Report', Theme.accentDim, () => this.scene.start('Report')));
      return;
    }

    const ratio = this.correct / this.total;
    const passed = ratio >= PASS_RATIO;
    if (passed) {
      update((d) => { d.stats[this.domain].completed = true; });
      awardTaskComplete();
      sfx.taskDone();
    }

    this.body.add(this.add.text(GAME_WIDTH / 2, cy - 80, passed ? '✅ Task Complete!' : '🔁 Keep practicing!', {
      fontFamily: 'Trebuchet MS', fontSize: '28px', color: passed ? Theme.css.good : Theme.css.warn, fontStyle: 'bold',
    }).setOrigin(0.5));

    this.body.add(this.add.text(GAME_WIDTH / 2, cy - 30, `You got ${this.correct} of ${this.total} correct.`, {
      fontFamily: 'Trebuchet MS', fontSize: '18px', color: Theme.css.text,
    }).setOrigin(0.5));

    this.body.add(this.add.text(GAME_WIDTH / 2, cy + 4, `Your RIT is now ${overallRit()} (goal 235+).`, {
      fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.accent,
    }).setOrigin(0.5));

    if (!passed) {
      this.body.add(this.add.text(GAME_WIDTH / 2, cy + 34, `Get ${Math.ceil(this.total * PASS_RATIO)}+ right to finish this task.`, {
        fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim,
      }).setOrigin(0.5));
      this.body.add(this.bigButton(GAME_WIDTH / 2 - 90, cy + 80, '🔁 Try again', Theme.warn, () => { sfx.click(); this.startPractice(); }));
      this.body.add(this.bigButton(GAME_WIDTH / 2 + 90, cy + 80, 'Leave', Theme.accentDim, () => this.leave()));
    } else {
      this.body.add(this.bigButton(GAME_WIDTH / 2, cy + 70, '▶ Back to ship', Theme.good, () => this.leave()));
    }
  }

  private leave() {
    if (this.panel) this.panel.destroy();
    if (this.review) {
      this.scene.start('Report');
      return;
    }
    this.scene.stop();
    this.scene.resume('Ship');
  }

  private bigButton(x: number, y: number, label: string, color: number, onClick: () => void, textColor = '#06121f'): Phaser.GameObjects.Container {
    const w = Math.max(130, label.length * 10.5 + 24);
    const bg = this.add.rectangle(0, 0, w, 40, color).setStrokeStyle(2, Theme.text, 0.3).setInteractive({ useHandCursor: true });
    const txt = this.add.text(0, 0, label, { fontFamily: 'Trebuchet MS', fontSize: '16px', color: textColor, fontStyle: 'bold' }).setOrigin(0.5);
    bg.on('pointerover', () => { bg.setScale(1.04); });
    bg.on('pointerout', () => { bg.setScale(1); });
    bg.on('pointerdown', onClick);
    return this.add.container(x, y, [bg, txt]);
  }
}
