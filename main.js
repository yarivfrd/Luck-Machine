// Events
document.getElementById("generate").addEventListener("mousedown",generatePushAction);
document.getElementById("generate").addEventListener("mouseup",generateReleaseAction);

// Audio
var buttonPush = document.createElement("audio");
var buttonRelease = document.createElement("audio");
var numberRoll = document.createElement("audio");

buttonPush.src = "audio/btn-push.wav";
buttonRelease.src = "audio/btn-release.wav";
numberRoll.src = "audio/number-roll.wav";

var bulbs = document.querySelectorAll(".bulb");
var startMessages = ["GD-LK!","ALRHT!","LTS-GO"];
var rolling = false;

// Actions
function generatePushAction() {

    resetButtonSounds();
    playButtonSounds();

    if (!rolling) {

        rolling = true;
        resetRollSounds();
        playRollSounds();
        generateRandomMessage();
        lightAllBulbs();

        var roll = setTimeout(function () {

            var numRoll = setInterval(function(){generateNumbers() }, 100);
            var indicatorLoop = setInterval(function(){randomizeBulbs()}, 100);
            var indicatorLoopTimeout = setTimeout( function(){clearInterval(indicatorLoop)} ,2450);
            var numRollTimeout = setTimeout( function(){clearInterval(numRoll);rolling = false;darkenAllBulbs();} ,2450);

        },650);
    }
}

function generateReleaseAction() {
    buttonPush.pause();
    buttonPush.currentTime = 0.0;
    buttonRelease.play();
}

function playRollSounds() {
    numberRoll.play();
}

function playButtonSounds() {
    buttonPush.play();
}

function generateRandomMessage() {
    document.machine.numbersIndicator.value = startMessages[Math.round(Math.random() * (startMessages.length-1))];
}

function randomizeBulbs() {
    darkenAllBulbs();
    bulbs[Math.round(Math.random() * (bulbs.length-1))].style.backgroundColor = "#ffeb3b";
}

function lightAllBulbs() {
    for (var i = 0;i < bulbs.length;i++) {
        bulbs[i].style.backgroundColor = "#ffeb3b";
    }
}

// Machine Resets
function darkenAllBulbs() {
    for (var i = 0;i < bulbs.length;i++) {
        bulbs[i].style.backgroundColor = "#1a1a1a";
    }
}

function resetButtonSounds() {
    buttonRelease.pause();
    buttonRelease.currentTime = 0.0;

    buttonPush.pause();
    buttonPush.currentTime = 0.0;
}

function resetRollSounds() {
    numberRoll.pause();
    numberRoll.currentTime = 0.0;
}

function generateNumbers(numbersLength=6,rangeMax=9,rangeMin=0) {
    var numberSet = new Set();

    while(numberSet.size < numbersLength) {
        numberSet.add(Math.round(Math.random() * (rangeMax - rangeMin) + rangeMin));
    }

    document.machine.numbersIndicator.value = Array.from(numberSet).join("");
}