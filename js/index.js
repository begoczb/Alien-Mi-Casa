const myGame = new Game();

const backgroundMusic = document.querySelector("audio");
const soundBtn = document.querySelector(".sound");
const soundImg = document.querySelector(".sound img");

const rulesBtn = document.querySelector(".rules");
const rules = document.querySelector(".rules-container");

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

console.log(rulesBtn);
console.log(rules);

rulesBtn.addEventListener("click", () => {
  if (rules.classList.contains("hidden")) {
    rules.classList.remove("hidden");
  } else {
    rules.classList.add("hidden");
  }
});
