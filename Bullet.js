export default class Bullet {
  constructor(player) {
    (this.x = player.x),
      (this.y = player.y),
      (this.width = 12),
      (this.height = 6),
      (this.speed = 20),
      (this.distX = 0),
      (this.distY = 0),
      (this.bulletMoveRatio = 0.0);
  }

  moveBullet(mouseX, mouseY) {
    this.distX = Math.abs(mouseX - this.x);
    this.distY = Math.abs(mouseY - this.y);
    if (this.distY !== 0 && this.distX !== 0)
      this.bulletMoveRatio = this.distX / this.distY;
    else this.bulletMoveRatio = 1;

    if (this.x > mouseX) {
      this.x -= this.speed * this.bulletMoveRatio;
    }

    if (this.x < mouseX) {
      this.x += this.speed * this.bulletMoveRatio;
    }

    if (this.y > mouseY) {
      this.y -= this.speed;
    }

    if (this.y < mouseY) {
      this.y += this.speed;
    }
  }

  draw(ctx, bulletSprite) {
    ctx.drawImage(bulletSprite, this.x, this.y, this.width, this.height);
  }
}
