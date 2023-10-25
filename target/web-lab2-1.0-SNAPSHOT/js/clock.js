var dialLines = document.getElementsByClassName('diallines');
var clockEl = document.getElementsByClassName('clock')[0];
var linesBox = document.getElementsByClassName('linesBox')[0];
let interval = 500;

function executeWithDynamicInterval(fn, initialInterval) {
    let interval = initialInterval;
    let timeoutId;

    function executeFunction() {
        fn();
        timeoutId = setTimeout(executeFunction, interval);
    }

    executeFunction();

    function setDynamicInterval(newInterval) {
        clearTimeout(timeoutId);
        interval = newInterval;

        executeFunction();
    }

    return setDynamicInterval;
}

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
        ],
        monthes = [
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
            "Дек.",
        ],
        d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        date = d.getDate(),
        month = d.getMonth() + 1,
        year = d.getFullYear(),

        hDeg = h * 30 + m * (360/720),
        mDeg = m * 6 + s * (360/3600),
        sDeg = s * 6,

        hEl = document.querySelector('.hour-hand'),
        mEl = document.querySelector('.minute-hand'),
        sEl = document.querySelector('.second-hand'),
        dateEl = document.querySelector('#date'),
        dayEl = document.querySelector('#weekday');
    monthEl = document.querySelector('#month');

    var day = weekday[d.getDay()];

    hEl.style.transform = "rotate("+hDeg+"deg)";
    mEl.style.transform = "rotate("+mDeg+"deg)";
    sEl.style.transform = "rotate("+sDeg+"deg)";
    dateEl.innerHTML = date;
    monthEl.innerHTML = monthes[month - 1];
    dayEl.innerHTML = day;
}

const dynamicIntervalFunction = executeWithDynamicInterval(function() {
    clock();
}, 500);


let lastClockInterval = clockInterval
setInterval(function() {
    if (lastClockInterval !== clockInterval) {
        if (clockInterval) {
            dynamicIntervalFunction(10000);
        } else {
            dynamicIntervalFunction(500);
        }
        lastClockInterval = clockInterval;
    }
}, 50);


const widgets = document.querySelectorAll('.widgetBox');
const widgetArea = document.querySelector('#widgetArea');

widgets.forEach(widget => {
    widget.style.transform = `translate(${getCookie(widget.id + 'X')}px, ${getCookie(widget.id + 'Y')}px) scale(0.5)`;
    console.log(widget.ID + " " + getCookie(widget.ID + 'X') + " " + getCookie(widget.ID + 'Y'))
    widget.addEventListener('mousedown', startDrag);
});

let activeWidget = null;
let initialX = 0;
let initialY = 0;
let xOffset = 0;
let yOffset = 0;

function startDrag(e) {
    activeWidget = this;

    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    widgetArea.style.opacity = "1";

    if (activeWidget) {
        e.preventDefault();

        xOffset = e.clientX - initialX;
        yOffset = e.clientY - initialY;

        if (xOffset < 86) {
            xOffset = 86;
        } else if (xOffset > 278) {
            xOffset = 278;
        }

        console.log(yOffset)
        if (yOffset < -192) {
            yOffset = -192;
        } else if (yOffset > 86 + 192) {
            yOffset = 86 + 192;
        }

        setTranslate(xOffset, yOffset, activeWidget);
    }
}

function stopDrag() {
    widgetArea.style.opacity = "0";
    if (activeWidget) {
        /*
        const closestWidget = findClosestWidget(activeWidget);

        if (closestWidget) {
            swapWidgets(activeWidget, closestWidget);
        }
        */
        xOffset = 0;
        yOffset = 0;
        initialX = 0;
        initialY = 0;

        activeWidget = null;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }
}

function setTranslate(xPos, yPos, element) {
    let gridX = Math.round(xPos / 192) * 192 - 106;
    let gridY = Math.round(yPos / 192) * 192 - 106;

    setCookie(element.id + 'X', gridX);
    setCookie(element.id + 'Y', gridY);

    element.style.transform = `translate(${gridX}px, ${gridY}px) scale(0.5)`;
}

function findClosestWidget(widget) {
    const widgetRect = widget.getBoundingClientRect();
    let closestWidget = null;
    let minDistance = Infinity;

    widgets.forEach(otherWidget => {
        if (otherWidget !== widget) {
            const otherWidgetRect = otherWidget.getBoundingClientRect();
            const distance = getDistance(widgetRect, otherWidgetRect);

            if (distance < minDistance) {
                minDistance = distance;
                closestWidget = otherWidget;
            }
        }
    });

    return closestWidget;
}

function getDistance(rect1, rect2) {
    const dx = (rect1.left + rect1.right) / 2 - (rect2.left + rect2.right) / 2;
    const dy = (rect1.top + rect1.bottom) / 2 - (rect2.top + rect2.bottom) / 2;
    return Math.sqrt(dx * dx + dy * dy);
}

function swapWidgets(widget1, widget2) {
    const tempTransform = widget1.style.transform;
    widget1.style.transform = widget2.style.transform;
    widget2.style.transform = tempTransform;
}
