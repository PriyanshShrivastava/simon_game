let btnColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let firstTap = false;
let windowWidth = 0;
// let windowResize = 0;
let firstKeyPressed = false;
let level = 0;

$(window).on("load", function () {
  windowWidth = $(window).width();
  if (windowWidth <= 500) {
    $("#level-title").html("Touch anywhere to start");
  }
});
$(window).resize(function () {
  windowWidth = $(window).width();
  console.log(windowWidth);
  if (windowWidth <= 500) {
    $("#level-title").html("Touch anywhere to start");
  } else {
    $("#level-title").html("Press A key to start");
  }
});

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

    if (windowWidth >= 500) {
      $("h1").text("Game Over, Press Any Key to start again!");
    } else {
      $("h1").text("Game Over, touch anywhere to start again!");
    }

    startOver();
  }
}

$("html").on("click", function () {
  console.log(this);
  if (!firstTap) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    firstTap = true;
  }
});

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
  firstTap = false;
  level = 0;

  gamePattern = [];
  userClickedPattern = [];
}
