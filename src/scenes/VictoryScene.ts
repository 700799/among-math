import Phaser from 'phaser';
import { Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import { load, update, overallRit } from '../data/progress';
import { REWARDS } from '../game/Rewards';
import { ritBadge, RIT_GOAL } from '../math/adaptive';

// Win screen: confetti, a free reward unlock, and a fresh run option.
export class VictoryScene extends Phaser.Scene {
  constructor() {
    super('Victory');
  }

  create() {
    const cx = GAME_WIDTH / 2;
    const rit = overallRit();
    const badge = ritBadge(rit);

    this.add.rectangle(cx, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, Theme.bg);
    this.confetti();

    this.add.text(cx, 120, '🏆 ALL TASKS COMPLETE!', {
      fontFamily: 'Trebuchet MS', fontSize: '40px', color: Theme.css.good, fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(cx, 176, 'You crewed up and crushed every math station!', {
      fontFamily: 'Trebuchet MS', fontSize: '18px', color: Theme.css.text,
    }).setOrigin(0.5);

    this.add.text(cx, 224, `Overall RIT ${rit} · ~${badge.pct}th percentile`, {
      fontFamily: 'Trebuchet MS', fontSize: '20px', color: rit >= RIT_GOAL ? Theme.css.good : Theme.css.warn, fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(cx, 252, rit >= RIT_GOAL ? '🚀 You are on track for Course 3!' : 'Keep climbing toward RIT 235 for Course 3!', {
      fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.textDim,
    }).setOrigin(0.5);

    // free reward unlock for finishing
    const locked = REWARDS.filter((r) => !load().unlocks.includes(r.id));
    if (locked.length) {
      const reward = locked[0];
      update((d) => d.unlocks.push(reward.id));
      this.add.text(cx, 308, `🎁 New reward unlocked: ${reward.emoji} ${reward.name}!`, {
        fontFamily: 'Trebuchet MS', fontSize: '18px', color: Theme.css.accent,
      }).setOrigin(0.5);
    }

    // reset run flags so the kid can play again (mastery/RIT persists)
    this.button(cx - 110, 380, '🔁 New mission', Theme.good, () => {
      update((d) => { for (const k of Object.keys(d.stats)) (d.stats as any)[k].completed = false; });
      this.scene.start('Ship');
    });
    this.button(cx + 110, 380, '📋 Report', Theme.accentDim, () => this.scene.start('Report'));
  }

  private confetti() {
    const colors = [0xff6b6b, 0x4fc3ff, 0x4ade80, 0xffd166, 0xa564ff];
    const emitter = this.add.particles(0, 0, 'dot', {
      x: { min: 0, max: GAME_WIDTH },
      y: -10,
      lifespan: 4000,
      speedY: { min: 60, max: 160 },
      speedX: { min: -40, max: 40 },
      scale: { min: 0.4, max: 1 },
      quantity: 2,
      frequency: 90,
      tint: colors,
    });
    emitter.setDepth(0);
  }

  private button(x: number, y: number, label: string, color: number, onClick: () => void) {
    const w = Math.max(150, label.length * 11 + 24);
    const bg = this.add.rectangle(x, y, w, 42, color).setInteractive({ useHandCursor: true }).setStrokeStyle(2, Theme.text, 0.3).setDepth(2);
    const txt = this.add.text(x, y, label, { fontFamily: 'Trebuchet MS', fontSize: '16px', color: '#06121f', fontStyle: 'bold' }).setOrigin(0.5).setDepth(2);
    bg.on('pointerover', () => { bg.setScale(1.04); txt.setScale(1.04); });
    bg.on('pointerout', () => { bg.setScale(1); txt.setScale(1); });
    bg.on('pointerdown', onClick);
  }
}
