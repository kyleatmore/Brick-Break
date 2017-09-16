import Brick from './brick';


function level1(ctx) {
  let xPos = 25;
  let yPos = 50;
  const bricks = [];
  const colors = ['teal', 'red', 'yellow', 'blue', 'green'];

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 13; col++) {
      const brick = new Brick(xPos, yPos, colors[row], ctx);
      bricks.push(brick);
      xPos += 50;
    }

    yPos += 25;
    xPos = 25;
  }

  return bricks;
}

function level2(ctx) {
  let xPos = 0;
  let yPos = 50;
  const bricks = [];
  const colors = ['red', 'yellow', 'orange',  'blue', 'pink', 'green', 'purple'];

  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < row + 3; col++) {
      let color = colors[col % 7];
      if (row === 11) color = 'teal';
      const brick = new Brick(xPos, yPos, color, ctx);
      bricks.push(brick);
      xPos += 50;
    }

    yPos += 25;
    xPos = 0;
  }

  return bricks;
}

const levels = {
  1: level1,
  2: level2,
};

export default levels;
