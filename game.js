var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var level = [0];

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + level[level.length - 1]);
  level.push(level.length);
}

$(".btn").on('click', function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).on('keypress', function() {
  if (gamePattern.length === 0) {
    nextSequence();
    $("h1").text("Level 0");
  }
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){nextSequence();}, 1000);
    }
  }

  else {
    wrong();
    startover();
  }

}

function wrong(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $('body').css('background-color', 'red');
  setTimeout(function(){
    $("body").css('background-color', '#011F3F');
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
}

function startover(){
  userClickedPattern = [];
  gamePattern = [];
  level = [0];
}
