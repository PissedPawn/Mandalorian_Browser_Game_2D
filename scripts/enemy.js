import Character from "./character.js";

export default class Enemy extends Character {
  constructor(image, speed, pos) {
    super(image),
      (this.distX = 0),
      (this.pos = pos),
      (this.speed = speed),
      (this.moveDestX = 0),
      (this.startingX = 0),
      (this.distY = 0),
      (this.moveDestY = 0),
      (this.startingY = 0),
      (this.enemyMoveRatioX = 0),
      (this.enemyMoveRatioY = 0);
  }
  clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  moveEnemy(targetX, targetY) {
    this.moveDestX = targetX;
    this.moveDestY = targetY;
    this.distX = Math.abs(this.moveDestX - this.startingX);
    this.distY = Math.abs(this.moveDestY - this.startingY);

    // console.log("X : " + this.distX);
    // console.log("Y : " + this.distY);

    if (this.distY !== 0 && this.distX !== 0) {
      this.enemyMoveRatioX = this.distX / this.distY;
      if (this.enemyMoveRatioX > 1) {
        this.enemyMoveRatioY = 1;
        this.enemyMoveRatioX = this.clamp(this.enemyMoveRatioX, 1, 4); // if it will travel more on one coordinate rather than the other
      } else if (this.enemyMoveRatioX < 1) {
        // then we clamp its value between 1 and 4 so that difference is not too big
        this.enemyMoveRatioY = this.clamp(1 / this.enemyMoveRatioX, 1, 4); // or we will not see enemy move
        this.enemyMoveRatioX = 1;
      } else {
        this.enemyMoveRatioY = 1;
      }
    } else if (this.distX === 0 && this.distY !== 0) {
      // an if any of them is 0 we just wanna move than along other coordinate with fixed value of 1
      this.enemyMoveRatioY = 1;
    } else if (this.distY === 0 && this.distX !== 0) {
      this.enemyMoveRatioX = 1;
    }

    // actual movement code

    if (this.pos.x > this.moveDestX) {
      this.pos.x -= this.speed * this.enemyMoveRatioX; 

      this.moving = true;
    }

    if (this.pos.x < this.moveDestX) {
      this.pos.x += this.speed * this.enemyMoveRatioX;

      this.moving = true;
    }

    if (this.pos.y > this.moveDestY) {
      this.pos.y -= this.speed * this.enemyMoveRatioY;

      this.moving = true;
    }

    if (this.pos.y < this.moveDestY) {
      this.pos.y += this.speed * this.enemyMoveRatioY;

      this.moving = true;
    }

    this.handleCharacterFrame();
  }

  shootAtTarget(target) {}
}
