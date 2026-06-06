import Phaser from 'phaser';
import { Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import { getFluencyDrill } from '../math/index';
import { ProblemPanel } from '../ui/ProblemPanel';
import { load, update, overallRit } from '../data/progress';
import { updateRit } from '../math/adaptive';
import { awardForAnswer } from '../game/Rewards';

const DRILL_SECONDS = 40;
const DRILL_COUNT = 5;

// A timed fluency drill that simulates MAP speed. Forgiving: running out of
// time just ends the drill — never a hard game over.
export class SabotageScene extends Phaser.Scene {
  private set: ReturnType<typeof getFluencyDrill> = [];
  private idx = 0;
  private correct = 0;
  private panel?: ProblemPanel;
  private timeLeft = DRILL_SECONDS;
  private timerText!: Phaser.GameObjects.Text;
  private bar!: Phaser.GameObjects.Rectangle;
  private ticker?: Phaser.Time.TimerEvent;
  private done = false;

  constructor() {
    super('Sabotage');
  }

  create() {
    this.idx = 0;
    this.correct = 0;
    this.timeLeft = DRILL_SECONDS;
    this.done = false;
    this.set = getFluencyDrill(load().bestRit, DRILL_COUNT);

    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x2a0000, 0.55);
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 560, 460, Theme.bgPanel).setStrokeStyle(3, Theme.bad);

    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 200, '⚠️ REACTOR MELTDOWN', {
      fontFamily: 'Trebuchet MS', fontSize: '24px', color: Theme.css.bad, fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 172, 'Solve fast to stabilize the core!', {
      fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.textDim,
    }).setOrigin(0.5);

    // timer bar
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 148, 400, 12, 0x000000, 0.5);
    this.bar = this.add.rectangle(GAME_WIDTH / 2 - 200, GAME_HEIGHT / 2 - 148, 400, 12, Theme.warn).setOrigin(0, 0.5);
    this.timerText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 128, `${this.timeLeft}s`, {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.warn,
    }).setOrigin(0.5);

    this.ticker = this.time.addEvent({
      delay: 1000, loop: true, callback: () => {
        this.timeLeft--;
        this.timerText.setText(`${this.timeLeft}s`);
        this.bar.width = 400 * (this.timeLeft / DRILL_SECONDS);
        this.bar.setFillStyle(this.timeLeft <= 10 ? Theme.bad : Theme.warn);
        if (this.timeLeft <= 0) this.finish(false);
      },
    });

    this.showProblem();
  }

  private showProblem() {
    if (this.done) return;
    if (this.panel) { this.panel.destroy(); this.panel = undefined; }
    if (this.idx >= this.set.length) { this.finish(true); return; }

    this.add.text(GAME_WIDTH / 2 + 250, GAME_HEIGHT / 2 - 128, `${this.idx + 1}/${this.set.length}`, {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim,
    }).setOrigin(0.5);

    this.panel = new ProblemPanel(this, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 90, {
      problem: this.set[this.idx],
      width: 520,
      compact: true,
      onAnswered: (correct) => this.onAnswered(correct),
    });
  }

  private onAnswered(correct: boolean) {
    const problem = this.set[this.idx];
    if (correct) this.correct++;
    update((d) => {
      const st = d.stats[problem.domain];
      st.attempts++;
      if (correct) st.correct++;
      st.rit = updateRit(st.rit, problem.tier, correct);
      if (st.rit > d.bestRit) d.bestRit = st.rit;
    });
    awardForAnswer(correct);
    this.idx++;
    this.showProblem();
  }

  private finish(fixed: boolean) {
    if (this.done) return;
    this.done = true;
    if (this.ticker) this.ticker.remove();
    if (this.panel) { this.panel.destroy(); this.panel = undefined; }

    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 560, 460, Theme.bgPanel, 0.96);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, fixed ? '🛠️ Reactor Stabilized!' : '⏱️ Out of time — core held!', {
      fontFamily: 'Trebuchet MS', fontSize: '24px', color: fixed ? Theme.css.good : Theme.css.warn, fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 2, `Solved ${this.correct} of ${this.set.length}.  RIT ${overallRit()}.`, {
      fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.text,
    }).setOrigin(0.5);

    const bg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 60, 200, 42, Theme.good).setInteractive({ useHandCursor: true });
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 60, '▶ Back to ship', {
      fontFamily: 'Trebuchet MS', fontSize: '16px', color: '#06121f', fontStyle: 'bold',
    }).setOrigin(0.5);
    bg.on('pointerdown', () => { this.scene.stop(); this.scene.resume('Ship'); });
    this.time.delayedCall(4000, () => { if (this.scene.isActive()) { this.scene.stop(); this.scene.resume('Ship'); } });
  }
}
