import Phaser from 'phaser';
import { Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import { REWARDS, buy } from '../game/Rewards';
import { load } from '../data/progress';

// Reward shop: spend coins earned from solving math on fun cosmetics.
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

    this.drawCoins();
    this.add.text(cx, 110, 'Earn coins by solving problems and keeping streaks!', {
      fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.textDim,
    }).setOrigin(0.5);

    const cols = 4;
    const cardW = 180, cardH = 130, gap = 16;
    const startX = cx - ((cols * (cardW + gap)) - gap) / 2 + cardW / 2;
    const startY = 200;

    REWARDS.forEach((r, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + gap);
      const y = startY + row * (cardH + gap);
      this.makeCard(x, y, cardW, cardH, r.id);
    });

    this.button(cx, GAME_HEIGHT - 44, '◀ Back', Theme.accentDim, () => this.scene.start('Menu'));
  }

  private coinLabel?: Phaser.GameObjects.Text;
  private drawCoins() {
    const cx = GAME_WIDTH / 2;
    this.add.image(cx - 36, 82, 'coin').setScale(0.9);
    this.coinLabel = this.add.text(cx - 20, 82, String(load().coins), {
      fontFamily: 'Trebuchet MS', fontSize: '22px', color: Theme.css.warn, fontStyle: 'bold',
    }).setOrigin(0, 0.5);
  }

  private makeCard(x: number, y: number, w: number, h: number, rewardId: string) {
    const reward = REWARDS.find((r) => r.id === rewardId)!;
    const owned = load().unlocks.includes(reward.id);
    const card = this.add.rectangle(x, y, w, h, Theme.bgPanel).setStrokeStyle(2, owned ? Theme.good : Theme.wall);
    this.add.text(x, y - 36, reward.emoji, { fontSize: '40px' }).setOrigin(0.5);
    this.add.text(x, y + 8, reward.name, { fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.text }).setOrigin(0.5);

    const statusY = y + 40;
    if (owned) {
      this.add.text(x, statusY, '✅ Owned', { fontFamily: 'Trebuchet MS', fontSize: '14px', color: Theme.css.good }).setOrigin(0.5);
    } else {
      const label = this.add.text(x, statusY, `🪙 ${reward.cost}`, {
        fontFamily: 'Trebuchet MS', fontSize: '15px', color: Theme.css.warn,
      }).setOrigin(0.5);
      card.setInteractive({ useHandCursor: true });
      card.on('pointerover', () => card.setFillStyle(Theme.bgPanelLight));
      card.on('pointerout', () => card.setFillStyle(Theme.bgPanel));
      card.on('pointerdown', () => {
        if (buy(reward)) {
          this.coinLabel?.setText(String(load().coins));
          this.scene.restart();
        } else {
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
    bg.on('pointerdown', onClick);
  }
}
