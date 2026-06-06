import Phaser from 'phaser';
import { CREW_COLORS, Theme } from '../theme';
import { load } from '../data/progress';

// Generates all textures at runtime (crewmates, stations, coin) so the game
// ships with zero image assets and deploys as a tiny static bundle.
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    load(); // warm the save cache / create defaults

    // ---- Crewmate textures, one per crew color ----
    CREW_COLORS.forEach((c, i) => this.makeCrewmate(`crew-${i}`, c.hex));

    // ---- Generic "shadow" ellipse under crewmates ----
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.25);
    shadow.fillEllipse(20, 8, 36, 14);
    shadow.generateTexture('shadow', 40, 18);
    shadow.destroy();

    // ---- Task station console ----
    const st = this.add.graphics();
    st.fillStyle(0x0e1430, 1);
    st.fillRoundedRect(0, 10, 56, 46, 8);
    st.fillStyle(Theme.accentDim, 1);
    st.fillRoundedRect(6, 0, 44, 30, 6);
    st.fillStyle(0x0a0f24, 1);
    st.fillRoundedRect(11, 5, 34, 20, 4);
    st.lineStyle(2, Theme.accent, 1);
    st.strokeRoundedRect(11, 5, 34, 20, 4);
    st.generateTexture('station', 56, 56);
    st.destroy();

    // ---- Coin ----
    const coin = this.add.graphics();
    coin.fillStyle(0xb8860b, 1);
    coin.fillCircle(12, 12, 12);
    coin.fillStyle(Theme.coin, 1);
    coin.fillCircle(12, 12, 9);
    coin.generateTexture('coin', 24, 24);
    coin.destroy();

    // ---- Soft particle dot for celebrations ----
    const dot = this.add.graphics();
    dot.fillStyle(0xffffff, 1);
    dot.fillCircle(6, 6, 6);
    dot.generateTexture('dot', 12, 12);
    dot.destroy();

    this.scene.start('Menu');
  }

  // Draw a classic "bean" crewmate: body, visor, backpack, with shading.
  private makeCrewmate(key: string, color: number) {
    const g = this.add.graphics();
    const dark = Phaser.Display.Color.IntegerToColor(color).darken(28).color;
    const light = Phaser.Display.Color.IntegerToColor(color).lighten(18).color;

    // backpack
    g.fillStyle(dark, 1);
    g.fillRoundedRect(2, 14, 9, 20, 4);
    // body
    g.fillStyle(color, 1);
    g.fillRoundedRect(8, 6, 26, 34, 12);
    // legs
    g.fillRoundedRect(11, 34, 8, 8, 3);
    g.fillRoundedRect(23, 34, 8, 8, 3);
    // body highlight
    g.fillStyle(light, 0.5);
    g.fillRoundedRect(11, 9, 8, 22, 6);
    // visor
    g.fillStyle(0x9fd3ff, 1);
    g.fillRoundedRect(18, 11, 16, 11, 6);
    g.fillStyle(0xffffff, 0.7);
    g.fillRoundedRect(20, 13, 5, 4, 2);

    g.generateTexture(key, 40, 44);
    g.destroy();
  }
}
