
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var hasStarted = false;
var level = 0;

function nextSequence() {
  //reset
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass("pressed");

  setTimeout(function(){
    $('#' + currentColor).removeClass("pressed");
  }, 100);

}

$(document).keypress(function(){
  if(!hasStarted){
    nextSequence();
    hasStarted = true;
  }
})

window.addEventListener('touchstart', function() {
  // the user touched the screen!
  if(!hasStarted){
    nextSequence();
    hasStarted = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  console.log("userpat: " + userClickedPattern[currentLevel]);
  console.log("gamepat: " + gamePattern[currentLevel]);

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success ");
    
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
      startOver();
    }, 200);
    console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  hasStarted = false;
}