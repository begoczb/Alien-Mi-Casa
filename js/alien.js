class Alien {
  constructor(canvas, ctx, image, imageB) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = this.canvas.width / 2 - 50;
    this.y = this.canvas.height / 2 + 250;
    this.image = image;
    this.imageB = imageB;
    this.width = null;
    this.height = null;
    this.widthB = null;
    this.heightB = null;
    this.invulnerabilityFrames = false;

    this.init();
  }

  init() {
    this.image.src = "./src/images/alien.png";
    this.imageB.src = "./src/images/balloons.png";
    this.image.addEventListener("load", () => {
      this.image.loaded = true;
      this.width = this.image.width / 1.5;
      this.height = this.image.height / 1.5;
    });
    this.imageB.addEventListener("load", () => {
      this.imageB.loaded = true;
      this.widthB = this.imageB.width / 1.5;
      this.heightB = this.imageB.height / 1.5;
    });
  }

  draw() {
    if (this.image.loaded && this.imageB.loaded) {
      if (this.invulnerabilityFrames) {
        if (myGame.balloons === 5) {
          this.imageB.src = "./src/images/balloons_invulnerable.png";
        } else if (myGame.balloons === 4) {
          this.imageB.src = "./src/images/balloons_4_invulnerable.png";
        } else if (myGame.balloons === 3) {
          this.imageB.src = "./src/images/balloons_3_invulnerable.png";
        } else if (myGame.balloons === 2) {
          this.imageB.src = "./src/images/balloons_2_invulnerable.png";
        } else {
          this.imageB.src = "./src/images/balloons_1_invulnerable.png";
        }

        this.ctx.drawImage(
          this.imageB,
          this.x - 20,
          this.y - this.imageB.height / 3,
          this.widthB,
          this.heightB
        );

        this.image.src = "./src/images/alien_invulnerable.png";
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        if (myGame.balloons === 5) {
          this.imageB.src = "./src/images/balloons.png";
        } else if (myGame.balloons === 4) {
          this.imageB.src = "./src/images/balloons_4.png";
        } else if (myGame.balloons === 3) {
          this.imageB.src = "./src/images/balloons_3.png";
        } else if (myGame.balloons === 2) {
          this.imageB.src = "./src/images/balloons_2.png";
        } else {
          this.imageB.src = "./src/images/balloons_1.png";
        }

        this.ctx.drawImage(
          this.imageB,
          this.x - 20,
          this.y - this.imageB.height / 3,
          this.widthB,
          this.heightB
        );

        this.image.src = "./src/images/alien.png";
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }
  }

  move(event) {
    //843-1436
    const boundary = this.canvas.getBoundingClientRect();

    if (event.x > boundary.x + 50 && event.x < boundary.right - 50) {
      this.x = event.x - boundary.x - this.width / 2;
    }
  }

  setInvulnerable() {
    this.invulnerabilityFrames = true;
    let counter = 0;
    let intervalId = setInterval(() => {
      counter++;
      if (counter === 2) {
        counter = 0;
        this.invulnerabilityFrames = false;
        clearInterval(intervalId);
      }
    }, 500);
  }
}
