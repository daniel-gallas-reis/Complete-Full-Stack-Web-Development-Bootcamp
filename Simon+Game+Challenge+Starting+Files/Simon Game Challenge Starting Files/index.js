//Variables
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userChosenColor;
var userClickPattern = [];
var level = 0;
//Create the Audio variables
var blueAudio = new Audio("sounds/blue.mp3");
var greenAudio = new Audio("sounds/green.mp3");
var redAudio = new Audio("sounds/red.mp3");
var yellowAudio = new Audio("sounds/yellow.mp3");
var wrongAudio = new Audio("sounds/wrong.mp3");


//Listen to a key to start the game
$(document).keydown(function () {
    if (level == 0) {//if level is different to 0 then it would not do anything
        nextSequence();
    }
});

//Function to get the next color
function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    level++;
    $("h1").text("Level " + level);
    $("." + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatedPress()
    gamePattern.push(randomChosenColor);
    userClickPattern = [];
}

//listen to the clicked button
$(".btn").click(function (event) {
    if (level == 0) {
        $("h1").text("Game Over! Press a Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 150);
        playSound("wrong");
    } else {
        userChosenColor = event.target.id;
        userClickPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatedPress(userChosenColor);
        checkAnswer(userClickPattern.length - 1);
    }
});

//Play correspondent button sound
function playSound(name) {
    switch (name) {
        case "blue":
            blueAudio.play();
            break;
        case "green":
            greenAudio.play();
            break;
        case "red":
            redAudio.play();
            break;
        case "yellow":
            yellowAudio.play();
            break;
        case "wrong":
            wrongAudio.play();
            break;
        default:
            break;
    }
}

//Animate the button pressed
function animatedPress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

//Function to check answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickPattern[currentLevel]) {
        if (userClickPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $("h1").text("Game Over! Press a Key to Restart");
        level = 0;
        gamePattern = [];
        userClickPattern = [];
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 150);
    }
}