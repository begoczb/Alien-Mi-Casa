const myGame = new Game();

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

rulesBtn.addEventListener("click", () => {
  if (rules.classList.contains("hidden")) {
    rules.classList.remove("hidden");
  } else {
    rules.classList.add("hidden");
  }
});

function showGameOver(condition) {
  if (condition === false) {
    gameOver.classList.remove("hidden");

    goTitle.textContent = "You LOST!!";
    goMessage.textContent = "uh oh";
    highScore.textContent = `${myGame.score}`;
  }
}
