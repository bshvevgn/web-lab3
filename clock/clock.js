var dialLines = document.getElementsByClassName('diallines');
var clockEl = document.getElementsByClassName('clock')[0];
var linesBox = document.getElementsByClassName('linesBox')[0];

for (var i = 1; i < 60; i++) {
  linesBox.innerHTML += "<div class='diallines'></div>";
  dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

function clock() {
  var weekday = [
    "Вс",
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб"
  ];
  var monthes = [
    "Янв.",
    "Фев.",
    "Март",
    "Апр.",
    "Май",
    "Июнь",
    "Июль",
    "Авг.",
    "Сент.",
    "Окт.",
    "Нояб.",
    "Дек."
  ];
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var date = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();

  var hDeg = h * 30 + m * (360 / 720);
  var mDeg = m * 6 + s * (360 / 3600);
  var sDeg = s * 6;

  var hEl = document.querySelector('.hour-hand');
  var mEl = document.querySelector('.minute-hand');
  var sEl = document.querySelector('.second-hand');
  var dateEl = document.querySelector('#date');
  var dayEl = document.querySelector('#weekday');
  var monthEl = document.querySelector('#month');

  var day = weekday[d.getDay()];

  if (month < 9) {
    month = "0" + month;
  }

  hEl.style.transform = "rotate(" + hDeg + "deg)";
  mEl.style.transform = "rotate(" + mDeg + "deg)";
  sEl.style.transform = "rotate(" + sDeg + "deg)";
  dateEl.innerHTML = date;
  monthEl.innerHTML = monthes[month - 1];
  dayEl.innerHTML = day;
}

function smoothClock() {
  var d = new Date();
  var s = d.getSeconds();
  var sDeg = s * 6;
  var sEl = document.querySelector('.second-hand');
  
  sEl.style.transform = "rotate(" + sDeg + "deg)";
}

setInterval(smoothClock, 1000);
setInterval(clock, 100);