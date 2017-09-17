import Brick from './brick';
import Paddle from './paddle';
import Ball from './ball';
import GameView from './game_view';
import levels from './levels';
import Powerup from './powerup';


class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bricks = [];
    this.powerups = [];
    this.score = 0;
    this.lives = 99;
    this.level = 1;
    this.impactSound = new Audio;
    this.destroySound = new Audio;
    this.gameView = new GameView(this, ctx);
    this.step = this.step.bind(this);
    this.start = this.start.bind(this);
    this.setupGame();
  }

  setupGame() {
    this.addPaddle();
    this.addBall();
    this.populateBricks();
    this.setScoreAndLives();
    this.setupSounds();
  }

  allObjects() {
    const objects = this.bricks.concat(this.paddle, this.ball, this.powerups);
    return objects;
  }

  addBall() {
    const ballOptions = {
      "pos": [this.paddle.xPos + this.paddle.width / 2, 420],
      "vel": [0, 2],
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
    this.bricks = levels[this.level](this.ctx);
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
    this.powerups.forEach((powerup) => powerup.move(timeDelta));
  }

  checkBallCollisions() {
    const gameObjects = this.allObjects();

    for (let i = 0; i < gameObjects.length - 1; i++) {
      const gameObject = gameObjects[i];
      if (this.ball.isCollidedWith(gameObject)) {

        if (gameObject instanceof Brick) {
          this.ball.collideWith(gameObject);
          this.removeBrick(gameObject);
        } else if (gameObject instanceof Paddle){
          this.ball.collideWithPaddle(gameObject);
          this.impactSound.play();
        }

        break;
      }
    }
  }

  checkPowerupCollisions() {
    for (let i = 0; i < this.powerups.length; i++) {
      const powerup = this.powerups[i];

      if (this.isOutOfBounds(powerup)) this.powerups.splice(i, 1);

      if (powerup.isCollidedWith(this.paddle)) {
        powerup.activate();
        this.powerups.splice(i, 1);
      }
    }
  }

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkBallCollisions();
    this.checkPowerupCollisions();

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
    this.destroySound.play();
    if (brick.takeHit()) {
      const index = this.bricks.indexOf(brick);
      this.bricks.splice(index, 1);
      this.updateScore();
      if (Math.random() < 0.25) this.spawnPowerup(brick);
    }
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

  spawnPowerup(brick) {
    this.powerups.push(new Powerup(brick, this, this.ctx));
  }

  expandPaddle() {
    this.paddle.expand();
  }

  nextLevel() {
    this.level += 1;
    this.populateBricks();
    this.addBall();
  }

  lost() {
    return this.isOutOfBounds(this.ball) && this.lives === 0;
  }

  won() {
    if (this.bricks.length !== 0) return false;
    if (this.level < 4) {
      this.nextLevel();
      return false;
    }
    return true;
  }

  over() {
    return this.lost() || this.won();
  }

  start() {
    this.gameView.start();
  }

}

export default Game;
