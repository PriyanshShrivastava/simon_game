let btnColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let firstKeyPressed = false;
let level = 0;

$(document).on("keypress", function () {
  if (!firstKeyPressed) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    firstKeyPressed = true;
  }
});

$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(soundName) {
  let soundToBePlayed = new Audio(`./sounds/${soundName}.mp3`);
  soundToBePlayed.play();
}
function animatePress(colourChosen) {
  $(`#${colourChosen}`).addClass("pressed");

  setInterval(function () {
    $(`#${colourChosen}`).removeClass("pressed");
  }, 150);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    let wrongSound = new Audio(`./sounds/wrong.mp3`);
    wrongSound.play();

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart again");

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  let sequenceNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = btnColours[sequenceNumber];

  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function startOver() {
  firstKeyPressed = false;
  level = 0;

  gamePattern = [];
  userClickedPattern = [];
}
