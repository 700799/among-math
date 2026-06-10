import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, Theme } from './theme';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { ShipScene } from './scenes/ShipScene';
import { TaskScene } from './scenes/TaskScene';
import { SabotageScene } from './scenes/SabotageScene';
import { ReportScene } from './scenes/ReportScene';
import { VictoryScene } from './scenes/VictoryScene';
import { ShopScene } from './scenes/ShopScene';
import { TestScene } from './scenes/TestScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: Theme.bg,
  pixelArt: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [
    BootScene,
    MenuScene,
    ShipScene,
    TaskScene,
    SabotageScene,
    ReportScene,
    ShopScene,
    TestScene,
    VictoryScene,
  ],
};

// Hide the HTML loading splash once Phaser boots.
const game = new Phaser.Game(config);
game.events.once(Phaser.Core.Events.READY, () => {
  const el = document.getElementById('loading');
  if (el) el.style.display = 'none';
});

export default game;
