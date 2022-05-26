let myGame = new Game();

const backgroundMusic = document.querySelector("audio");
const soundBtn = document.querySelector(".sound");
const soundImg = document.querySelector(".sound img");

const rulesBtn = document.querySelector(".rules");
const rules = document.querySelector(".rules-container");

const title = document.querySelector("h1");

const gameOver = document.querySelector(".game-over");
const goTitle = document.querySelector(".win-lose");
const goMessage = document.querySelector(".message");
const highScore = document.querySelector(".high-score");

// const leftButton = document.querySelector(".left");

const replayBtn = document.querySelectorAll(".replay");
console.log(replayBtn);

backgroundMusic.play();

soundBtn.onclick = () => {
  if (soundBtn.classList.contains("on")) {
    backgroundMusic.pause();
    soundImg.src = "./src/images/sound_icon.svg";
    soundBtn.classList.replace("on", "off");
  } else if (soundBtn.classList.contains("off")) {
    backgroundMusic.play();
    soundImg.src = "./src/images/no_sound_icon.svg";
    soundBtn.classList.replace("off", "on");
  }
};

for (let i = 0; i < replayBtn.length; i++) {
  replayBtn[i].addEventListener("click", () => {
    myGame.timer.stop();
    myGame.timer.reset();
    myGame = new Game();
    myGame.startGame();
    if (replayBtn[i].classList.contains("go-btn")) {
      gameOver.classList.add("hidden");
    }

    if (leftButton.classList.contains("continue")) {
      leftButton.textContent = "PAUSE";
      leftButton.classList.replace("continue", "pause");
    }
  });
}

rules.addEventListener("click", () => {
  if (!rules.classList.contains("hidden")) {
    rules.classList.add("hidden");
  }
});

rulesBtn.addEventListener("click", () => {
  if (rules.classList.contains("hidden")) {
    rules.classList.remove("hidden");
  } else {
    rules.classList.add("hidden");
  }
});
// replayBtn[0].addEventListener("click", () => {
//   // console.log(`click click!`);
//   myGame.timer.stop();
//   myGame.timer.reset();
//   myGame = new Game();
//   myGame.startGame();
// });

// replayBtn[1].addEventListener("click", () => {
//   // console.log(`click click!`);
//   myGame = new Game();
//   myGame.startGame();
// });

function showGameOver(condition) {
  if (condition === false) {
    gameOver.classList.remove("hidden");

    goTitle.textContent = "You LOST!!";
    goMessage.textContent = "uh oh";
    highScore.textContent = `${myGame.score}`;
  }
}
