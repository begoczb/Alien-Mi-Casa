const skySources = [
  "./src/images/first_birb_left.png",
  // "./src/images/birb_left2.png",
  "./src/images/plane.png",
  "./src/images/asteroid.png",
  // "./src/images/spaceship_placeholder.png",
  // "./src/images/rocket_placeholder.png",
];

const spaceSources = [];

const timerContainer = document.querySelector(".timer-container");

const minDec = document.querySelector(".minDec");
const minUni = document.querySelector(".minUni");
const secDec = document.querySelector(".secDec");
const secUni = document.querySelector(".secUni");
const astronaut = document.querySelector(".astronaut");

//TODO, game lose/win logic
//TIMER, print on top of canvas
//ADD BALLOONS
//DO CheckCOLLISION
//random source for obstacles
//faster over time??!

// console.log(sources[0]);
class Game {
  constructor() {
    //All we need for our game
    this.canvas = null;
    this.ctx = null;
    this.background = null;
    this.obstacles = [];
    this.alien = null;
    this.balloons = 5;
    this.intervalId = null;
    this.counter = 0;
    this.moveSpeed = 5;
    this.gameOver = false;
    this.timer = null;
    this.init();
  }
  init() {
    //We get the canvas and the context of the canvas
    this.canvas = document.querySelector("#canvas");
    // console.log(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    document.querySelector(".start").onclick = () => {
      this.canvas.classList.remove("hidden");
      timerContainer.classList.remove("hidden");
      if (!astronaut.classList.contains("hidden")) {
        astronaut.classList.add("hidden");
      }
      this.startGame();
    };
  }

  startGame() {
    // console.log(`Game started!!`);
    this.timer = new Timer(300);
    //create background
    this.background = new Background(this.canvas, this.ctx, this.moveSpeed);
    //create alien
    this.alien = new Alien(this.canvas, this.ctx);
    this.timer.start(() => this.printTime());

    //draw all function
    this.drawAll();
    //addEventListeners

    this.canvas.addEventListener("mousemove", (event) => {
      this.alien.move(event);
      //   console.log(event);
    });
  }

  reset() {
    //reset canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawAll() {
    this.reset();

    this.background.draw(this.timer.currentTime);

    this.background.scroll();

    this.alien.draw();

    if (this.counter % 30 === 0) {
      this.obstacles.push(
        new Obstacle(
          this.canvas,
          this.ctx,
          this.moveSpeed,
          skySources[Math.floor(Math.random() * skySources.length)]
        )
      );
      // console.log(this.obstacles);
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].draw();
      this.obstacles[i].move();
      if (this.collisionCheck(this.obstacles[i])) {
        if (!this.alien.invulnerabilityFrames) {
          this.balloons -= 1;
          console.log(this.alien.invulnerabilityFrames);
          this.alien.setInvulnerable();
          console.log(this.alien.invulnerabilityFrames);
        }
        this.gameStatus();
        console.log(this.balloons);
        if (this.gameOver) {
          cancelAnimationFrame(this.intervalId);
          return;
        }
      }
    }

    this.counter++;
    this.gameStatus();
    if (this.gameOver) {
      cancelAnimationFrame(this.intervalId);
      return;
    }

    this.intervalId = requestAnimationFrame(() => this.drawAll());
  }

  collisionCheck(obstacle) {
    const alienHead = this.alien.y - this.alien.heightB;
    const alienFeet =
      alienHead +
      (this.alien.height + (this.alien.heightB - this.alien.height));
    const alienLeft = this.alien.x;
    const alienRight = alienLeft + this.alien.width;
    const withinX =
      obstacle.x + obstacle.width > alienLeft && obstacle.x < alienRight;
    const withinY = obstacle.y > alienHead && obstacle.y < alienFeet;

    return withinX && withinY;
  }

  gameStatus() {
    if (this.balloons <= 0) {
      this.gameOver = true;
      this.timer.stop();
      // this.timer.reset();
      console.log(`Game Over!!`);
    }
    if (this.timer.currentTime === 0) {
      this.gameOver = true;
      this.timer.stop();
      // this.timer.reset();
      console.log(`Game Over!!`);
    }
  }

  printTime() {
    this.printMinutes();
    this.printSeconds();
  }

  printMinutes() {
    let minutes = this.timer.computeTwoDigitNumber(this.timer.getMinutes());
    minDec.textContent = minutes.toString().slice(0, 1);
    minUni.textContent = minutes.toString().slice(1);
  }

  printSeconds() {
    let seconds = this.timer.computeTwoDigitNumber(this.timer.getSeconds());
    secUni.textContent = seconds.toString().slice(1);
    secDec.textContent = seconds.toString().slice(0, 1);
  }
}
