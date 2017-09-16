import Brick from './brick';
import Paddle from './paddle';
import Ball from './ball';
import GameView from './game_view';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bricks = [];
    this.colors = ['teal', 'red', 'yellow', 'blue', 'green'];
    this.score = 0;
    this.lives = 3;
    this.impactSound = new Audio;
    this.destroySound = new Audio;
    this.gameView = new GameView(this, ctx);
    this.step = this.step.bind(this);
    this.start = this.start.bind(this);
    this.setupGame();
  }

  setupGame() {
    this.addBall();
    this.addPaddle();
    this.populateBricks();
    this.setScoreAndLives();
    this.setupSounds();
  }

  allObjects() {
    const objects = this.bricks.concat(this.paddle, this.ball);
    return objects;
  }

  addBall() {
    const ballOptions = {
      "pos": [65, 300],
      "vel": [0, 3],
      "width": 19,
      "height": 19,
      "game": this,
    };
    this.ball = new Ball(ballOptions, this.ctx);
  }

  addPaddle() {
    const paddleOptions = {
      "pos": [30, 525],
      "vel": [0, 0],
      "width": 100,
      "height": 19,
      "game": this,
    };
    this.paddle = new Paddle(paddleOptions, this.ctx);
  }

  populateBricks() {
    let xPos = 25;
    let yPos = 50;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 13; col++) {
        const brick = new Brick(xPos, yPos, 1, this.colors[row], this.ctx);
        this.bricks.push(brick);
        xPos += 50;
      }

      yPos += 25;
      xPos = 25;
    }
  }

  setScoreAndLives() {
    const scoreCounter = document.getElementById('score');
    scoreCounter.textContent = this.score;
    const livesElement = document.getElementById('lives');
    livesElement.textContent = `x${this.lives}`;
  }

  setupSounds() {
    this.impactSound.src = "./assets/sounds/paddle_impact.wav";
    this.destroySound.src = "./assets/sounds/brick_break.wav";
    document.body.append(this.impactSound);
    document.body.append(this.destroySound);
  }

  draw() {
    this.ctx.clearRect(0, 0, 700, 600);
    this.allObjects().forEach((object) => object.draw());
  }

  moveObjects(timeDelta) {
    this.ball.move(timeDelta);
    this.paddle.move(timeDelta);
  }

  checkCollisions() {
    const gameObjects = this.allObjects();

    for (let i = 0; i < gameObjects.length - 1; i++) {
      const gameObject = gameObjects[i];
      if (this.ball.isCollidedWith(gameObject)) {

        if (gameObject instanceof Brick) {
          this.ball.collideWith(gameObject);
          this.removeBrick(gameObject);
        } else {
          this.ball.collideWithPaddle(gameObject);
          this.impactSound.play();
        }

        break;
      }
    }
  }

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkCollisions();

    if (this.isOutOfBounds(this.ball) && this.lives > 0) {
      this.respawnBall();
    }

    this.draw();
  }

  respawnBall() {
    this.addBall();
    this.lives -= 1;
    const livesElement = document.getElementById('lives');
    livesElement.textContent = `x${this.lives}`;
  }

  removeBrick(brick) {
    brick.destroy();
    this.destroySound.play();
    const index = this.bricks.indexOf(brick);
    this.bricks.splice(index, 1);
    this.updateScore();
  }

  isOutOfBounds(gameObject) {
    if ((gameObject.yPos) >= 600) {
      return true;
    }

    return false;
  }

  updateScore() {
    this.score += 80;
    const scoreCounter = document.getElementById('score');
    scoreCounter.textContent = this.score;
  }

  lost() {
    return this.isOutOfBounds(this.ball) && this.lives === 0;
  }

  won() {
    return this.bricks.length === 0;
  }

  over() {
    return this.lost() || this.won();
  }

  start() {
    this.gameView.start();
  }

}

export default Game;
