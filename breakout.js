import Game from './lib/game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  canvas.height = 600;
  canvas.width = 670;
  const ctx = canvas.getContext('2d');

  const game = new Game(ctx);
  game.populateBricks();
});
