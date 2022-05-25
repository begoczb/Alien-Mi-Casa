class Background {
  constructor(canvas, ctx, moveSpeed, source) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.y = 0;
    this.moveSpeed = moveSpeed;
    this.image = new Image();
    this.whichBg = source;
    this.init();
  }
  init() {
    if (this.whichBg === 1) {
      this.image.src = "./src/images/sky_background.png";
    } else if (this.whichBg === 2) {
      this.image.src = "./src/images/sky_background_front.png";
    }

    this.draw();
  }

  draw(time) {
    // console.log(`Background??`);

    if (time === 170) {
      if (this.whichBg === 1) {
        this.image.src = "./src/images/background_space_placeholder.jpg";
      } else if (this.whichBg === 2) {
        this.image.src = "./src/images/space_debris_placeholder.png";
      }
    }
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
