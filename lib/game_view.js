class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = null;
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
    } else if (e.code === 'ArrowLeft') {
      this.game.paddle.xVel = -10;
    }
  }

  stopPaddle(e) {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
      this.game.paddle.xVel = 0;
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
    const playAgainElement = document.getElementById('play-again');
    const finalScore = document.getElementById('final-score');

    messageElement.textContent = message;
    finalScore.textContent = this.game.score;
    playAgainElement.className = "";
  }
}

export default GameView;
