import Phaser from 'phaser';
import { equippedHatEmoji, equippedPetEmoji, hasBadge } from './Rewards';

// The kid's crewmate. Moves with arrows/WASD and supports tap/click-to-move
// so it plays nicely on tablets too. Earned cosmetics show up here: the
// equipped hat floats on the head, the pet follows behind, and the gold
// badge stars the name.
export class Player {
  sprite: Phaser.Physics.Arcade.Sprite;
  private shadow: Phaser.GameObjects.Image;
  private label: Phaser.GameObjects.Text;
  private hat?: Phaser.GameObjects.Text;
  private pet?: Phaser.GameObjects.Text;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd: Record<string, Phaser.Input.Keyboard.Key>;
  private target: Phaser.Math.Vector2 | null = null;
  private speed = 230;

  constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string, name: string) {
    this.shadow = scene.add.image(x, y + 18, 'shadow').setDepth(4);
    this.sprite = scene.physics.add.sprite(x, y, textureKey).setDepth(5);
    this.sprite.setCollideWorldBounds(true);
    (this.sprite.body as Phaser.Physics.Arcade.Body).setSize(26, 30).setOffset(7, 12);

    const displayName = hasBadge() ? `⭐ ${name}` : name;
    this.label = scene.add
      .text(x, y - 32, displayName, { fontFamily: 'Trebuchet MS', fontSize: '13px', color: '#eaf2ff' })
      .setOrigin(0.5)
      .setDepth(6);

    const hatEmoji = equippedHatEmoji();
    if (hatEmoji) {
      this.hat = scene.add.text(x, y - 22, hatEmoji, { fontSize: '20px' }).setOrigin(0.5, 1).setDepth(6);
    }
    const petEmoji = equippedPetEmoji();
    if (petEmoji) {
      this.pet = scene.add.text(x - 34, y + 8, petEmoji, { fontSize: '22px' }).setOrigin(0.5).setDepth(5);
    }

    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.wasd = scene.input.keyboard!.addKeys('W,A,S,D') as Record<string, Phaser.Input.Keyboard.Key>;

    // Tap/click to move toward a point.
    scene.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      // Ignore taps on the HUD strip at the very top.
      if (p.worldY < 40) return;
      this.target = new Phaser.Math.Vector2(p.worldX, p.worldY);
    });
  }

  update() {
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) vx -= 1;
    if (this.cursors.right.isDown || this.wasd.D.isDown) vx += 1;
    if (this.cursors.up.isDown || this.wasd.W.isDown) vy -= 1;
    if (this.cursors.down.isDown || this.wasd.S.isDown) vy += 1;

    if (vx !== 0 || vy !== 0) {
      this.target = null; // keyboard overrides tap target
      const v = new Phaser.Math.Vector2(vx, vy).normalize().scale(this.speed);
      body.setVelocity(v.x, v.y);
      if (vx !== 0) this.sprite.setFlipX(vx < 0);
    } else if (this.target) {
      const d = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.target.x, this.target.y);
      if (d < 6) {
        body.setVelocity(0, 0);
        this.target = null;
      } else {
        const ang = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, this.target.x, this.target.y);
        body.setVelocity(Math.cos(ang) * this.speed, Math.sin(ang) * this.speed);
        this.sprite.setFlipX(Math.cos(ang) < 0);
      }
    } else {
      body.setVelocity(0, 0);
    }

    // Keep shadow, name, hat, and pet glued to the sprite.
    this.shadow.setPosition(this.sprite.x, this.sprite.y + 18);
    this.label.setPosition(this.sprite.x, this.sprite.y - 32);
    this.hat?.setPosition(this.sprite.x, this.sprite.y - 18);
    if (this.pet) {
      // Pet trails behind with a gentle chase.
      const behindX = this.sprite.x + (this.sprite.flipX ? 34 : -34);
      this.pet.x = Phaser.Math.Linear(this.pet.x, behindX, 0.08);
      this.pet.y = Phaser.Math.Linear(this.pet.y, this.sprite.y + 8, 0.08);
    }
  }

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }
}
