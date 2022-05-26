const skySources = [
  "./src/images/first_birb_left.png",
  "./src/images/first_yellow_birb_left.png",
  "./src/images/first_pink_birb_left.png",
  "./src/images/plane.png",
];

const spaceSources = [
  "./src/images/asteroid.png",
  "./src/images/first_rocket.png",
  "./src/images/astronaut.png",
];

const imageAlien = new Image();
const imageBalloon = new Image();

const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");

const timerContainer = document.querySelector(".timer-container");

const minDec = document.querySelector(".minDec");
const minUni = document.querySelector(".minUni");
const secDec = document.querySelector(".secDec");
const secUni = document.querySelector(".secUni");

const astronaut = document.querySelector(".astronaut");

//TODO,
//add sound effects!! button, collision??
//win board
//background to timer

//ADD loading time?? alien doesn't load

// console.log(sources[0]);
class Game {
  constructor() {
    //All we need for our game
    this.canvas = null;
    this.ctx = null;
    this.background = null;
    this.backgroundPara = null;
    this.obstacles = [];
    this.alien = null;
    this.balloons = 5;
    this.intervalId = null;
    this.counter = 0;
    this.moveSpeed = 5;
    this.gameOver = false;
    this.timer = null;
    this.score = 0;
    this.init();
  }
  init() {
    //We get the canvas and the context of the canvas
    this.timer = new Timer(180);
    this.canvas = document.querySelector("#canvas");
    // console.log(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    leftButton.onclick = () => {
      if (leftButton.classList.contains("play")) {
        title.classList.add("smaller");
        this.canvas.classList.remove("hidden");
        timerContainer.classList.remove("hidden");
        leftButton.textContent = "PAUSE";
        leftButton.classList.replace("play", "pause");

        astronaut.classList.add("hidden");

        this.startGame();
      } else if (leftButton.classList.contains("pause")) {
        this.timer.stop();
        leftButton.textContent = "CONTINUE";
        leftButton.classList.replace("pause", "continue");
      } else if (leftButton.classList.contains("continue")) {
        this.timer.start(() => this.printTime());
        leftButton.textContent = "PAUSE";
        leftButton.classList.replace("continue", "pause");
      }
    };

    rightButton.onclick = () => {
      if (leftButton.classList.contains("pause")) {
        this.timer.stop();
        leftButton.textContent = "CONTINUE";
        leftButton.classList.replace("pause", "continue");
      }
    };
  }

  startGame() {
    // console.log(`Game started!!`);
    // this.timer.reset();
    //create background
    this.background = new Background(this.canvas, this.ctx, this.moveSpeed, 1);

    //create alien
    this.alien = new Alien(this.canvas, this.ctx, imageAlien, imageBalloon);
    this.canvas.addEventListener("mousemove", (event) => {
      this.alien.move(event);
      //   console.log(event);
    });

    this.backgroundPara = new Background(
      this.canvas,
      this.ctx,
      this.moveSpeed,
      2
    );
    this.timer.start(() => this.printTime());

    //draw all function
    this.drawAll();
  }

  reset() {
    //reset canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawAll() {
    if (this.timer.working) {
      this.reset();

      this.background.draw(this.timer.currentTime);

      this.background.scroll();

      this.alien.draw();

      this.backgroundPara.draw(this.timer.currentTime);

      this.backgroundPara.scroll();

      if (this.counter % 45 === 0) {
        if (this.background.image.src.includes("sky")) {
          this.obstacles.push(
            new Obstacle(
              this.canvas,
              this.ctx,
              this.moveSpeed,
              skySources[Math.floor(Math.random() * skySources.length)],
              Math.floor(Math.random() * 2)
            )
          );
        } else if (this.background.image.src.includes("space")) {
          this.obstacles.push(
            new Obstacle(
              this.canvas,
              this.ctx,
              this.moveSpeed,
              spaceSources[Math.floor(Math.random() * spaceSources.length)]
            )
          );
        }
      }

      for (let i = 0; i < this.obstacles.length; i++) {
        if (
          this.obstacles[i].y < this.canvas.height &&
          this.obstacles[i].y2 + this.obstacles[i].height > 0
        ) {
          this.obstacles[i].draw();
          this.obstacles[i].move();
          if (this.collisionCheck(this.obstacles[i])) {
            if (!this.alien.invulnerabilityFrames) {
              this.balloons -= 1;
              popSound.pause();
              popSound.currentTime = 0;
              popSound.play();

              this.alien.setInvulnerable();
            }
            this.gameStatus();
            // console.log(this.balloons);
            if (this.gameOver) {
              cancelAnimationFrame(this.intervalId);
              return;
            }
          }
        } else {
          this.obstacles.splice(i, 1);
        }
      }

      this.counter++;
      this.gameStatus();
      if (this.gameOver) {
        cancelAnimationFrame(this.intervalId);
        return;
      }
    }
    this.intervalId = requestAnimationFrame(() => this.drawAll());
  }

  collisionCheck(obstacle) {
    let withinY;

    const alienHead = this.alien.y - this.alien.heightB;
    const alienFeet =
      alienHead +
      (this.alien.height + (this.alien.heightB - this.alien.height));
    const alienLeft = this.alien.x;
    const alienRight = alienLeft + this.alien.width;
    const withinX =
      obstacle.x + obstacle.width > alienLeft && obstacle.x < alienRight;
    if (obstacle.image.src.includes("rocket")) {
      withinY = obstacle.y2 > alienHead && obstacle.y2 < alienFeet;
      // console.log(withinY);
    } else {
      withinY = obstacle.y > alienHead && obstacle.y < alienFeet;
      // console.log(withinY);
    }

    return withinX && withinY;
  }

  gameStatus() {
    if (this.balloons <= 0) {
      this.gameOver = true;
      this.timer.stop();
      this.score = this.calculateScore();
      this.timer.reset();

      showGameOver(false);

      // console.log(`Game Over!!`);
    }
    if (this.timer.currentTime === 0) {
      this.gameOver = true;
      this.timer.stop();
      this.score = this.calculateScore();
      this.timer.reset();
      showGameOver(false);

      // console.log(`Game Over!!`);
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

  calculateScore() {
    let calc = 0;
    //balloons +500
    calc += 500 * this.balloons;
    //time 10s +100
    calc += ((this.timer.time - this.timer.currentTime) / 10) * 100;
    return calc.toFixed(0);
  }
}
