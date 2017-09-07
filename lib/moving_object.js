class MovingObject {
  constructor(options) {
    this.pos = options["pos"];
    this.vel = options["vel"];
    this.width = options["width"];
    this.height = options["height"];
    this.image = options["image"];
  }

  draw(ctx) {
    ctx.drawImage(
      this.image, this.xPos, this.yPos, this.width, this.height
    );
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
}

export default MovingObject;
