import Phaser from 'phaser';
import { Theme, GAME_WIDTH } from '../theme';
import { load, overallRit } from '../data/progress';
import { RIT_GOAL, RIT_MIN, RIT_MAX, ritBadge } from '../math/adaptive';
import { ALL_DOMAINS } from '../math/index';

// Top status strip for the ship: coins, tasks completed, and a RIT meter that
// shows progress toward the ~235 Course 3 goal.
export class Hud {
  private scene: Phaser.Scene;
  private coinText: Phaser.GameObjects.Text;
  private taskText: Phaser.GameObjects.Text;
  private streakText!: Phaser.GameObjects.Text;
  private ritFill: Phaser.GameObjects.Rectangle;
  private ritText: Phaser.GameObjects.Text;
  private barX = GAME_WIDTH - 250;
  private barW = 180;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const strip = scene.add.rectangle(GAME_WIDTH / 2, 18, GAME_WIDTH, 36, Theme.bgPanel, 0.92).setDepth(20);
    strip.setStrokeStyle(1, Theme.wall);

    scene.add.image(20, 18, 'coin').setDepth(21).setScale(0.8);
    this.coinText = scene.add
      .text(34, 18, '0', { fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.warn, fontStyle: 'bold' })
      .setOrigin(0, 0.5)
      .setDepth(21);

    this.taskText = scene.add
      .text(120, 18, 'Tasks 0/6', { fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.text })
      .setOrigin(0, 0.5)
      .setDepth(21);

    this.streakText = scene.add
      .text(240, 18, '', { fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.warn, fontStyle: 'bold' })
      .setOrigin(0, 0.5)
      .setDepth(21);

    // RIT meter
    scene.add
      .text(this.barX - 8, 18, 'RIT', { fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim })
      .setOrigin(1, 0.5)
      .setDepth(21);
    scene.add.rectangle(this.barX, 18, this.barW, 14, 0x000000, 0.5).setOrigin(0, 0.5).setDepth(21);
    this.ritFill = scene.add.rectangle(this.barX, 18, 0, 14, Theme.good).setOrigin(0, 0.5).setDepth(21);
    // goal marker
    const goalX = this.barX + this.barW * ((RIT_GOAL - RIT_MIN) / (RIT_MAX - RIT_MIN));
    scene.add.rectangle(goalX, 18, 2, 18, Theme.warn).setDepth(22);
    this.ritText = scene.add
      .text(this.barX + this.barW + 8, 18, '', { fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.text })
      .setOrigin(0, 0.5)
      .setDepth(21);

    this.refresh();
  }

  refresh() {
    const d = load();
    this.coinText.setText(String(d.coins));
    const done = ALL_DOMAINS.filter((dom) => d.stats[dom].completed).length;
    this.taskText.setText(`Tasks ${done}/${ALL_DOMAINS.length}`);
    this.streakText.setText(d.streak >= 3 ? `🔥 ${d.streak} streak!` : '');

    const rit = overallRit(d);
    const frac = Phaser.Math.Clamp((rit - RIT_MIN) / (RIT_MAX - RIT_MIN), 0, 1);
    this.scene.tweens.add({ targets: this.ritFill, width: this.barW * frac, duration: 300 });
    this.ritFill.setFillStyle(rit >= RIT_GOAL ? Theme.good : Theme.accent);
    this.ritText.setText(`${rit} · ${ritBadge(rit).pct}%`);
  }
}
