import MovingObject from './moving_object';

class Paddle extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "../assets/paddle.png";
    this.ctx = ctx;
    this.image.onload = this.draw;
  }

  move(timeDelta = 1) {
    this.xPos += this.xVel * (timeDelta / 20);
    this.yPos += this.yVel * (timeDelta / 20);

    if ((this.xPos + this.width) > 700) {
      this.xPos = 700 - this.width;
    } else if (this.xPos < 0) {
      this.xPos = 0;
    }
  }

}

export default Paddle;
