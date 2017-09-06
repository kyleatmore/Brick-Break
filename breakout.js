import Brick from './lib/brick';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  canvas.height = 600;
  canvas.width = 1000;
  const ctx = canvas.getContext('2d');

  const brick = new Brick(10, 10, 1, 'red');
  brick.render(ctx);
});
