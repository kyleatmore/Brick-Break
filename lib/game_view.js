class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = null;
    this.moves = { "left": false, "right": false };
    this.movePaddle = this.movePaddle.bind(this);
    this.stopPaddle = this.stopPaddle.bind(this);
    this.animate = this.animate.bind(this);
  }

  start() {
    document.addEventListener("keydown", this.movePaddle);
    document.addEventListener("keyup", this.stopPaddle);
    requestAnimationFrame(this.animate);
  }

  movePaddle(e) {
    if (e.code === 'ArrowRight') {
      this.game.paddle.xVel = 10;
      this.moves["right"] = true;
    } else if (e.code === 'ArrowLeft') {
      this.game.paddle.xVel = -10;
      this.moves["left"] = true;
    }
  }

  stopPaddle(e) {
    if (e.code === 'ArrowRight') {
      this.moves["right"] = false;
    } else if (e.code === 'ArrowLeft') {
      this.moves["left"] = false;
    }

    if (this.moves["right"] === false && this.moves["left"] === false) {
      this.game.paddle.xVel = 0;
    } else if (this.moves["right"] === true) {
      this.game.paddle.xVel = 10;
    } else {
      this.game.paddle.xVel = -10;
    }
  }

  animate(currentTime) {
    if (!this.lastTime) this.lastTime = currentTime;
    const delta = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (this.game.over()) {
      this.end();
    } else {
      this.game.step(delta);
      requestAnimationFrame(this.animate);
    }
  }

  end() {
    if (this.game.won()) {
      this.promptPlayAgain("You Win!");
    } else {
      this.promptPlayAgain("Game Over!");
    }
  }

  promptPlayAgain(message) {
    const messageElement = document.getElementById('play-again message');
    const playAgainElement = document.getElementsByClassName('play-again')[0];
    const finalScore = document.getElementById('final-score');

    messageElement.textContent = message;
    finalScore.textContent = this.game.score;
    playAgainElement.className = 'play-again';
  }

  toggleSound() {

  }
}

export default GameView;
