class Background {
  constructor(canvas, ctx, moveSpeed, source) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.y = 0;
    this.moveSpeed = moveSpeed;
    this.image = new Image();
    this.whichBg = source;
    this.imageB = new Image();
    this.init();
  }
  init() {
    if (this.whichBg === 1) {
      this.image.src = "./src/images/sky_background.png";
      this.imageB.src = "./src/images/sky_background.png";
    } else if (this.whichBg === 2) {
      this.image.src = "./src/images/sky_background_front.png";
      this.imageB.src = "./src/images/sky_background_front.png";
    }

    this.draw();
  }

  draw(time) {
    if (this.y === this.canvas.height && this.image.src.includes("sky")) {
      if (time < 130) {
        if (this.whichBg === 1) {
          this.image.src = "./src/images/transition_background.png";
          this.imageB.src = "./src/images/space_background.png";
        } else if (this.whichBg === 2) {
          this.imageB.src = "./src/images/space_debris_front.png";
          this.image.src = "./src/images/space_debris_front.png";
        }
      }
    }

    if (this.image.src.includes("transition") && this.y === 685) {
      if (this.whichBg === 1) {
        this.imageB.src = "./src/images/space_background.png";
      } else if (this.whichBg === 2) {
        this.imageB.src = "./src/images/space_debris_front.png";
      }
    }

    if (this.imageB.src.includes("space") && this.y === 685) {
      if (this.whichBg === 1) {
        this.image.src = "./src/images/space_background.png";
      } else if (this.whichBg === 2) {
        this.image.src = "./src/images/space_debris_front.png";
      }
    }
    this.ctx.drawImage(
      this.image,
      0,
      this.y,
      this.canvas.width,
      this.canvas.height
    );
    {
      this.ctx.drawImage(
        this.imageB,
        0,
        this.y - this.canvas.height,
        canvas.width,
        canvas.height
      );
    }
  }

  scroll() {
    if (this.y >= this.canvas.height) {
      this.y = 0;
    }
    this.y += this.moveSpeed;
  }
}
