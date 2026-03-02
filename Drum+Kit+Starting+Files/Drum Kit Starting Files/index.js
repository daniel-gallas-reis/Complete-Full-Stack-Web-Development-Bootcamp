
var drumButtons = document.querySelectorAll(".drum");

for (var i = 0; i < drumButtons.length; i++){
    drumButtons[i].addEventListener("click", function (){
        handleCLick(this.innerHTML);
        buttonAnimation(this.innerHTML);
    });
}

var audioTom1 = new Audio("sounds/tom-1.mp3");
var audioTom2 = new Audio("sounds/tom-2.mp3");
var audioTom3 = new Audio("sounds/tom-3.mp3");
var audioTom4 = new Audio("sounds/tom-4.mp3");
var audioSnare = new Audio("sounds/snare.mp3");
var audioCrash = new Audio("sounds/crash.mp3");
var audioKick = new Audio("sounds/kick-bass.mp3");

function handleCLick(key){
    switch (key) {
        case "w":
            audioTom1.play();
            break;
        case "a":
            audioTom2.play();
            break;
        case "s":
            audioTom3.play();
            break;
        case "d":
            audioTom4.play();
            break;
        case "j":
            audioSnare.play();
            break;
        case "k":
            audioCrash.play();
            break;
        case "l":
            audioKick.play();
            break;
        default:
            break;
    }
}

document.addEventListener("keydown", function (event) {
    handleCLick(event.key);
    buttonAnimation(event.key);
})

function buttonAnimation(key){
    var activeButton = document.querySelector("."+key);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}