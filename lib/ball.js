import MovingObject from './moving_object';

class Ball extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "../assets/ball.png";
    this.degree = 90 * (Math.PI / 180);
    this.ctx = ctx;
    this.image.onload = this.draw;
  }

  bounce() {
    if (this.yPos <= 0) {
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

  collideWithPaddle(paddle) {
    const newAngle = this.reboundAngle(paddle);
    this.xVel = this.speed * Math.cos(newAngle);
    this.yVel = -this.speed * Math.sin(newAngle);
  }

  reboundAngle(paddle) {
    const hitPoint = this.xPos + (this.width / 2);
    const paddleWidthFraction = (hitPoint - paddle.xPos) / paddle.width;
    const angle = 150 - 120 * paddleWidthFraction;
    return angle * (Math.PI / 180);
  }

}

export default Ball;
