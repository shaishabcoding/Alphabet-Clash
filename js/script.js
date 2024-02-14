const id = (el) => document.getElementById(el);
const random = (max, min = 0) => Math.floor(Math.random() * max - min) + min;
Array.prototype.getRandomItem = function () {
  return this[random(this.length - 1)];
};
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
id("play").onclick = (e) => start();
window.onload = (e) => {
  id("play").focus();
};
const letters = "qwertyuiopasdfghjklzxcvbnm".split("");
const highLightLetter = (letter) => {
  letters.forEach((letter) => {
    id(letter).classList.remove("animate-pulse");
  });
  id(letter).classList.add("animate-pulse");
};
setInterval(() => {
  const randomLetter = letters.getRandomItem();
  id("screen").innerText = randomLetter;
  highLightLetter(randomLetter);
}, 3000);
