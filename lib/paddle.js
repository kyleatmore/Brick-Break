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
    this.laserMode = false;
    this.returnToNormalSize = this.returnToNormalSize.bind(this);
    this.returnToRegularMode = this.returnToRegularMode.bind(this);
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
    this.laserMode = false;
    this.image.src = "./assets/images/long_paddle.png";
    this.width = 125;
    setTimeout(this.returnToNormalSize, 10000);
  }

  returnToNormalSize() {
    this.image.src = "./assets/images/paddle.png";
    this.width = 100;
  }

  enterLaserMode() {
    this.laserMode = true;
    this.image.src = "./assets/images/laser_paddle.png";
    setTimeout(this.returnToRegularMode, 10000);
  }

  returnToRegularMode() {
    this.laserMode = false;
    this.image.src = "./assets/images/paddle.png";
  }

  fireLaser() {
    if (this.laserMode) {
      const lasers = fireLasers(this, this.game, this.ctx);
      this.game.addLaser(lasers);
    }
  }

}

export default Paddle;
