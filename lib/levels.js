import Brick from './brick';


function level1(ctx) {
  let xPos = 25;
  let yPos = 50;
  const bricks = [];
  const colors = ['teal', 'red', 'yellow', 'blue', 'green'];

  for (let row = 0; row < 1; row++) {
    for (let col = 0; col < 1; col++) {
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
  const colors = [
    'red', 'yellow', 'orange', 'blue', 'pink', 'green', 'purple'
  ];

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

function level3(ctx) {
  let xPos = 0;
  let yPos = 25;
  const bricks = [];
  const colors = ['red', 'purple', 'green'];

  for (let row = 0; row < 12; row++) {
    yPos += 25;
    xPos = 0;
    if (row % 2 !== 0) continue;

    for (let col = 0; col < 14; col++) {
      let color = colors[row % 3];
      if (row % 4 === 0) color = 'teal';
      const brick = new Brick(xPos, yPos, color, ctx);
      bricks.push(brick);
      xPos += 50;
    }
  }

  return bricks;
}

function level4(ctx) {
  let xPos = 25;
  let yPos = 25;
  const bricks = [];

  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 13; col++) {

      if (col === 6) {
        xPos += 50;
        continue;
      }

      let color;
      if (row === 0 || row === 12 ||
        col === 0 || col === 12 || col === 5 || col === 7) {
        color = 'teal';
      } else {
        color = 'red';
      }
      const brick = new Brick(xPos, yPos, color, ctx);
      bricks.push(brick);
      xPos += 50;
    }

    yPos += 25;
    xPos = 25;
  }

  return bricks;
}

const levels = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
};

export default levels;
