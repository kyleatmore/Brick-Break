import MovingObject from './moving_object';

class Powerup extends MovingObject {
  constructor(brick, game, ctx, type, imageFile) {
    const options = {
      "pos": [
        brick.xPos + brick.width / 2, brick.yPos + brick.height / 2
      ],
      "vel": [0, 2],
      "width": 15,
      "height": 15,
      "game": game,
    };
    super(options);
    this.type = type;
    this.image = new Image;
    this.image.src = imageFile;
    this.ctx = ctx;
    this.image.onload = this.draw;
  }

  collideWithPaddle(paddle) {
    this.clear();
    this.activate();
  }

  // activate() {
  //   this.game.expandPaddle();
  // }

  activate() {
    switch(this.type) {
      case 'expand':
        this.game.expandPaddle();
        break;
      case 'slow':
        this.game.slowBall();
        break;
      default:
        break;
    }
  }
}

const POWERUPS = ['expand', 'slow'];

const POWERUPIMAGES = {
  'expand': "./assets/images/expand_powerup.png",
  'slow': "./assets/images/slow_powerup.png",
};

const randomPowerup = function(brick, game, ctx) {
  const powerup = POWERUPS[Math.floor(Math.random() * POWERUPS.length)];
  const imageFile = POWERUPIMAGES[powerup];
  return new Powerup(brick, game, ctx, powerup, imageFile);
};

export default randomPowerup;
