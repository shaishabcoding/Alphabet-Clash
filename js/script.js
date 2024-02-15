const $ = (el) => [...document.querySelectorAll(el)];
const id = (el) => $("#" + el)[0];
const random = (max, min = 0) => Math.floor(Math.random() * max - min) + min;

HTMLElement.prototype.hide = function () {
  this.classList.add("hidden");
};
HTMLElement.prototype.display = function () {
  ["home", "play-ground", "score"].forEach((el) => {
    id(el).hide();
  });
  this.classList.remove("hidden");
};
const start = () => {
  id("play-ground").display();
  id("play").blur();
};
const reStart = () => {
  id("play-ground").display();
  life = 3;
  score = 0;
  lifeAdd = 0;

  id("result").innerText = score;
  id("life").innerText = life;
};
id("play").onclick = (e) => start();
id("re-play").onclick = (e) => reStart();
window.onload = (e) => {
  id("play").focus();
};
const letters = "qwertyuiopasdfghjklzxcvbnm".split("");
const highLightLetter = (index) => {
  for (const letter of $("kbd")) letter.classList.remove("animate-pulse");
  $("kbd")[index].classList.add("animate-pulse");
};
const checkLetter = (index, status) => {
  for (const letter of $("kbd"))
    letter.classList.remove("bg-green-500", "bg-red-500");
  $("kbd")[index].classList.add(`bg-${status ? "green" : "red"}-500`);
};
let randomNum = 0,
  randomLetter = "",
  life = 3,
  score = 0,
  lifeAdd = 0;
const randomKey = () => {
  randomNum = random(25);
  randomLetter = letters[randomNum];
  id("screen").innerText = randomLetter;
  highLightLetter(randomNum);
};
randomKey();
const keyUpHandler = (event) => {
  const key = event.key.toLowerCase();
  let status = key === randomLetter;
  if (letters.includes(key)) {
    checkLetter(letters.indexOf(key), status);

    if (status) {
      ++score;
      if (lifeAdd > 4) {
        ++life;
        lifeAdd = 0;
      } else {
        ++lifeAdd;
      }
    } else {
      --score;
      --life;
    }

    id("result").innerText = score;
    id("life").innerText = life;
    randomKey();

    if (life < 1) {
      id("scoreBoard").innerText = score;
      id("score").display();
      id("re-play").focus();
    }
  }
};
document.addEventListener("keyup", keyUpHandler);
for (const letter of $("kbd"))
  letter.onclick = function () {
    keyUpHandler({ key: letter.innerText });
  };
