export default class Bullet {
  constructor(player) {
    (this.startingX = player.x), // this is to keep track of each bullet starting position
      (this.startingY = player.y),
      (this.x = player.x),
      (this.y = player.y),
      (this.width = 10),
      (this.height = 10),
      (this.speed = 5),
      (this.distX = 0),
      (this.distY = 0),
      (this.bulletMoveRatioX = 1),
      (this.bulletMoveRatioY = 1),
      (this.delete = false),
      (this.index = 0),
      (this.shouldMove = true);
  }
  clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  moveBullet(mouseX, mouseY) {
    /*
    Get the distance of how much along each coordinate the bullet will move
    */
    this.distX = Math.abs(mouseX - this.startingX);
    this.distY = Math.abs(mouseY - this.startingY);

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
    if (this.x > mouseX) {
      this.x -= this.speed * this.bulletMoveRatioX;
    }

    if (this.x < mouseX) {
      this.x += this.speed * this.bulletMoveRatioX;
    }

    if (this.y > mouseY) {
      this.y -= this.speed * this.bulletMoveRatioY;
    }

    if (this.y < mouseY) {
      this.y += this.speed * this.bulletMoveRatioY;
    }

    if (
      this.x > mouseX - 20 &&
      this.x < mouseX + 20 &&
      this.y > mouseY - 20 &&
      this.y < mouseY + 20
    ) {
      this.delete = true;
    }
    console.log(
      this.x > mouseX - 20 &&
        this.x < mouseX + 20 &&
        this.y > mouseY - 20 &&
        this.y < mouseY + 20
    );
    console.log("BMR X: " + this.bulletMoveRatioX);
    console.log("BMR Y: " + this.bulletMoveRatioY);
    console.log("X Diff: " + (this.x - mouseX));
    console.log("Y Diff: " + (this.y - mouseY));
    
  }

  draw(ctx, bulletSprite) {
    ctx.drawImage(bulletSprite, this.x, this.y, this.width, this.height);
  }
}
