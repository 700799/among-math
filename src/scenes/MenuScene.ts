import Phaser from 'phaser';
import { CREW_COLORS, Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import { load, update, overallRit } from '../data/progress';
import { equippedHatEmoji, equippedPetEmoji } from '../game/Rewards';
import { RIT_GOAL } from '../math/adaptive';
import { sfx } from '../ui/sfx';

// Title screen: name your crewmate, pick a color, jump into the ship, take a
// MAP practice test, check the Mission Report, or visit the Reward Shop.
export class MenuScene extends Phaser.Scene {
  private editingName = false;
  private nameText!: Phaser.GameObjects.Text;
  private keyHandler?: (e: KeyboardEvent) => void;

  constructor() {
    super('Menu');
  }

  create() {
    const cx = GAME_WIDTH / 2;
    const data = load();
    this.editingName = false;

    this.add
      .text(cx, 58, 'AMONG MATH', {
        fontFamily: 'Trebuchet MS', fontSize: '58px', color: Theme.css.accent, fontStyle: 'bold',
      })
      .setOrigin(0.5);
    this.add
      .text(cx, 102, 'Crew up • Solve math • Qualify for Course 3 🚀', {
        fontFamily: 'Trebuchet MS', fontSize: '17px', color: Theme.css.textDim,
      })
      .setOrigin(0.5);

    // Mute toggle (top-right)
    const muteBtn = this.add
      .text(GAME_WIDTH - 28, 28, data.muted ? '🔇' : '🔊', { fontSize: '24px' })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    muteBtn.on('pointerdown', () => {
      const d = update((s) => { s.muted = !s.muted; });
      muteBtn.setText(d.muted ? '🔇' : '🔊');
      sfx.click();
    });

    // Crewmate preview with hat + pet
    const preview = this.add.image(cx, 196, `crew-${data.colorIndex}`).setScale(2.2);
    this.tweens.add({ targets: preview, y: 188, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    const hatEmoji = equippedHatEmoji();
    if (hatEmoji) {
      const hat = this.add.text(cx, 196 - 50, hatEmoji, { fontSize: '34px' }).setOrigin(0.5, 1);
      this.tweens.add({ targets: hat, y: hat.y - 8, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
    }
    const petEmoji = equippedPetEmoji();
    if (petEmoji) {
      this.add.text(cx + 70, 216, petEmoji, { fontSize: '30px' }).setOrigin(0.5);
    }

    // Editable crew name
    this.nameText = this.add
      .text(cx, 258, `✏️ ${data.name}`, {
        fontFamily: 'Trebuchet MS', fontSize: '18px', color: Theme.css.warn,
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    this.nameText.on('pointerdown', () => this.startNameEdit());

    // Color swatches
    const total = CREW_COLORS.length;
    const startX = cx - ((total - 1) * 38) / 2;
    CREW_COLORS.forEach((c, i) => {
      const sw = this.add.circle(startX + i * 38, 298, 14, c.hex).setInteractive({ useHandCursor: true });
      sw.setStrokeStyle(i === data.colorIndex ? 4 : 1, i === data.colorIndex ? Theme.text : Theme.wall);
      sw.on('pointerover', () => sw.setScale(1.15));
      sw.on('pointerout', () => sw.setScale(1));
      sw.on('pointerdown', () => {
        sfx.click();
        update((d) => { d.colorIndex = i; });
        this.scene.restart();
      });
    });

    // RIT readout
    const rit = overallRit(data);
    this.add
      .text(cx, 340, `Your RIT estimate: ${rit}  ·  goal ${RIT_GOAL}+ for Course 3`, {
        fontFamily: 'Trebuchet MS', fontSize: '15px', color: rit >= RIT_GOAL ? Theme.css.good : Theme.css.warn,
      })
      .setOrigin(0.5);

    // Buttons
    this.button(cx, 396, '▶  ENTER THE SHIP', Theme.good, 300, () => this.scene.start('Ship'));
    this.button(cx, 448, '🧪 MAP Practice Test (15 questions)', Theme.accent, 300, () => this.scene.start('Test'));
    this.button(cx - 150, 502, '📋 Mission Report', Theme.accentDim, 270, () => this.scene.start('Report'));
    this.button(cx + 150, 502, '🛍️ Reward Shop', Theme.accentDim, 270, () => this.scene.start('Shop'));

    this.add
      .text(cx, GAME_HEIGHT - 50, 'Tasks teach a lesson first, then practice adapts to you — just like the real MAP test.', {
        fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
      })
      .setOrigin(0.5);
    this.add
      .text(cx, GAME_HEIGHT - 28, 'Move: Arrow keys / WASD or tap.  Walk onto a glowing console and press SPACE.', {
        fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
      })
      .setOrigin(0.5);

    this.events.once('shutdown', () => this.stopNameEdit());
  }

  // ---- inline crew-name editing with the keyboard ----
  private startNameEdit() {
    if (this.editingName) return;
    this.editingName = true;
    sfx.click();
    let name = '';
    this.nameText.setText('Type your name…').setColor(Theme.css.accent);

    this.keyHandler = (e: KeyboardEvent) => {
      if (!this.editingName) return;
      if (e.key === 'Enter') {
        this.commitName(name);
      } else if (e.key === 'Backspace') {
        name = name.slice(0, -1);
        this.nameText.setText(`✏️ ${name}▎`);
      } else if (/^[a-zA-Z0-9 ]$/.test(e.key) && name.length < 12) {
        name += e.key;
        this.nameText.setText(`✏️ ${name}▎`);
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  private commitName(name: string) {
    const finalName = name.trim() || load().name;
    update((d) => { d.name = finalName; });
    this.stopNameEdit();
    this.nameText.setText(`✏️ ${finalName}`).setColor(Theme.css.warn);
  }

  private stopNameEdit() {
    this.editingName = false;
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = undefined;
    }
  }

  private button(x: number, y: number, label: string, color: number, width: number, onClick: () => void) {
    const bg = this.add.rectangle(x, y, width, 44, color, 1).setInteractive({ useHandCursor: true });
    bg.setStrokeStyle(2, Theme.text, 0.4);
    const txt = this.add
      .text(x, y, label, { fontFamily: 'Trebuchet MS', fontSize: '17px', color: '#06121f', fontStyle: 'bold' })
      .setOrigin(0.5);
    bg.on('pointerover', () => { bg.setScale(1.04); txt.setScale(1.04); });
    bg.on('pointerout', () => { bg.setScale(1); txt.setScale(1); });
    bg.on('pointerdown', () => { sfx.click(); this.stopNameEdit(); onClick(); });
  }
}
