import Phaser from 'phaser';
import { Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import { DOMAIN_INFO } from '../math/types';
import { ALL_DOMAINS } from '../math/index';
import { load, overallRit, resetAll } from '../data/progress';
import { RIT_GOAL, ritBadge } from '../math/adaptive';

// Mission Report: per-domain mastery + RIT toward the Course 3 goal. Doubles
// as a parent/kid progress view.
export class ReportScene extends Phaser.Scene {
  constructor() {
    super('Report');
  }

  create() {
    const cx = GAME_WIDTH / 2;
    const data = load();
    const rit = overallRit(data);
    const badge = ritBadge(rit);

    this.add.rectangle(cx, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, Theme.bg);
    this.add.text(cx, 44, '📋 Mission Report', {
      fontFamily: 'Trebuchet MS', fontSize: '34px', color: Theme.css.accent, fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(cx, 86, `Overall RIT ${rit}  ·  ~${badge.pct}th percentile  ·  ${badge.label}`, {
      fontFamily: 'Trebuchet MS', fontSize: '17px', color: rit >= RIT_GOAL ? Theme.css.good : Theme.css.warn,
    }).setOrigin(0.5);
    this.add.text(cx, 110, `Course 3 target: RIT ${RIT_GOAL}+ (about 90th percentile)`, {
      fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
    }).setOrigin(0.5);

    // per-domain rows
    let y = 150;
    const rowW = 600;
    const left = cx - rowW / 2;
    for (const dom of ALL_DOMAINS) {
      const st = data.stats[dom];
      const info = DOMAIN_INFO[dom];
      const acc = st.attempts ? Math.round((st.correct / st.attempts) * 100) : 0;

      this.add.text(left, y, `${st.completed ? '✅' : '⬜'} ${info.short} — ${info.label}`, {
        fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.text,
      }).setOrigin(0, 0.5);

      // mini RIT bar
      const barX = left + 360;
      const barW = 150;
      this.add.rectangle(barX, y, barW, 12, 0x000000, 0.5).setOrigin(0, 0.5);
      const frac = Phaser.Math.Clamp((st.rit - 180) / (265 - 180), 0, 1);
      this.add.rectangle(barX, y, barW * frac, 12, st.rit >= RIT_GOAL ? Theme.good : Theme.accent).setOrigin(0, 0.5);
      this.add.text(barX + barW + 10, y, `RIT ${st.rit}`, {
        fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
      }).setOrigin(0, 0.5);
      this.add.text(left + 290, y, `${acc}%`, {
        fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
      }).setOrigin(0, 0.5);

      y += 44;
    }

    this.add.text(cx, y + 6, `Coins: ${data.coins}   ·   Best streak rewards unlocked: ${data.unlocks.length}`, {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.warn,
    }).setOrigin(0.5);

    // buttons
    this.button(cx - 110, GAME_HEIGHT - 50, '◀ Back', Theme.accentDim, () => this.scene.start('Menu'));
    this.button(cx + 110, GAME_HEIGHT - 50, '↺ Reset progress', Theme.bad, () => {
      resetAll();
      this.scene.restart();
    });
  }

  private button(x: number, y: number, label: string, color: number, onClick: () => void) {
    const w = Math.max(140, label.length * 11 + 20);
    const bg = this.add.rectangle(x, y, w, 38, color).setInteractive({ useHandCursor: true }).setStrokeStyle(2, Theme.text, 0.3);
    const txt = this.add.text(x, y, label, { fontFamily: 'Trebuchet MS', fontSize: '15px', color: '#06121f', fontStyle: 'bold' }).setOrigin(0.5);
    bg.on('pointerover', () => { bg.setScale(1.04); txt.setScale(1.04); });
    bg.on('pointerout', () => { bg.setScale(1); txt.setScale(1); });
    bg.on('pointerdown', onClick);
  }
}
