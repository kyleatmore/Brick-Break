import MovingObject from './moving_object';

class Ball extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "../assets/ball.png";
    this.ctx = ctx;
    this.image.onload = this.draw;
  }

  bounce() {
    if ((this.yPos + this.height) >= 600 || this.yPos <= 0) {
      this.yVel = -this.yVel;
    } else if ((this.xPos + this.width) >= 700 || this.xPos <= 0) {
      this.xVel = -this.xVel;
    }
  }
}

export default Ball;
