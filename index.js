"use strict";
let info = $(".bi-info-circle-fill");
const label = $(".label");
const hide = $(".hide");
const close = $(".bi-x");
const close1 = $(".hide");
const new_game = $(".top button");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

var highest = 0;


info.click(function () {
  label.removeClass("display");
  hide.removeClass("display");
});

close.click(function () {
  label.addClass("display");
  hide.addClass("display");
});

close1.click(function () {
  label.addClass("display");
  hide.addClass("display");
});



$(document).click(function() {
  if (!started) {
    $(".heading h1").text("Level  : " + level);
    nextSequence();
    started = true;
  }
});

$(".box").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $(".head").addClass("game-over");
      $(".heading h1").text("Game Over ...!");

      setTimeout(function () {
        $(".head").removeClass("game-over");
      }, 200);
      if(level >highest){
        let temp = level -1;
        $('.top p').text("High Score : " + temp);
      }
      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $(".heading h1").text("Level : " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

new_game.click(function(){
  startOver();
  $(".heading h1").text("Press any key to start ...!");
})