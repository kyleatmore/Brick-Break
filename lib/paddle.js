import MovingObject from './moving_object';

class Paddle extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "../assets/paddle.png";
    this.ctx = ctx;
    this.image.onload = this.draw;
  }

}

export default Paddle;
