class Obstacle {
  constructor(canvas, ctx, moveSpeed, source) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.moveSpeed = moveSpeed;
    this.image = new Image();
    this.width = null;
    this.height = null;
    this.x =
      Math.floor(Math.random() * this.canvas.width - this.image.width) + 50;
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
    if (this.image.src.includes("first")) {
      this.image.src = `./src/images/second_birb_left.png`;
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else if (this.image.src.includes("second")) {
      this.image.src = `./src/images/first_birb_left.png`;
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else if (this.image.src.includes("asteroid")) {
      this.drawRotate();
    } else {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  drawRotate() {
    this.ctx.save();
    // this.ctx.clearRect(0, 0, 200, 200);
    this.ctx.translate(100, 100); // to get it in the origin
    this.rotation += 1;
    this.ctx.rotate((this.rotation * Math.PI) / 64); //rotate in origin
    this.ctx.translate(-100, -100); //put it back
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }

  move() {
    if (this.source.includes("asteroid")) {
      this.y += this.moveSpeed * 2;
      this.x -= this.moveSpeed / 2;
    } else if (this.source.includes("plane")) {
      this.y += this.moveSpeed * 1.5;
      this.x += this.moveSpeed * 0.5;
    } else if (this.source.includes("left")) {
      this.y += this.moveSpeed;
      this.x -= this.moveSpeed * 0.2;
    } else {
      this.y += this.moveSpeed;
    }
  }
}
