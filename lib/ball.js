import MovingObject from './moving_object';

class Ball extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "./assets/images/ball.png";
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
    this.speed = this.reboundSpeed(paddle);
    this.xVel = this.speed * Math.cos(newAngle);
    this.yVel = -this.speed * Math.sin(newAngle);
  }

  paddleCollisionPoint(paddle) {
    const hitPoint = this.xPos + (this.width / 2);
    return (hitPoint - paddle.xPos) / paddle.width;
  }

  reboundAngle(paddle) {
    const angle = 150 - 120 * this.paddleCollisionPoint(paddle);
    return angle * (Math.PI / 180);
  }

  reboundSpeed(paddle) {
    const collisionPoint = this.paddleCollisionPoint(paddle);

    if (collisionPoint <= 0.5) {
      return 8 - 6 * collisionPoint;
    } else {
      return 6 * collisionPoint + 2;
    }
  }

}

export default Ball;
