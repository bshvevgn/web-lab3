var roundX = true;
var autoSend = false;
var clockInterval = false;

document.addEventListener("DOMContentLoaded", (event) => {
    if(document.querySelector(".invalidResult") != null){
        setTimeout(() => document.querySelector(".invalidResult").style.animation = "shake 400ms ease-in-out", 400);
    }

    roundX = ('true' === getCookie('roundX'));
    autoSend = ('true' === getCookie('autoSend'));
    clockInterval = ('true' === getCookie('clockInterval'));
    document.getElementById("roundXSwitch").checked = roundX;
    document.getElementById("autoSendSwitch").checked = autoSend;
    document.getElementById("clockSwitch").checked = clockInterval;
});

document.getElementById("roundXSwitch").addEventListener("change", (event) => {
    roundX = document.getElementById("roundXSwitch").checked;
    setCookie('roundX', roundX);
    console.log(roundX);
});

document.getElementById("autoSendSwitch").addEventListener("change", (event) => {
    autoSend = document.getElementById("autoSendSwitch").checked;
    setCookie('autoSend', autoSend);
    console.log(autoSend);
});

document.getElementById("clockSwitch").addEventListener("change", (event) => {
    clockInterval = document.getElementById("clockSwitch").checked;
    setCookie('clockInterval', clockInterval);
    console.log(clockInterval);
});

function closeModalWindow(ID, start) {
    document.getElementById(ID).classList.add('closedModalWindow');
    document.getElementById("modalWindowBack").classList.add("hiddenModalBack");
}

function showModalWindow(ID, message) {
    $('.errorMessage').html(message);
    document.getElementById(ID + "Window").classList.remove('closedModalWindow');
    document.getElementById("modalWindowBack").classList.remove("hiddenModalBack");
}