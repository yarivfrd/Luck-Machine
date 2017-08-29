let ln = {};

ln.minRange = '1';
ln.maxRange = '6';
ln.rollingNumbers = '6'

ln.numbersIndicator = document.querySelector('#numbersIndicator');
ln.generateBtn = document.getElementById("generate");
ln.radioButton1 = document.querySelector("#radio1");
ln.radioButton2 = document.querySelector("#radio2");
ln.radioButton3 = document.querySelector("#radio3");
ln.radioButton4 = document.querySelector("#radio4");
ln.radioButton5 = document.querySelector("#radio5");
ln.radioButton6 = document.querySelector("#radio6");

ln.generatePushAction = () => {
  ln.generateNumbers();
}

ln.generateNumbers = (numbersLength = Number(ln.rollingNumbers), rangeMax = Number(ln.maxRange), rangeMin = Number(ln.minRange)) => {
  var numberSet = new Set();

  while (numberSet.size < numbersLength) {
    numberSet.add(Math.round(Math.random() * (rangeMax - rangeMin) + rangeMin));
  }

  ln.numbersIndicator.value = Array.from(numberSet).join("");
}

// User data storage

for (let storageEntry = 0; storageEntry < localStorage.length; storageEntry++) {
  if (localStorage.key(storageEntry) === 'lmRollingNumbers') {
    ln.rollingNumbers = localStorage.getItem('lmRollingNumbers');
  }
  if (localStorage.key(storageEntry) === 'lmMinRange') {
    ln.minRange = localStorage.getItem('lmMinRange');
  }
  if (localStorage.key(storageEntry) === 'lmMaxRange') {
    ln.maxRange = localStorage.getItem('lmMaxRange');
  }
  if ((ln.maxRange - ln.minRange + 1) < ln.rollingNumbers) {
    document.querySelector('#settings nav').classList.add('disabled');
  } else {
    document.querySelector('#settings nav').classList.remove('disabled');
  }
}

document.querySelector('#radio' + ln.rollingNumbers).checked = true;

$(function () {
  $("#slider-range").slider({
    range: true,
    min: 1,
    max: 6,
    values: [ln.minRange, ln.maxRange],
    slide: function (event, ui) {

      $("#selected-min-range").text(ui.values[0]);
      $("#selected-max-range").text(ui.values[1]);

      document.querySelector('.selected-range').classList.add('bounce');
      let bounceTimer = setTimeout(() => {
        document.querySelector('.selected-range').classList.remove('bounce');
      }, 100);

      localStorage.setItem('lmMinRange', ui.values[0]);
      ln.minRange = localStorage.getItem('lmMinRange');
      localStorage.setItem('lmMaxRange', ui.values[1]);
      ln.maxRange = localStorage.getItem('lmMaxRange');

      if ((ui.values[1] - ui.values[0] + 1) < ln.rollingNumbers) {
        document.querySelector('#settings nav').classList.add('disabled');
        document.querySelector('.range-alert').classList.remove('hidden');
      } else {
        document.querySelector('#settings nav').classList.remove('disabled');
        document.querySelector('.range-alert').classList.add('hidden');
      }

    }
  });
  $("#selected-min-range").text($("#slider-range").slider("values", 0));
  $("#selected-max-range").text($("#slider-range").slider("values", 1));
});

ln.selectionAction = (selected) => {

  ln.rollingNumbers = selected;

  // Slider reset
  $("#slider-range").slider("values", 0, 1);
  $("#slider-range").slider("values", 1, 6);
  $("#selected-min-range").text($("#slider-range").slider("values", 0));
  $("#selected-max-range").text($("#slider-range").slider("values", 1));
  localStorage.setItem('lmMinRange', $("#slider-range").slider("values", 0));
  localStorage.setItem('lmMaxRange', $("#slider-range").slider("values", 1));
  ln.minRange = '1';
  ln.maxRange = '6';
  if ((ln.maxRange - ln.minRange + 1) < ln.rollingNumbers) {
    document.querySelector('nav').classList.add('disabled');
    document.querySelector('.range-alert').classList.remove('hidden');
  } else {
    document.querySelector('nav').classList.remove('disabled');
    document.querySelector('.range-alert').classList.add('hidden');
  }
};

ln.generateBtn.addEventListener("click", ln.generatePushAction);

ln.radioButton1.addEventListener('click', () => {
  localStorage.setItem('lmRollingNumbers', '1');
  ln.selectionAction(1);
});

ln.radioButton2.addEventListener('click', () => {
  localStorage.setItem('lmRollingNumbers', '2');
  ln.selectionAction(2);
});

ln.radioButton3.addEventListener('click', () => {
  localStorage.setItem('lmRollingNumbers', '3');
  ln.selectionAction(3);
});

ln.radioButton4.addEventListener('click', () => {
  localStorage.setItem('lmRollingNumbers', '4');
  ln.selectionAction(4);
});

ln.radioButton5.addEventListener('click', () => {
  localStorage.setItem('lmRollingNumbers', '5');
  ln.selectionAction(5);
});

ln.radioButton6.addEventListener('click', () => {
  localStorage.setItem('lmRollingNumbers', '6');
  ln.selectionAction(6);
});
