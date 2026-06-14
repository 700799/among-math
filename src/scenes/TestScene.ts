import Phaser from 'phaser';
import { Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import type { Domain, Problem } from '../math/types';
import { DOMAIN_INFO } from '../math/types';
import { buildTestPlan, pickProblem, ALL_DOMAINS } from '../math/index';
import { ProblemPanel } from '../ui/ProblemPanel';
import { update, load, recordMiss, recordTest } from '../data/progress';
import { updateRit, ritBadge, RIT_GOAL } from '../math/adaptive';
import { awardForAnswer } from '../game/Rewards';
import { sfx } from '../ui/sfx';

const PANEL_W = 660;

// MAP Growth simulation: 15 mixed questions across every domain, weighted
// toward fractions/decimals like the real test. Fully adaptive — each answer
// moves the live RIT, which picks the next question's difficulty. No hints,
// no mid-test answer reveals; missed problems are saved for review after.
export class TestScene extends Phaser.Scene {
  private plan: Domain[] = [];
  private idx = 0;
  private testRit = 200;
  private correct = 0;
  private perDomain = new Map<Domain, { correct: number; total: number }>();
  private used = new Set<string>();
  private lastCorrect: boolean | null = null;
  private missedNow: Problem[] = [];
  private panel?: ProblemPanel;
  private body!: Phaser.GameObjects.Container;
  private header!: Phaser.GameObjects.Text;
  private ritText!: Phaser.GameObjects.Text;
  private startTime = 0;

  constructor() {
    super('Test');
  }

  create() {
    this.plan = buildTestPlan();
    this.idx = 0;
    this.correct = 0;
    this.used = new Set();
    this.lastCorrect = null;
    this.missedNow = [];
    this.perDomain = new Map();
    const d = load();
    this.testRit = Math.max(195, Math.round(ALL_DOMAINS.reduce((a, dom) => a + d.stats[dom].rit, 0) / ALL_DOMAINS.length));
    this.startTime = Date.now();

    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, Theme.bg);
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, PANEL_W + 40, GAME_HEIGHT - 40, Theme.bgPanel).setStrokeStyle(3, Theme.accent);

    this.add.text(GAME_WIDTH / 2, 44, '🧪 MAP Practice Simulation', {
      fontFamily: 'Trebuchet MS', fontSize: '24px', color: Theme.css.accent, fontStyle: 'bold',
    }).setOrigin(0.5);

    this.header = this.add.text(GAME_WIDTH / 2 - PANEL_W / 2, 74, '', {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim,
    }).setOrigin(0, 0.5);
    this.ritText = this.add.text(GAME_WIDTH / 2 + PANEL_W / 2, 74, '', {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.warn,
    }).setOrigin(1, 0.5);

    const quit = this.add.text(GAME_WIDTH / 2 - PANEL_W / 2 - 8, 44, '✕', {
      fontFamily: 'Trebuchet MS', fontSize: '20px', color: Theme.css.bad,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    quit.on('pointerdown', () => { sfx.click(); this.scene.start('Menu'); });

    this.body = this.add.container(0, 0);
    this.showQuestion();
  }

  private showQuestion() {
    this.body.removeAll(true);
    if (this.panel) { this.panel.destroy(); this.panel = undefined; }

    if (this.idx >= this.plan.length) { this.showResults(); return; }

    const domain = this.plan[this.idx];
    this.header.setText(`Question ${this.idx + 1} of ${this.plan.length}`);
    this.ritText.setText('Adaptive mode — questions adjust to you');

    const problem = pickProblem(domain, this.testRit, this.used, this.lastCorrect);
    this.used.add(problem.id);

    this.panel = new ProblemPanel(this, GAME_WIDTH / 2, 110, {
      problem,
      width: PANEL_W,
      mode: 'test',
      onAnswered: (correct) => this.onAnswered(problem, correct),
    });
  }

  private onAnswered(problem: Problem, correct: boolean) {
    this.lastCorrect = correct;
    if (correct) this.correct++;
    this.testRit = updateRit(this.testRit, problem.tier, correct);

    const pd = this.perDomain.get(problem.domain) ?? { correct: 0, total: 0 };
    pd.total++;
    if (correct) pd.correct++;
    this.perDomain.set(problem.domain, pd);

    update((d) => {
      const st = d.stats[problem.domain];
      st.attempts++;
      if (correct) st.correct++;
      st.rit = updateRit(st.rit, problem.tier, correct);
      if (st.rit > d.bestRit) d.bestRit = st.rit;
    });
    if (!correct) {
      recordMiss(problem.id);
      this.missedNow.push(problem);
    }
    awardForAnswer(correct);

    this.idx++;
    this.showQuestion();
  }

  private showResults() {
    this.body.removeAll(true);
    if (this.panel) { this.panel.destroy(); this.panel = undefined; }
    this.header.setText('');
    this.ritText.setText('');

    const minutes = Math.max(1, Math.round((Date.now() - this.startTime) / 60000));
    recordTest({ date: new Date().toISOString().slice(0, 10), rit: this.testRit, correct: this.correct, total: this.plan.length });

    const cx = GAME_WIDTH / 2;
    const badge = ritBadge(this.testRit);
    const hitGoal = this.testRit >= RIT_GOAL;
    if (hitGoal) sfx.fanfare(); else sfx.taskDone();

    this.body.add(this.add.text(cx, 110, '📊 Test Results', {
      fontFamily: 'Trebuchet MS', fontSize: '26px', color: Theme.css.text, fontStyle: 'bold',
    }).setOrigin(0.5));

    this.body.add(this.add.text(cx, 152, `Estimated RIT: ${this.testRit}`, {
      fontFamily: 'Trebuchet MS', fontSize: '32px', color: hitGoal ? Theme.css.good : Theme.css.warn, fontStyle: 'bold',
    }).setOrigin(0.5));

    this.body.add(this.add.text(cx, 186, `~${badge.pct}th percentile · ${badge.label}`, {
      fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.accent,
    }).setOrigin(0.5));

    this.body.add(this.add.text(cx, 214, `${this.correct}/${this.plan.length} correct in about ${minutes} min · Goal: RIT ${RIT_GOAL}+ for Course 3`, {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim,
    }).setOrigin(0.5));

    // per-domain breakdown
    let y = 254;
    this.body.add(this.add.text(cx, y, '— Breakdown by topic —', {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim,
    }).setOrigin(0.5));
    y += 28;
    for (const dom of ALL_DOMAINS) {
      const pd = this.perDomain.get(dom);
      if (!pd) continue;
      const all = pd.correct === pd.total;
      this.body.add(this.add.text(cx - 220, y, `${all ? '🌟' : pd.correct === 0 ? '🔴' : '🟡'} ${DOMAIN_INFO[dom].label}`, {
        fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.text,
      }).setOrigin(0, 0.5));
      this.body.add(this.add.text(cx + 220, y, `${pd.correct}/${pd.total}`, {
        fontFamily: 'Trebuchet MS', fontSize: '15px', color: all ? Theme.css.good : Theme.css.warn,
      }).setOrigin(1, 0.5));
      y += 26;
    }

    y += 10;
    if (this.missedNow.length) {
      this.body.add(this.add.text(cx, y, `${this.missedNow.length} missed problem${this.missedNow.length > 1 ? 's' : ''} saved — review them to grow your RIT fastest!`, {
        fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.warn, align: 'center', wordWrap: { width: PANEL_W - 40 },
      }).setOrigin(0.5));
      y += 34;
      this.body.add(this.button(cx - 120, y + 16, '🔁 Review missed now', Theme.warn, () => this.scene.start('Task', { review: true })));
      this.body.add(this.button(cx + 120, y + 16, '🏠 Back to menu', Theme.accentDim, () => this.scene.start('Menu')));
    } else {
      this.body.add(this.add.text(cx, y, 'Perfect test — nothing to review. Outstanding! 🚀', {
        fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.good,
      }).setOrigin(0.5));
      y += 30;
      this.body.add(this.button(cx, y + 16, '🏠 Back to menu', Theme.good, () => this.scene.start('Menu')));
    }
  }

  private button(x: number, y: number, label: string, color: number, onClick: () => void): Phaser.GameObjects.Container {
    const w = Math.max(150, label.length * 10.5 + 28);
    const bg = this.add.rectangle(0, 0, w, 42, color).setStrokeStyle(2, Theme.text, 0.3).setInteractive({ useHandCursor: true });
    const txt = this.add.text(0, 0, label, { fontFamily: 'Trebuchet MS', fontSize: '16px', color: '#06121f', fontStyle: 'bold' }).setOrigin(0.5);
    bg.on('pointerover', () => bg.setScale(1.04));
    bg.on('pointerout', () => bg.setScale(1));
    bg.on('pointerdown', () => { sfx.click(); onClick(); });
    return this.add.container(x, y, [bg, txt]);
  }
}
