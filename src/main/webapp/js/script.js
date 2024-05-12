let xInputID = "mainForm\:x";
let yInputID = "mainForm\:y";
let rInputID = "mainForm\:r";


function checkTable() {
    const table = document.getElementById('resultsTable');
    const rows = table.getElementsByTagName('tr');


    for (let i = rows.length - 1; i > 0; i--) {
        const cells = rows[i].getElementsByTagName('td');
        let hasText = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.trim() !== '') {
                hasText = true;
                break;
            }
        }

        if (!hasText) {
            table.deleteRow(i);
        }
    }
    if (table.rows.length > 1) {
        document.getElementById("clearButton").classList.remove("inactiveButton");
        document.getElementById("emptyTableMessage").style.display = "none";
        document.getElementById("resultsTable").style.display = "block";
    } else {
        document.getElementById("clearButton").classList.add("inactiveButton");
        document.getElementById("emptyTableMessage").style.display = "block";
        document.getElementById("resultsTable").style.display = "none";
    }

}

const areasHint = document.getElementById('areasHint');

let isTransitioning = false;

async function editHint(newText, element) {
    if (isTransitioning) {
        return;
    }

    isTransitioning = true;

    const originalText = element.innerText;

    element.style.transition = "opacity .2s";
    element.style.opacity = "0";

    await new Promise((resolve) => setTimeout(resolve, 200));
    element.innerText = newText;

    element.style.opacity = "0.8";

    await new Promise((resolve) => setTimeout(resolve, 1800));

    element.style.transition = "opacity .2s";
    element.style.opacity = "0";

    await new Promise((resolve) => setTimeout(resolve, 200));
    element.innerText = originalText;

    element.style.opacity = "0.8";
    isTransitioning = false;
}

function scrollDown(element){
    element.scrollTop = element.scrollHeight;
}

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 20) {
        $('#header').addClass('wideHeader');
    } else {
        $('#header').removeClass('wideHeader');
    }
}

);

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function formSubmit(submit){
    if(submit) {
        let submitButton = document.getElementById("mainForm\:submit-button");
        submitButton.click();
    }
}

function checkInputs(){
    let xInp = document.getElementById(xInputID);
    let yInp = document.getElementById(yInputID);
    let rInp = document.getElementById(rInputID);

    if (parseFloat(yInp.value) > 5 || parseFloat(yInp.value) < -5) {
        showModalWindow("incorrectValue", "Пожалуйста, введите значение для Y от -5 до 5.");
        return false;
    } else if (rInp == "") {
        showModalWindow("incorrectValue", "Пожалуйста, введите значение для R.");
        return false;
    } else if (!isValid(yInp.value) || (!isValid(rInp.value) && !isPositive(rInp.value))) {
        showModalWindow("incorrectValue", "Проверьте введённые данные.");
        return false;
    } else {
        return true;
    }
}



function isValid(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) && value != null;
}

function isPositive(value) {
    return (value > 0);
}

function clearTable(url) {
    $.ajax({
        type: 'POST',
        url: url,
        data: "clear=true",
        success: (response) => {
            let table = document.getElementById("resultsTable");
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
            checkTable();
        },
        error: (error) => {
            console.log(error);
        }
});
}




function handleFormSubmit(button) {
    disappear(checkInputs());
    setTimeout(function() {
        button.click();
    }, 400);
}



function checkAddress(checkbox) {
    if (checkbox.checked == true) {
        var checkboxes = document.getElementsByClassName('checkbox');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            document.getElementById('x').value = "";
        }
        checkbox.checked = true;
        document.getElementById('x').value = checkbox.value;
    }

    if (checkbox.checked == false) {
        document.getElementById('x').value = "";
    }
}

function unblurNumber() {
    $('#rVal').removeClass('blurred');
}

function disappear(start){
    let content = document.querySelector('.contentWrapper');
    if(start) {
        content.style.transition = ".4s";
        content.style.opacity = "0";
        content.style.transform = "scale(0.9)";
    }
}

function appear(){
    let content = document.querySelector('.contentWrapper');
    content.style.transition = ".4s";
    setTimeout(() => {content.style.opacity = "1"; content.style.transform = "scale(1)"}, 100);
}

const xInput = document.getElementById(xInputID);

xInput.addEventListener('input', function () {
    removePoint();
    const value = xInput.value;

    if (!value) {
        xInput.classList.remove('valid', 'invalid');
    } else if (isNaN(+(value))) {
        xInput.classList.add('invalid');
        xInput.classList.remove('valid');
    } else if (+(value) >= -2 && +(value) <= 1) {
        xInput.classList.add('valid');
        xInput.classList.remove('invalid');
    } else {
        xInput.classList.add('invalid');
        xInput.classList.remove('valid');
    }
});

const yInput = document.getElementById(yInputID);

yInput.addEventListener('input', function () {
    removePoint();
    const value = yInput.value;

    if (!value) {
        yInput.classList.remove('valid', 'invalid');
    } else if (isNaN(+(value))) {
        yInput.classList.add('invalid');
        yInput.classList.remove('valid');
    } else if (+(value) >= -5 && +(value) <= 5) {
        yInput.classList.add('valid');
        yInput.classList.remove('invalid');
    } else {
        yInput.classList.add('invalid');
        yInput.classList.remove('valid');
    }
});


const rInput = document.getElementById(rInputID);
const rInputDublicate = document.querySelector('#rDublicate');

rInput.addEventListener('input', function () {
    rInputDublicate.value = rInput.value;
    removePoint();
});

rInputDublicate.addEventListener('input', function () {
    rInput.value = rInputDublicate.value;
    removePoint();
});


let rInputs = [rInput, rInputDublicate];

rInputs.forEach(r => {r.addEventListener('input', function () {
    const value = rInput.value;

    if (!value) {
        rInput.classList.remove('valid', 'invalid');
        rInputDublicate.classList.remove('valid', 'invalid');
    } else if (isNaN(+(value))) {
        rInput.classList.add('invalid');
        rInput.classList.remove('valid');
        rInputDublicate.classList.add('invalid');
        rInputDublicate.classList.remove('valid');
        hidePoints();
        editHint("Значение R может состоять только из цифр и точки", areasHint);
    } else if (+(value) >= 2 && +(value) <= 5) {
        rInput.classList.add('valid');
        rInput.classList.remove('invalid');
        rInputDublicate.classList.add('valid');
        rInputDublicate.classList.remove('invalid');
        showPoints();
        repositionPoints(rInput.value);
    } else {
        rInput.classList.add('invalid');
        rInput.classList.remove('valid');
        rInputDublicate.classList.add('invalid');
        rInputDublicate.classList.remove('valid');
        hidePoints();
        editHint("Значение R должно быть равно от 2 до 5", areasHint);
    }
});
});


let pointX = 0;
let pointY = 0;

let cX = centerX;
let cY = centerY

coordinatesBox.addEventListener('click', function(event) {
    const previousDot = coordinatesBox.querySelector('.previousDot');
    if (previousDot) {
        previousDot.classList.add('blurredDot');
        setTimeout(() => coordinatesBox.removeChild(previousDot), 200);
    }

    let radius = +(rInput.value);

    if(radius == 0 || rInput.classList.contains('invalid')){
        editHint("Проверьте введённое значение R", areasHint);
        return;
    }


    const rect = coordinatesBox.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.classList.add('previousDot');
    dot.classList.add('blurredDot');

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dotX = x;
    const dotY = y;
    dot.style.left = (dotX - 6) + 'px';
    dot.style.top = (dotY - 4) + 'px';

    const existingDot = coordinatesBox.querySelector('.dot');
    if (existingDot) {
        existingDot.classList.add('previousDot');
    }

    coordinatesBox.appendChild(dot);

    setTimeout(() => dot.classList.remove('blurredDot'), 0);

    pointX = dotX - centerX;
    pointY = -(dotY - centerY);

    let scale = 300 / 240;

    let finalX = ((pointX * radius) / centerX) * scale;
    let finalY = ((pointY * radius) / centerY) * scale;

    let nearestX = nearest(finalX);
    let nearestY = checkY(finalY);
    setTimeout(() => position(dot, nearestX, nearestY, centerX, centerY, radius, scale), 50);

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popupContent.textContent = `X: ${nearestX}; Y: ${nearestY.toFixed(3)}`;

    document.getElementById(xInputID).value = nearestX;
    //document.getElementById('xVal').innerHTML = nearestX;
    document.getElementById(yInputID).value = nearestY.toFixed(3);

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.classList.add('hiddenPopup');
    popup.appendChild(popupContent);
    dot.appendChild(popup);

    setTimeout(function() {
        popup.classList.remove('hiddenPopup');
    }, 200);

    setTimeout(function() {
        popup.classList.add('hiddenPopup');
    }, 2000);

});

function nearest(number) {
    if (number > 2) {
        editHint("Значение X не может быть больше 2", areasHint);
        return 1;
    }
    if (number < -2) {
        editHint("Значение X не может быть меньше -2", areasHint);
        return -2;
    }
    if (roundX) {
        return Math.round(number * 2) / 2;
    } else {
        return (Math.round(number * 2) / 2).toFixed(3);
    }
}

function checkY(number){
    if (number > 5){
        editHint("Значение Y не может быть больше 5", areasHint)
        return 5;
    }
    if (number < -5){
        editHint("Значение Y не может быть меньше -5", areasHint)
        return -5;
    }
    return number;
}

function position(point, nearestX, nearestY, centerX, centerY, r, scale){
    point.style.left = ((centerX + (centerX / r) * nearestX / scale) - 8) + 'px';
    point.style.top = ((centerY - (centerY / r) * nearestY / scale) - 4) + 'px';
    document.getElementById("interactiveSubmitButton").classList.remove("inactiveButton");
    if(autoSend){
        formSubmit(true);
        setTimeout(() => closeModalWindow('areasWindow'), 500);
        setTimeout(() => removeLastPoint(), 700);
    }
}

function processTableRows() {
    checkTable();
    removePoints()
    const table = document.getElementById("resultsTable");
    const rows = table.getElementsByTagName("tr");
    console.log("processing rows: " + rows.length);
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");

        if (cells.length >= 4) {
            const x = parseFloat(cells[0].textContent);
            const y = parseFloat(cells[1].textContent);
            const r = parseFloat(cells[2].textContent);
            const hit = cells[3].textContent.trim();

            console.log(x + " " + y + " " + r + " " + hit);
            if (!isNaN(x) && !isNaN(y) && !isNaN(r) && hit === "Попадает") {
                addPoint(x, y, r, true);
            } else {
                addPoint(x, y, r, false);
            }
        }
    }
}

function addPoint(nearestX, nearestY, r, hit){
    console.log("HELLO: " + nearestX + " " + nearestY + " " + r + " " + hit)
    const point = document.createElement('div');
    point.classList.add('existingDot');
    point.dataset.radius = r;
    coordinatesBox.appendChild(point);
    if (hit) {
        point.style.backgroundColor = "rgb(0 221 0 / 30%)";
        point.style.border = "1px solid rgb(0 221 0 / 100%)";
    } else {
        point.style.backgroundColor = "rgb(255 67 67 / 30%)";
        point.style.border = "1px solid rgb(255 67 67 / 100%)";
    }
    point.style.left = ((centerX + (centerX / r) * nearestX / scale) - 8) + 'px';
    point.style.top = ((centerY - (centerY / r) * nearestY / scale) - 4) + 'px';
    point.dataset.left = point.offsetLeft;
    point.dataset.top = point.offsetTop;
}

function removePoint(){
    document.getElementById("interactiveSubmitButton").classList.add("inactiveButton");
    let point = document.querySelector('#coordinates .previousDot');
    if(point) {
        point.classList.add('blurredDot');
        setTimeout(() => point.remove(), 200);
    }
}

function startTime() {
    checkTable();
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('currentTime').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function () {
        startTime()
    }, 50);
}

startTime();