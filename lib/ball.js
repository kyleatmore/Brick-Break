import MovingObject from './moving_object';

class Ball extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "../assets/ball.png";
    this.ctx = ctx;
    this.image.onload = this.draw;
  }

}

export default Ball;
