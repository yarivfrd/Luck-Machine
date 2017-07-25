
let ln = {};

// Audio
ln.buttonPushSound = document.createElement("audio");
ln.buttonReleaseSound = document.createElement("audio");
ln.numberRollSound = document.createElement("audio");

ln.buttonPushSound.src = "audio/btn-push.wav";
ln.buttonReleaseSound.src = "audio/btn-release.wav";
ln.numberRollSound.src = "audio/number-roll.wav";
//

ln.bulbs = document.querySelectorAll(".bulb");
ln.startMessages = ["GD-LK!","ALRHT!","LTS-GO"];
ln.rolling = false;

ln.generatePushAction = () => {

    ln.resetButtonSounds();
    ln.playButtonSounds();

    if (!ln.rolling) {

        ln.rolling = true;
        ln.resetRollSounds();
        ln.playRollSounds();
        ln.generateRandomMessage();
        ln.lightAllBulbs();

        ln.roll = setTimeout( () => {

            ln.numRoll = setInterval(function(){ln.generateNumbers() }, 100);
            ln.indicatorLoop = setInterval(function(){ln.randomizeBulbs()}, 100);
            ln.indicatorLoopTimeout = setTimeout( function(){clearInterval(ln.indicatorLoop)} ,2450);
            ln.numRollTimeout = setTimeout( function(){clearInterval(ln.numRoll);ln.rolling = false;ln.darkenAllBulbs();} ,2450);

        },650);
    }
}

ln.generateReleaseAction = function() {
    ln.buttonPushSound.pause();
    ln.buttonPushSound.currentTime = 0.0;
    ln.buttonReleaseSound.play();
}

ln.playRollSounds = () => {
    ln.numberRollSound.play();
}

ln.playButtonSounds = () => {
    ln.buttonPushSound.play();
}

ln.generateRandomMessage = () => {
    document.machine.numbersIndicator.value = ln.startMessages[Math.round(Math.random() * (ln.startMessages.length-1))];
}

ln.randomizeBulbs = () => {
    ln.darkenAllBulbs();
    ln.bulbs[Math.round(Math.random() * (ln.bulbs.length-1))].style.backgroundColor = "#ffeb3b";
}

ln.lightAllBulbs = () => {
    for (var i = 0;i < ln.bulbs.length;i++) {
        ln.bulbs[i].style.backgroundColor = "#ffeb3b";
    }
}

// Machine Resets
ln.darkenAllBulbs = () => {
    for (var i = 0;i < ln.bulbs.length;i++) {
        ln.bulbs[i].style.backgroundColor = "#1a1a1a";
    }
}

ln.resetButtonSounds = () => {
    ln.buttonReleaseSound.pause();
    ln.buttonReleaseSound.currentTime = 0.0;

    ln.buttonPushSound.pause();
    ln.buttonPushSound.currentTime = 0.0;
}

ln.resetRollSounds = () => {
    ln.numberRollSound.pause();
    ln.numberRollSound.currentTime = 0.0;
}

ln.generateNumbers = (numbersLength=6,rangeMax=9,rangeMin=0) => {
    var numberSet = new Set();

    while(numberSet.size < numbersLength) {
        numberSet.add(Math.round(Math.random() * (rangeMax - rangeMin) + rangeMin));
    }

    document.machine.numbersIndicator.value = Array.from(numberSet).join("");
}

// Events
ln.generateBtn = document.getElementById("generate");
ln.generateBtn.addEventListener("mousedown",ln.generatePushAction);
ln.generateBtn.addEventListener("mouseup",ln.generateReleaseAction);
//
