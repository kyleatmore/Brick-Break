import MovingObject from './moving_object';

class Ball extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "../assets/ball.png";
    this.ctx = ctx;
    this.image.onload = this.draw;
    // this.isCollidedWith = this.isCollidedWith.bind(this);
    // this.collideWith = this.collideWith.bind(this);
  }

  bounce() {
    if ((this.yPos + this.height) >= 600 || this.yPos <= 0) {
      this.yVel = -this.yVel;
    } else if ((this.xPos + this.width) >= 700 || this.xPos <= 0) {
      this.xVel = -this.xVel;
    }
  }

  bounceX() {
    this.xVel = -this.xVel;
  }

  bounceY() {
    this.yVel = -this.yVel;
  }

  isCollidedWith(otherObject) {
    if (
      (this.xPos + this.width) < otherObject.xPos ||
      this.xPos > (otherObject.xPos + otherObject.width) ||
      (this.yPos + this.height) < otherObject.yPos ||
      this.yPos > (otherObject.yPos + otherObject.height)
    ) {
      return false;
    }

    return true;
  }

  collideWith(otherObject) {
    if (
      (this.xPos + this.width) <= otherObject.xPos ||
      this.xPos >= (otherObject.xPos + otherObject.width)
    ) {
      this.bounceX();
    } else {
      this.bounceY();
    }
  }

}

export default Ball;
