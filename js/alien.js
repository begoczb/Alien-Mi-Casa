class Alien {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = this.canvas.width / 2 - 50;
    this.y = this.canvas.height / 2 + 100;
    this.image = new Image();
    this.width = 100;
    this.height = 200;
    this.init();
  }

  init() {
    this.image.src = "./src/images/alien_placeholder.png";
    console.log(`We draw the alien!!`);
    this.draw();
  }

  draw() {
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
}
