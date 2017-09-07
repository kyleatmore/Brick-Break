import Brick from './brick';
import Paddle from './paddle';
import Ball from './ball';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bricks = [];
    this.colors = ['orange', 'red', 'yellow', 'blue', 'green'];
    this.paddle = new Paddle(ctx);
    this.ball = new Ball(ctx);
    this.populateBricks();
    this.paddle.render();
    this.ball.render();
  }

  populateBricks() {
    let xPos = 25;
    let yPos = 50;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 13; col++) {
        const brick = new Brick(xPos, yPos, 1, this.colors[row], this.ctx);
        this.bricks.push(brick);
        brick.render();
        xPos += 50;
      }

      yPos += 25;
      xPos = 25;
    }
  }

}

export default Game;
