class Alien {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = this.canvas.width / 2 - 50;
    this.y = this.canvas.height / 2 + 250;
    this.image = new Image();
    this.imageB = new Image();
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
    this.width = this.image.width / 1.5;
    this.height = this.image.height / 1.5;
    this.widthB = this.imageB.width / 1.5;
    this.heightB = this.imageB.height / 1.5;
    // console.log(`We draw the alien!!`);
    this.draw();
  }

  draw() {
    this.ctx.drawImage(
      this.imageB,
      this.x - 10,
      this.y - this.imageB.height / 3,
      this.widthB,
      this.heightB
    );
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(event) {
    //843-1436
    const boundary = this.canvas.getBoundingClientRect();

    if (event.x > boundary.x + 50 && event.x < boundary.right - 50) {
      this.x = event.x - boundary.x - this.width / 2;
    }
    // console.log(boundary);

    // console.log(this.x);
  }

  setInvulnerable() {
    this.invulnerabilityFrames = true;
    let counter = 0;
    let intervalId = setInterval(() => {
      counter++;
      if (counter === 1) {
        counter = 0;
        this.invulnerabilityFrames = false;
        clearInterval(intervalId);
      }
    }, 500);
  }
}
