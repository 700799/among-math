import Phaser from 'phaser';

// A wandering crewmate bot — pure atmosphere so the ship feels alive like
// Among Us. Bots don't interact with math; they just stroll between points.
export class Bot {
  sprite: Phaser.GameObjects.Image;
  private shadow: Phaser.GameObjects.Image;
  private scene: Phaser.Scene;
  private speed: number;
  private target: Phaser.Math.Vector2;
  private bounds: Phaser.Geom.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number, textureKey: string, bounds: Phaser.Geom.Rectangle) {
    this.scene = scene;
    this.bounds = bounds;
    this.speed = Phaser.Math.Between(40, 70);
    this.shadow = scene.add.image(x, y + 18, 'shadow').setDepth(3).setAlpha(0.6);
    this.sprite = scene.add.image(x, y, textureKey).setDepth(3).setScale(0.85);
    this.target = this.pickTarget();
  }

  private pickTarget(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(
      Phaser.Math.Between(this.bounds.left + 30, this.bounds.right - 30),
      Phaser.Math.Between(this.bounds.top + 30, this.bounds.bottom - 30)
    );
  }

  update(dt: number) {
    const d = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.target.x, this.target.y);
    if (d < 8) {
      this.target = this.pickTarget();
      return;
    }
    const ang = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, this.target.x, this.target.y);
    const step = (this.speed * dt) / 1000;
    this.sprite.x += Math.cos(ang) * step;
    this.sprite.y += Math.sin(ang) * step;
    this.sprite.setFlipX(Math.cos(ang) < 0);
    this.shadow.setPosition(this.sprite.x, this.sprite.y + 18);
    // gentle bob
    this.sprite.y += Math.sin(this.scene.time.now / 180 + this.sprite.x) * 0.15;
  }
}
