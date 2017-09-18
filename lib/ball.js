import MovingObject from './moving_object';

class Ball extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "./assets/images/ball.png";
    this.degree = 90 * (Math.PI / 180);
    this.ctx = ctx;
    this.lastXPos = this.xPos;
    this.lastYPos = this.yPos;
    this.timeDivisor = 20;
    this.slowTimeout = null;
    this.image.onload = this.draw;
  }

  move(timeDelta = 1) {
    this.lastXPos = this.xPos;
    this.lastYPos = this.yPos;
    this.xPos += this.xVel * (timeDelta / this.timeDivisor);
    this.yPos += this.yVel * (timeDelta / this.timeDivisor);

    this.bounceOffWalls();
    if (this.game.isOutOfBounds(this)) {
      this.clear();
    }
  }

  bounceOffWalls() {
    if (this.yPos <= 0) {
      this.yPos = 0;
      this.yVel = -this.yVel;
    } else if (this.xPos <= 0) {
      this.xPos = 0;
      this.xVel = -this.xVel;
    } else if ((this.xPos + this.width) >= 700) {
      this.xPos = 700 - this.width;
      this.xVel = -this.xVel;
    }
  }

  collideWith(brick) {
    if (this.xPos <= brick.xPos + brick.width &&
        this.lastXPos > brick.xPos + brick.width) {
      this.xVel = Math.abs(this.xVel);
    } else if (this.xPos + this.width >= brick.xPos &&
        this.lastXPos +this.width < brick.xPos) {
      this.xVel = -Math.abs(this.xVel);
    } else if (this.yPos + this.height >= brick.yPos &&
        this.lastYPos + this.height < brick.yPos) {
      this.yVel = -Math.abs(this.yVel);
    } else {
      this.yVel = Math.abs(this.yVel);
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
      return 10 - 6 * collisionPoint;
    } else {
      return 6 * collisionPoint + 4;
    }
  }

  slow() {
    clearTimeout(this.slowTimeout);
    this.timeDivisor = 40;
    this.slowTimeout = setTimeout(() => {
      this.timeDivisor = 20;
    }, 10000);
  }

  stop() {
    this.yVel = 0;
  }

  start() {
    this.yVel = 2;
  }

}

export default Ball;
