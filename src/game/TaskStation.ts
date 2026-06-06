import Phaser from 'phaser';
import { Theme } from '../theme';
import { DOMAIN_INFO } from '../math/types';
import type { Station } from './shipMap';
import { load } from '../data/progress';

// An interactive console the player walks up to in order to start a task
// (a math problem set) for one domain. Glows when nearby; checks completion.
export class TaskStation {
  station: Station;
  sprite: Phaser.GameObjects.Image;
  private glow: Phaser.GameObjects.Arc;
  private check: Phaser.GameObjects.Text;
  private prompt: Phaser.GameObjects.Text;
  private nearby = false;

  constructor(scene: Phaser.Scene, station: Station) {
    this.station = station;
    const { x, y } = station;

    this.glow = scene.add.circle(x, y + 6, 34, Theme.accent, 0.0).setDepth(2);
    this.sprite = scene.add.image(x, y, 'station').setDepth(2);

    const info = DOMAIN_INFO[station.domain];
    scene.add
      .text(x, y - 34, info.short, {
        fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.accent, fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(2);

    this.check = scene.add
      .text(x + 20, y - 24, '', { fontSize: '18px' })
      .setOrigin(0.5)
      .setDepth(3);

    this.prompt = scene.add
      .text(x, y + 30, '', {
        fontFamily: 'Trebuchet MS', fontSize: '12px', color: Theme.css.warn, align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(7)
      .setVisible(false);

    this.refresh();

    scene.tweens.add({
      targets: this.glow,
      scale: { from: 0.9, to: 1.1 },
      duration: 900,
      yoyo: true,
      repeat: -1,
    });
  }

  refresh() {
    const done = load().stats[this.station.domain].completed;
    this.check.setText(done ? '✅' : '');
  }

  setNearby(near: boolean) {
    if (near === this.nearby) return;
    this.nearby = near;
    this.glow.setFillStyle(Theme.accent, near ? 0.28 : 0.0);
    this.prompt
      .setText(near ? `${DOMAIN_INFO[this.station.domain].label}\n[ SPACE / TAP to start ]` : '')
      .setVisible(near);
  }

  distanceTo(x: number, y: number): number {
    return Phaser.Math.Distance.Between(x, y, this.station.x, this.station.y);
  }
}
