import Brick from './brick';
import Paddle from './paddle';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bricks = [];
    this.colors = ['gray', 'red', 'yellow', 'blue', 'green'];
    this.paddle = new Paddle(this.ctx);
    this.populateBricks();
    this.paddle.render();
  }

  populateBricks() {
    let xPos = 10;
    let yPos = 50;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 13; col++) {
        const brick = new Brick(xPos, yPos, 1, this.colors[row]);
        this.bricks.push(brick);
        brick.render(this.ctx);
        xPos += 50;
      }

      yPos += 15;
      xPos = 10;
    }
  }

}

export default Game;
