import Vector2 from "./vector2.js";

export default class Bullet {
  constructor(player, image) {
    (this.startingX = player.pos.x), // this is to keep track of each bullet starting position
      (this.startingY = player.pos.y),
      (this.pos = new Vector2(player.pos.x, player.pos.y)),
      (this.width = 10),
      (this.height = 10),
      (this.speed = 5),
      (this.distX = 0),
      (this.distY = 0),
      (this.bulletMoveRatioX = 1),
      (this.bulletMoveRatioY = 1),
      (this.delete = false),
      (this.index = 0),
      (this.shouldMove = true),
      (this.bulletSprite = new Image()),
      (this.bulletSprite.src = image);
    (this.prevMouseX = 0), (this.prevMouseY = 0);
    (this.moveDestX = 0), (this.moveDestY = 0);
    this.moved = false;
  }

  clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  moveBullet(mouseX, mouseY) {
    if (!this.moved) {
      this.moveDestX = mouseX;
      this.moveDestY = mouseY;
      this.moved = true;
    }
    /*
    Get the distance of how much along each coordinate the bullet will move
    */
    this.distX = Math.abs(this.moveDestX - this.startingX);
    this.distY = Math.abs(this.moveDestY - this.startingY);

    // console.log("X : " + this.distX);
    // console.log("Y : " + this.distY);

    if (this.distY !== 0 && this.distX !== 0) {
      this.bulletMoveRatioX = this.distX / this.distY;
      if (this.bulletMoveRatioX > 1) {
        this.bulletMoveRatioY = 1;
        this.bulletMoveRatioX = this.clamp(this.bulletMoveRatioX, 1, 4); // if it will travel more on one coordinate rather than the other
      } else if (this.bulletMoveRatioX < 1) {
        // then we clamp its value between 1 and 4 so that difference is not too big
        this.bulletMoveRatioY = this.clamp(1 / this.bulletMoveRatioX, 1, 4); // or we will not see bullet move
        this.bulletMoveRatioX = 1;
      } else {
        this.bulletMoveRatioY = 1;
      }
    } else if (this.distX === 0 && this.distY !== 0) {
      // an if any of them is 0 we just wanna move than along other coordinate with fixed value of 1
      this.bulletMoveRatioY = 1;
    } else if (this.distY === 0 && this.distX !== 0) {
      this.bulletMoveRatioX = 1;
    }

    // actual movement code
    if (this.pos.x > this.moveDestX) {
      this.pos.x -= this.speed * this.bulletMoveRatioX;
    }

    if (this.pos.x < this.moveDestX) {
      this.pos.x += this.speed * this.bulletMoveRatioX;
    }

    if (this.pos.y > this.moveDestY) {
      this.pos.y -= this.speed * this.bulletMoveRatioY;
    }

    if (this.pos.y < this.moveDestY) {
      this.pos.y += this.speed * this.bulletMoveRatioY;
    }

    if (
      this.pos.x > this.moveDestX - 20 &&
      this.pos.x < this.moveDestX + 20 &&
      this.pos.y > this.moveDestY - 20 &&
      this.pos.y < this.moveDestY + 20
    ) {
      this.delete = true;
    }
    // console.log(
    //   this.pos.x > this.moveDestX - 20 &&
    //     this.pos.x < this.moveDestX + 20 &&
    //     this.pos.y > this.moveDestY - 20 &&
    //     this.pos.y < this.moveDestY + 20
    // );
    // console.log("BMR X: " + this.bulletMoveRatioX);
    // console.log("BMR Y: " + this.bulletMoveRatioY);
    // console.log("X Diff: " + (this.pos.x - this.moveDestX));
    // console.log("Y Diff: " + (this.pos.y - this.moveDestY));
  }

  draw(ctx) {
    ctx.drawImage(
      this.bulletSprite,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
}
