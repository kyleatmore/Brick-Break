class MovingObject {
  constructor(options) {
    this.xPos = options["pos"][0];
    this.yPos = options["pos"][1];
    this.xVel = options["vel"][0];
    this.yVel = options["vel"][1];
    this.speed = Math.sqrt(Math.pow(this.xVel, 2) + Math.pow(this.yVel, 2));
    this.width = options["width"];
    this.height = options["height"];
    this.game = options["game"];
    this.draw = this.draw.bind(this);
  }

  draw() {
    this.ctx.drawImage(
      this.image, this.xPos, this.yPos, this.width, this.height
    );
  }

  move(timeDelta = 1) {
    this.xPos += this.xVel * (timeDelta / 20);
    this.yPos += this.yVel * (timeDelta / 20);
    if (this.game.isOutOfBounds(this)) {
      this.clear();
    }
  }

  clear() {
    this.ctx.clearRect(
      this.xPos, this.yPos, this.width, this.height
    );
  }

  isCollidedWith(otherObject) {
    if (
      (this.xPos + this.width) < otherObject.xPos ||
      this.xPos > (otherObject.xPos + otherObject.width) ||
      (this.yPos + this.height) < otherObject.yPos ||
      this.yPos > (otherObject.yPos + otherObject.height)
    ) {
      return false;
    }

    return true;
  }

}

export default MovingObject;
