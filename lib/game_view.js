class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    setInterval(this.game.moveBall, 20);
  }
}

export default GameView;
