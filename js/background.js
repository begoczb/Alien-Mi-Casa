class Background {
  constructor(canvas, ctx, moveSpeed) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.y = 0;
    this.moveSpeed = moveSpeed;
    this.image = new Image();
    this.init();
  }
  init() {
    this.image.src = "./src/images/background-placeholder.jpg";
    console.log(`initilize bg`);
    this.draw();
  }

  draw() {
    // console.log(`Background??`);
    this.ctx.drawImage(
      this.image,
      0,
      this.y,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.drawImage(
      this.image,
      0,
      this.y - this.canvas.height,
      canvas.width,
      canvas.height
    );
  }

  scroll() {
    this.y += this.moveSpeed;
    if (this.y >= this.canvas.height) {
      this.y = 0;
    }
  }
}
