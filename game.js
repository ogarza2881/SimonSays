const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

document.querySelector('h1').addEventListener('click', function () {
  if (!started) {
    document.querySelector('h1').innerHTML = `Level ${level}`;
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.querySelector('h1').innerHTML = `Level ${level}`;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(randomChosenColor) {
  let audio = new Audio('sounds/' + randomChosenColor + '.mp3');
  audio.play();
}

const buttons = document.querySelectorAll('.btn');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    let userChosenColor = buttons[i].id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
}

function animatePress(currentColor) {
  document.querySelector(`.${currentColor}`).classList.add('pressed');
  setTimeout(function () {
    document.querySelector(`.${currentColor}`).classList.remove('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    playSound('wrong');
    document.querySelector('h1').innerHTML = `Game Over, Press Any Key to Restart`;
    document.querySelector('body').classList.add('game-over');
    setTimeout(function () {
      document.querySelector('body').classList.remove('game-over');
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
