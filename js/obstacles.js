class Obstacle {
  constructor(canvas, ctx, moveSpeed, source) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.moveSpeed = moveSpeed;
    this.image = new Image();
    this.width = null;
    this.height = null;
    this.x = Math.floor(Math.random() * this.canvas.width - 100) + 50;
    this.y = 0;
    this.source = source;
    this.init();
  }

  init() {
    this.image.src = `${this.source}`;
    this.width = this.image.width;
    this.height = this.image.height;
    this.draw();
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move() {
    if (this.source.includes("asteroid")) {
      this.y += this.moveSpeed * 2;
      this.x -= this.moveSpeed / 2;
    } else {
      this.y += this.moveSpeed;
    }
  }
}
