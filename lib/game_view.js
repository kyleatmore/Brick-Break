class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    setInterval(this.game.step, 20);
  }
}

export default GameView;
