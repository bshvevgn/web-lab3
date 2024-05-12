var dialLines = document.getElementsByClassName('diallines');
var clockEl = document.getElementsByClassName('clock')[0];
var linesBox = document.getElementsByClassName('linesBox')[0];

for (var i = 1; i < 60; i++) {
  linesBox.innerHTML += "<div class='diallines'></div>";
  dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

function clock() {
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


  hEl.style.transform = "rotate(" + hDeg + "deg)";
  mEl.style.transform = "rotate(" + mDeg + "deg)";
  sEl.style.transform = "rotate(" + sDeg + "deg)";
}

clock();
setInterval(clock, 17000); // интервал по заданию