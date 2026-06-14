import Phaser from 'phaser';
import { Theme, GAME_WIDTH, GAME_HEIGHT } from '../theme';
import { ROOMS, STATIONS, SPAWN } from '../game/shipMap';
import { Player } from '../game/Player';
import { Bot } from '../game/Bot';
import { TaskStation } from '../game/TaskStation';
import { Hud } from '../ui/Hud';
import { load } from '../data/progress';
import { ALL_DOMAINS } from '../math/index';
import { sfx } from '../ui/sfx';

// The spaceship hub. Walk around, complete task stations (math), survive the
// occasional sabotage drill, and finish all tasks to win.
export class ShipScene extends Phaser.Scene {
  private player!: Player;
  private stations: TaskStation[] = [];
  private bots: Bot[] = [];
  private hud!: Hud;
  private interactKey!: Phaser.Input.Keyboard.Key;
  private interactKeyE!: Phaser.Input.Keyboard.Key;
  private escKey!: Phaser.Input.Keyboard.Key;
  private sabotageTimer?: Phaser.Time.TimerEvent;
  private banner!: Phaser.GameObjects.Text;

  constructor() {
    super('Ship');
  }

  create() {
    this.stations = [];
    this.bots = [];
    this.drawShip();

    const data = load();
    this.player = new Player(this, SPAWN.x, SPAWN.y, `crew-${data.colorIndex}`, data.name);

    // Stations
    for (const s of STATIONS) this.stations.push(new TaskStation(this, s));

    // Atmosphere bots in a couple of rooms
    const botRooms = [ROOMS[0], ROOMS[5], ROOMS[2]];
    botRooms.forEach((r, i) => {
      const rect = new Phaser.Geom.Rectangle(r.x, r.y, r.w, r.h);
      this.bots.push(new Bot(this, r.x + r.w / 2, r.y + r.h / 2, `crew-${(data.colorIndex + i + 3) % 10}`, rect));
    });

    this.hud = new Hud(this);

    this.banner = this.add
      .text(GAME_WIDTH / 2, 56, '', {
        fontFamily: 'Trebuchet MS', fontSize: '18px', color: Theme.css.warn, fontStyle: 'bold',
        backgroundColor: '#101736', padding: { x: 12, y: 6 },
      })
      .setOrigin(0.5)
      .setDepth(30)
      .setVisible(false);

    this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.interactKeyE = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    // Tapping a glowing station also starts it.
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      const near = this.nearestStation();
      if (near && near.distanceTo(p.worldX, p.worldY) < 60) this.startTask(near);
    });

    // When we come back from a task/sabotage, refresh everything + check win.
    const onResume = () => {
      this.stations.forEach((s) => s.refresh());
      this.hud.refresh();
      this.checkVictory();
      this.scheduleSabotage();
    };
    this.events.on('resume', onResume);
    this.events.once('shutdown', () => this.events.off('resume', onResume));

    this.scheduleSabotage();
    this.showHint('Walk to a glowing console and press SPACE to start a task!');
  }

  update(_t: number, dt: number) {
    this.player.update();
    this.bots.forEach((b) => b.update(dt));

    const near = this.nearestStation();
    this.stations.forEach((s) => s.setNearby(s === near));

    if (near && (Phaser.Input.Keyboard.JustDown(this.interactKey) || Phaser.Input.Keyboard.JustDown(this.interactKeyE))) {
      this.startTask(near);
    }
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.scene.start('Menu');
    }
  }

  private nearestStation(): TaskStation | null {
    let best: TaskStation | null = null;
    let bestD = 70;
    for (const s of this.stations) {
      const d = s.distanceTo(this.player.x, this.player.y);
      if (d < bestD) { bestD = d; best = s; }
    }
    return best;
  }

  private startTask(station: TaskStation) {
    if (this.sabotageTimer) this.sabotageTimer.remove();
    this.scene.pause();
    this.scene.launch('Task', { domain: station.station.domain });
  }

  private scheduleSabotage() {
    if (this.sabotageTimer) this.sabotageTimer.remove();
    // Only sabotage if there are still tasks to do, to keep it from nagging.
    const remaining = ALL_DOMAINS.filter((d) => !load().stats[d].completed).length;
    if (remaining === 0) return;
    this.sabotageTimer = this.time.delayedCall(Phaser.Math.Between(35000, 55000), () => {
      sfx.alarm();
      this.banner.setText('⚠️  REACTOR SABOTAGE!  Solve fast to fix it!').setVisible(true);
      this.cameras.main.shake(400, 0.004);
      this.time.delayedCall(1800, () => {
        this.banner.setVisible(false);
        this.scene.pause();
        this.scene.launch('Sabotage');
      });
    });
  }

  private checkVictory() {
    const allDone = ALL_DOMAINS.every((d) => load().stats[d].completed);
    if (allDone) {
      if (this.sabotageTimer) this.sabotageTimer.remove();
      this.scene.start('Victory');
    }
  }

  private showHint(msg: string) {
    this.banner.setText(msg).setVisible(true);
    this.time.delayedCall(4000, () => this.banner.setVisible(false));
  }

  // ---- ship rendering ----
  private drawShip() {
    const g = this.add.graphics().setDepth(0);
    // hull background
    g.fillStyle(Theme.bg, 1);
    g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // central corridor
    g.fillStyle(Theme.floorAlt, 1);
    g.fillRoundedRect(GAME_WIDTH * 0.3, GAME_HEIGHT * 0.36, GAME_WIDTH * 0.4, GAME_HEIGHT * 0.28, 12);

    // rooms
    for (const r of ROOMS) {
      g.fillStyle(Theme.floor, 1);
      g.fillRoundedRect(r.x, r.y, r.w, r.h, 10);
      g.lineStyle(3, Theme.wall, 1);
      g.strokeRoundedRect(r.x, r.y, r.w, r.h, 10);
      // connect each room to the corridor with a hallway stub
      g.fillStyle(Theme.floorAlt, 1);
      const midX = r.x + r.w / 2;
      const midY = r.y + r.h / 2;
      g.fillRect(midX - 18, midY - 18, 36, 36);
    }

    // room labels
    for (const r of ROOMS) {
      this.add
        .text(r.x + r.w / 2, r.y + 12, r.name, {
          fontFamily: 'Trebuchet MS', fontSize: '13px', color: Theme.css.textDim,
        })
        .setOrigin(0.5)
        .setDepth(1);
    }

    // subtle stars
    for (let i = 0; i < 40; i++) {
      const sx = Phaser.Math.Between(0, GAME_WIDTH);
      const sy = Phaser.Math.Between(0, GAME_HEIGHT);
      this.add.circle(sx, sy, Phaser.Math.Between(1, 2), 0xffffff, 0.08).setDepth(0);
    }
  }
}
