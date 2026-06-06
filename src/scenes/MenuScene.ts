import Phaser from 'phaser';
import { CREW_COLORS, Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import { load, update, overallRit } from '../data/progress';

// Title screen: pick a crewmate color, see your RIT, jump into the ship,
// open the Mission Report, or visit the cosmetics Shop.
export class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    const cx = GAME_WIDTH / 2;
    const data = load();

    this.add
      .text(cx, 70, 'AMONG MATH', {
        fontFamily: 'Trebuchet MS', fontSize: '64px', color: Theme.css.accent, fontStyle: 'bold',
      })
      .setOrigin(0.5);
    this.add
      .text(cx, 118, 'Crew up • Solve math • Qualify for Course 3 🚀', {
        fontFamily: 'Trebuchet MS', fontSize: '18px', color: Theme.css.textDim,
      })
      .setOrigin(0.5);

    // Crewmate preview
    const preview = this.add.image(cx, 220, `crew-${data.colorIndex}`).setScale(2.4);
    this.tweens.add({ targets: preview, y: 212, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

    this.add
      .text(cx, 290, 'Pick your crewmate color', {
        fontFamily: 'Trebuchet MS', fontSize: '16px', color: Theme.css.text,
      })
      .setOrigin(0.5);

    // Color swatches
    const total = CREW_COLORS.length;
    const startX = cx - ((total - 1) * 38) / 2;
    CREW_COLORS.forEach((c, i) => {
      const sw = this.add.circle(startX + i * 38, 326, 14, c.hex).setInteractive({ useHandCursor: true });
      sw.setStrokeStyle(i === data.colorIndex ? 4 : 1, i === data.colorIndex ? Theme.text : Theme.wall);
      sw.on('pointerover', () => sw.setScale(1.15));
      sw.on('pointerout', () => sw.setScale(1));
      sw.on('pointerdown', () => {
        update((d) => { d.colorIndex = i; });
        preview.setTexture(`crew-${i}`);
        this.scene.restart();
      });
    });

    // RIT readout
    const rit = overallRit(data);
    this.add
      .text(cx, 372, `Your RIT estimate: ${rit}  (goal 235+ for Course 3)`, {
        fontFamily: 'Trebuchet MS', fontSize: '15px', color: rit >= 235 ? Theme.css.good : Theme.css.warn,
      })
      .setOrigin(0.5);

    // Buttons
    this.button(cx, 430, '▶  ENTER THE SHIP', Theme.good, () => this.scene.start('Ship'));
    this.button(cx - 150, 488, '📋 Mission Report', Theme.accentDim, () => this.scene.start('Report'));
    this.button(cx + 150, 488, '🛍️ Reward Shop', Theme.accentDim, () => this.scene.start('Shop'));

    this.add
      .text(cx, GAME_HEIGHT - 28, 'Move: Arrow keys / WASD or tap.  Walk onto a glowing console and press SPACE.', {
        fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
      })
      .setOrigin(0.5);
  }

  private button(x: number, y: number, label: string, color: number, onClick: () => void) {
    const w = 260;
    const bg = this.add.rectangle(x, y, w, 44, color, 1).setInteractive({ useHandCursor: true });
    bg.setStrokeStyle(2, Theme.text, 0.4);
    const txt = this.add
      .text(x, y, label, { fontFamily: 'Trebuchet MS', fontSize: '18px', color: '#06121f', fontStyle: 'bold' })
      .setOrigin(0.5);
    bg.on('pointerover', () => { bg.setScale(1.04); txt.setScale(1.04); });
    bg.on('pointerout', () => { bg.setScale(1); txt.setScale(1); });
    bg.on('pointerdown', onClick);
  }
}
