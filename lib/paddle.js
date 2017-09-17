import MovingObject from './moving_object';
import fireLasers from './laser';

class Paddle extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "./assets/images/paddle.png";
    this.ctx = ctx;
    this.image.onload = this.draw;
    this.expand = this.expand.bind(this);
    this.returnToNormalSize = this.returnToNormalSize.bind(this);
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

  expand() {
    this.image.src = "./assets/images/long_paddle.png";
    this.width = 125;
    setTimeout(this.returnToNormalSize, 10000);
  }

  returnToNormalSize() {
    this.image.src = "./assets/images/paddle.png";
    this.width = 100;
  }

  fireLaser() {
    const lasers = fireLasers(this, this.game, this.ctx);
    this.game.addLaser(lasers);
  }

}

export default Paddle;
