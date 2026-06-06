import Phaser from 'phaser';
import { Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import type { Domain } from '../math/types';
import { DOMAIN_INFO } from '../math/types';
import { getLessons, getTaskSet } from '../math/index';
import { ProblemPanel } from '../ui/ProblemPanel';
import { update, load, overallRit } from '../data/progress';
import { updateRit } from '../math/adaptive';
import { awardForAnswer, awardTaskComplete } from '../game/Rewards';

const MODAL_W = 640;
const MODAL_H = 540;
const PASS_RATIO = 0.6; // % correct needed to mark the task complete

// A station task: first a kid-friendly lesson, then an adaptive problem set.
export class TaskScene extends Phaser.Scene {
  private domain!: Domain;
  private set: ReturnType<typeof getTaskSet> = [];
  private idx = 0;
  private correct = 0;
  private panel?: ProblemPanel;
  private body!: Phaser.GameObjects.Container;
  private progressText!: Phaser.GameObjects.Text;

  constructor() {
    super('Task');
  }

  create(data: { domain: Domain }) {
    this.domain = data.domain;
    this.idx = 0;
    this.correct = 0;

    // dim the ship
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.55);
    // modal
    const modal = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, MODAL_W, MODAL_H, Theme.bgPanel)
      .setStrokeStyle(3, Theme.accent);
    modal.setOrigin(0.5);

    const info = DOMAIN_INFO[this.domain];
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - MODAL_H / 2 + 24, `${info.short} — ${info.label}`, {
      fontFamily: 'Trebuchet MS', fontSize: '22px', color: Theme.css.accent, fontStyle: 'bold',
    }).setOrigin(0.5);

    this.progressText = this.add.text(GAME_WIDTH / 2 + MODAL_W / 2 - 16, GAME_HEIGHT / 2 - MODAL_H / 2 + 24, '', {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim,
    }).setOrigin(1, 0.5);

    // close/leave button
    const close = this.add.text(GAME_WIDTH / 2 - MODAL_W / 2 + 16, GAME_HEIGHT / 2 - MODAL_H / 2 + 24, '✕', {
      fontFamily: 'Trebuchet MS', fontSize: '20px', color: Theme.css.bad,
    }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
    close.on('pointerdown', () => this.leave());

    this.body = this.add.container(0, 0);
    this.showLesson();
  }

  // ---- Lesson phase: flip through teaching cards before practicing ----
  private showLesson() {
    this.body.removeAll(true);
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
        y += tip.height + 10;
      }

      // nav: card x/n + next-or-start
      const by = GAME_HEIGHT / 2 + MODAL_H / 2 - 40;
      this.body.add(this.add.text(GAME_WIDTH / 2, by - 24, `Lesson ${cardIdx + 1} of ${lessons.length}`, {
        fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
      }).setOrigin(0.5));

      if (cardIdx < lessons.length - 1) {
        this.body.add(this.bigButton(GAME_WIDTH / 2 + 90, by, 'Next lesson ▶', Theme.accentDim, () => { cardIdx++; render(); }));
      }
      this.body.add(this.bigButton(GAME_WIDTH / 2 - 90, by, '▶ Start practice', Theme.good, () => this.startPractice()));
    };
    render();
  }

  // ---- Practice phase ----
  private startPractice() {
    this.set = getTaskSet(this.domain, load().stats[this.domain].rit, 4);
    this.idx = 0;
    this.correct = 0;
    this.showProblem();
  }

  private showProblem() {
    this.body.removeAll(true);
    if (this.panel) { this.panel.destroy(); this.panel = undefined; }

    if (this.idx >= this.set.length) { this.finishSet(); return; }

    this.progressText.setText(`Q ${this.idx + 1}/${this.set.length}`);
    const problem = this.set[this.idx];
    this.panel = new ProblemPanel(this, GAME_WIDTH / 2, GAME_HEIGHT / 2 - MODAL_H / 2 + 70, {
      problem,
      width: MODAL_W,
      onAnswered: (correct) => this.onAnswered(correct),
    });
  }

  private onAnswered(correct: boolean) {
    const problem = this.set[this.idx];
    if (correct) this.correct++;
    update((d) => {
      const st = d.stats[this.domain];
      st.attempts++;
      if (correct) st.correct++;
      st.rit = updateRit(st.rit, problem.tier, correct);
      if (st.rit > d.bestRit) d.bestRit = st.rit;
    });
    awardForAnswer(correct);
    this.idx++;
    this.showProblem();
  }

  private finishSet() {
    this.body.removeAll(true);
    const ratio = this.correct / this.set.length;
    const passed = ratio >= PASS_RATIO;
    if (passed) {
      update((d) => { d.stats[this.domain].completed = true; });
      awardTaskComplete();
    }

    const cy = GAME_HEIGHT / 2;
    this.body.add(this.add.text(GAME_WIDTH / 2, cy - 80, passed ? '✅ Task Complete!' : '🔁 Keep practicing!', {
      fontFamily: 'Trebuchet MS', fontSize: '28px', color: passed ? Theme.css.good : Theme.css.warn, fontStyle: 'bold',
    }).setOrigin(0.5));

    this.body.add(this.add.text(GAME_WIDTH / 2, cy - 30, `You got ${this.correct} of ${this.set.length} correct.`, {
      fontFamily: 'Trebuchet MS', fontSize: '18px', color: Theme.css.text,
    }).setOrigin(0.5));

    this.body.add(this.add.text(GAME_WIDTH / 2, cy + 4, `Your RIT is now ${overallRit()} (goal 235+).`, {
      fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.accent,
    }).setOrigin(0.5));

    if (!passed) {
      this.body.add(this.add.text(GAME_WIDTH / 2, cy + 34, `Get ${Math.ceil(this.set.length * PASS_RATIO)}+ right to finish this task.`, {
        fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim,
      }).setOrigin(0.5));
      this.body.add(this.bigButton(GAME_WIDTH / 2 - 90, cy + 80, '🔁 Try again', Theme.warn, () => this.startPractice()));
      this.body.add(this.bigButton(GAME_WIDTH / 2 + 90, cy + 80, 'Leave', Theme.accentDim, () => this.leave()));
    } else {
      this.body.add(this.bigButton(GAME_WIDTH / 2, cy + 70, '▶ Back to ship', Theme.good, () => this.leave()));
    }
  }

  private leave() {
    if (this.panel) this.panel.destroy();
    this.scene.stop();
    this.scene.resume('Ship');
  }

  private bigButton(x: number, y: number, label: string, color: number, onClick: () => void): Phaser.GameObjects.Container {
    const w = Math.max(150, label.length * 11 + 24);
    const bg = this.add.rectangle(0, 0, w, 40, color).setStrokeStyle(2, Theme.text, 0.3).setInteractive({ useHandCursor: true });
    const txt = this.add.text(0, 0, label, { fontFamily: 'Trebuchet MS', fontSize: '16px', color: '#06121f', fontStyle: 'bold' }).setOrigin(0.5);
    bg.on('pointerover', () => { bg.setScale(1.04); });
    bg.on('pointerout', () => { bg.setScale(1); });
    bg.on('pointerdown', onClick);
    return this.add.container(x, y, [bg, txt]);
  }
}
