const rulesBtn = document.querySelector(".rules");
console.log(rulesBtn);
const rules = document.querySelector(".rules-container");
console.log(rules);

rulesBtn.addEventListener("click", () => {
  if (!rules.classList.contains("show")) {
    rules.classList.add("show");
  } else {
    rules.classList.remove("show");
  }
});
