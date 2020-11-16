const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1244;
canvas.height = 700;
document.body.appendChild(canvas);

let bgReady, aimPointReady, monsterReady, fireReady, shootReady;
let bgImage, aimPointImage, monsterImage, fireImage, shootImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    playAudio2();
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/maxresdefault.jpg";
  shootImage = new Image();
  shootImage.onload = function () {
    // show the background image
    shootReady = false;
  };
  shootImage.src = "images/img3.png";
  fireImage = new Image();
  fireImage.onload = function () {
    // show the background image
    fireReady = false;
  };
  fireImage.src = "images/fire3.png";
  aimPointImage = new Image();
  aimPointImage.onload = function () {
    // show the aimPoint image
    aimPointReady = true;
  };
  aimPointImage.src = "images/Picture1-removebg-preview.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/halo-removebg-preview.png";
}

/**
 * Setting up our characters.
 *
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 *
 * The same applies to the monster.
 */

let aimPointX = canvas.width / 2;
let aimPointY = canvas.height / 2;

let monsterX = Math.floor(Math.random() * canvas.width) - 600 + 25;
let monsterY = 175 + Math.floor(Math.random() * canvas.height) / 2 + 40;

var shootSound;

let keysPressed = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  document.addEventListener("mousedown", shoot);
  document.addEventListener("mouseup", stopShoot);
  document.addEventListener("mousemove", mouseMoveHandler, false);
}

var i = 0;
function shoot() {
  fireReady = true;
  shootReady = true;
  playAudio();
  var a = monsterX - aimPointX;
  var b = monsterY - aimPointY;

  var c = Math.sqrt(a * a + b * b);
  if (c <= 43) {
    playAudio1();
    monsterX = Math.floor(Math.random() * canvas.width) - 600;
    monsterY = 175 + Math.floor(Math.random() * canvas.height) / 2;
    i = i + 1;
  }
}
function stopShoot() {
  fireReady = false;
  shootReady = false;
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    aimPointX = relativeX - 17;
  }
  var relativeY = e.clientY - canvas.offsetLeft;
  if (relativeY > 0 && relativeY < canvas.height) {
    aimPointY = relativeY - 15;
  }
}
var audioType;
var audio = new Audio();
if (audio.canPlayType("audio/mp3")) {
  audioType = ".mp3";
} else {
  audioType = ".wav";
}

//Function to play the exact file format
function playAudio() {
  var audio = new Audio("sound/shoot" + audioType);
  audio.play();
}
function playAudio1() {
  var audio = new Audio("sound/enemy-down" + audioType);
  audio.play();
}
function playAudio2() {
  var audio = new Audio("sound/pubg_sound" + audioType);
  audio.play();
}

function update() {
  elapsedTime = Math.floor((Date.now() - startTime) / 1000) + 5;
}
function render() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
    {
      if (monsterX < 0) {
        monsterX = 49;
      }
    }
  }
  if (aimPointReady) {
    ctx.drawImage(aimPointImage, aimPointX, aimPointY);
  }
  if (shootReady) {
    ctx.drawImage(shootImage, aimPointX - 10, aimPointY - 5);
  }
  if (fireReady) {
    ctx.drawImage(fireImage, 625, 350);
  }
  ctx.fillText(
    `Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`,
    20,
    100
  );
  if (SECONDS_PER_ROUND - elapsedTime === 0) {
    alert(`You Killed ${i} enemies.
    Great job soldier.`);
    document.location.reload();
    clearInterval(interval);
  }
  ctx.fillText(`Enemy Kill: ${i}`, 20, 120);
}

function main() {
  update();
  render();
  requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();
