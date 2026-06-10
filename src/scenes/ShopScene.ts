import Phaser from 'phaser';
import { Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import { REWARDS, buy, equip, type Reward } from '../game/Rewards';
import { load } from '../data/progress';
import { sfx } from '../ui/sfx';

// Reward shop: spend coins earned from solving math on cosmetics that
// actually appear on your crewmate. Click an owned hat/pet to equip it.
export class ShopScene extends Phaser.Scene {
  constructor() {
    super('Shop');
  }

  create() {
    const cx = GAME_WIDTH / 2;
    this.add.rectangle(cx, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, Theme.bg);
    this.add.text(cx, 44, '🛍️ Reward Shop', {
      fontFamily: 'Trebuchet MS', fontSize: '34px', color: Theme.css.accent, fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.image(cx - 36, 84, 'coin').setScale(0.9);
    this.add.text(cx - 20, 84, String(load().coins), {
      fontFamily: 'Trebuchet MS', fontSize: '22px', color: Theme.css.warn, fontStyle: 'bold',
    }).setOrigin(0, 0.5);

    this.add.text(cx, 116, 'Earn coins by solving problems and keeping streaks! Hats sit on your head, pets follow you around.', {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim, align: 'center', wordWrap: { width: 700 },
    }).setOrigin(0.5);

    const cols = 4;
    const cardW = 180, cardH = 138, gap = 16;
    const startX = cx - ((cols * (cardW + gap)) - gap) / 2 + cardW / 2;
    const startY = 212;

    REWARDS.forEach((r, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + gap);
      const y = startY + row * (cardH + gap);
      this.makeCard(x, y, cardW, cardH, r);
    });

    this.button(cx, GAME_HEIGHT - 40, '◀ Back', Theme.accentDim, () => this.scene.start('Menu'));
  }

  private makeCard(x: number, y: number, w: number, h: number, reward: Reward) {
    const d = load();
    const owned = d.unlocks.includes(reward.id);
    const equipped = d.equippedHat === reward.id || d.equippedPet === reward.id || (reward.kind === 'badge' && owned);

    const card = this.add.rectangle(x, y, w, h, equipped ? Theme.bgPanelLight : Theme.bgPanel)
      .setStrokeStyle(2, equipped ? Theme.good : owned ? Theme.accent : Theme.wall);
    this.add.text(x, y - 38, reward.emoji, { fontSize: '40px' }).setOrigin(0.5);
    this.add.text(x, y + 6, reward.name, { fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.text }).setOrigin(0.5);

    const statusY = y + 42;
    if (owned) {
      const label = equipped
        ? (reward.kind === 'badge' ? '⭐ Always on' : '✅ Equipped')
        : 'Tap to equip';
      this.add.text(x, statusY, label, {
        fontFamily: 'Trebuchet MS', fontSize: '14px', color: equipped ? Theme.css.good : Theme.css.accent,
      }).setOrigin(0.5);
      if (reward.kind !== 'badge') {
        card.setInteractive({ useHandCursor: true });
        card.on('pointerdown', () => {
          sfx.click();
          equip(reward);
          this.scene.restart();
        });
      }
    } else {
      const label = this.add.text(x, statusY, `🪙 ${reward.cost}`, {
        fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.warn,
      }).setOrigin(0.5);
      card.setInteractive({ useHandCursor: true });
      card.on('pointerover', () => card.setFillStyle(Theme.bgPanelLight));
      card.on('pointerout', () => card.setFillStyle(Theme.bgPanel));
      card.on('pointerdown', () => {
        if (buy(reward)) {
          sfx.coin();
          this.scene.restart();
        } else {
          sfx.wrong();
          label.setText('Not enough 🪙').setColor(Theme.css.bad);
          this.time.delayedCall(900, () => label.setText(`🪙 ${reward.cost}`).setColor(Theme.css.warn));
        }
      });
    }
  }

  private button(x: number, y: number, label: string, color: number, onClick: () => void) {
    const w = Math.max(140, label.length * 11 + 20);
    const bg = this.add.rectangle(x, y, w, 38, color).setInteractive({ useHandCursor: true }).setStrokeStyle(2, Theme.text, 0.3);
    const txt = this.add.text(x, y, label, { fontFamily: 'Trebuchet MS', fontSize: '15px', color: '#06121f', fontStyle: 'bold' }).setOrigin(0.5);
    bg.on('pointerover', () => { bg.setScale(1.04); txt.setScale(1.04); });
    bg.on('pointerout', () => { bg.setScale(1); txt.setScale(1); });
    bg.on('pointerdown', () => { sfx.click(); onClick(); });
  }
}
