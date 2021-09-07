import Bullet from "./bullet.js";

export default class BulletManager {
  constructor() {
    this.bullets = [];
  }

  shootBullet(player, image) {
    let bullet = new Bullet(player, image);
    this.bullets.push(bullet);
  }
}
