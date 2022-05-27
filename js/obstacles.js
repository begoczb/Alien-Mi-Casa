class Obstacle {
  constructor(canvas, ctx, moveSpeed, source, flipped) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.moveSpeed = moveSpeed;
    this.image = new Image();
    this.width = null;
    this.height = null;
    this.x =
      Math.floor(Math.random() * this.canvas.width - this.image.width) + 50;
    this.y = 0;
    this.y2 = this.canvas.height;
    this.source = source;
    this.angle = 0;
    this.rotation = 2.5;
    this.flipped = flipped;
    // this.init();
  }

  init() {
    this.image.src = `${this.source}`;

    this.image.addEventListener("load", () => this.load());
  }

  load() {
    if (this.image.src.includes("astronaut")) {
      this.width = this.image.width / 3;
      this.height = this.image.height / 3;
    } else if (this.image.src.includes("rocket")) {
      this.width = this.image.width / 1.5;
      this.height = this.image.height / 1.5;
    } else {
      this.width = this.image.width;
      this.height = this.image.height;
    }
    this.image.removeEventListener("load", this.load, true);
    // this.draw();
  }

  draw() {
    if (this.image.src.includes("first")) {
      if (this.image.src.includes("yellow")) {
        this.image.src = "./src/images/second_yellow_birb_left.png";
        if (this.flipped === 0) {
          this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
          );
        } else {
          this.drawFlipped();
        }
      } else if (this.image.src.includes("pink")) {
        this.image.src = "./src/images/second_pink_birb_left.png";
        if (this.flipped === 0) {
          this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
          );
        } else {
          this.drawFlipped();
        }
      } else if (this.image.src.includes("rocket")) {
        this.image.src = `./src/images/second_rocket.png`;
        this.ctx.drawImage(
          this.image,
          this.x,
          this.y2,
          this.width,
          this.height
        );
      } else {
        this.image.src = `./src/images/second_birb_left.png`;
        if (this.flipped === 0) {
          this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
          );
        } else {
          this.drawFlipped();
        }
      }
    } else if (this.image.src.includes("second")) {
      if (this.image.src.includes("yellow")) {
        this.image.src = "./src/images/first_yellow_birb_left.png";
        if (this.flipped === 0) {
          this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
          );
        } else {
          this.drawFlipped();
        }
      } else if (this.image.src.includes("pink")) {
        this.image.src = "./src/images/first_pink_birb_left.png";
        if (this.flipped === 0) {
          this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
          );
        } else {
          this.drawFlipped();
        }
      } else if (this.image.src.includes("rocket")) {
        this.image.src = `./src/images/first_rocket.png`;
        this.ctx.drawImage(
          this.image,
          this.x,
          this.y2,
          this.width,
          this.height
        );
      } else {
        this.image.src = `./src/images/first_birb_left.png`;
        if (this.flipped === 0) {
          this.ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
          );
        } else {
          this.drawFlipped();
        }
      }
    } else if (
      this.image.src.includes("asteroid") ||
      this.image.src.includes("astronaut")
    ) {
      this.drawRotate();
    } else if (this.image.src.includes("rocket")) {
      this.draw();
    } else {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  drawFlipped() {
    this.ctx.translate(this.x + this.image.width, this.y);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawRotate() {
    this.angle += this.rotation;

    this.ctx.save();
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate((this.angle * Math.PI) / 180);
    this.ctx.drawImage(
      this.image,
      (this.width / 2) * -1,
      (this.height / 2) * -1,
      this.width,
      this.height
    );
    this.ctx.restore();
  }

  move() {
    if (this.source.includes("asteroid")) {
      this.y += this.moveSpeed * 2;
      this.x -= this.moveSpeed / 2;
    } else if (this.source.includes("astronaut")) {
      this.y += this.moveSpeed * 0.5;
    } else if (this.source.includes("plane")) {
      this.y += this.moveSpeed * 1.5;
      this.x += this.moveSpeed * 0.5;
    } else if (this.source.includes("birb")) {
      this.y += this.moveSpeed;
      if (this.flipped === 0) {
        this.x -= this.moveSpeed * 0.2;
      } else {
        this.x += this.moveSpeed * 0.2;
      }
    } else if (this.source.includes("rocket")) {
      this.y2 -= this.moveSpeed;
      this.x -= this.moveSpeed * 0.2;
    } else {
      this.y += this.moveSpeed;
    }
  }
}
