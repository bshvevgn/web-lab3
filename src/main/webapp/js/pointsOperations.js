const coordinatesBox = document.getElementById('coordinates');
const rect = coordinatesBox.getBoundingClientRect();
const centerX = coordinatesBox.offsetWidth / 2;
const centerY = coordinatesBox.offsetHeight / 2;
const scale = 470 / 372;

function addPoint(nearestX, nearestY, r, hit){
    const point = document.createElement('div');
    point.classList.add('existingDot');
    point.dataset.radius = r;
    coordinatesBox.appendChild(point);
    console.log(hit);
    if (hit) {
        point.style.backgroundColor = "rgb(0 221 0 / 30%)";
        point.style.border = "1px solid rgb(0 221 0 / 100%)";
    } else {
        point.style.backgroundColor = "rgb(255 67 67 / 30%)";
        point.style.border = "1px solid rgb(255 67 67 / 100%)";
    }
    point.style.left = ((centerX + (centerX / r) * nearestX / scale) - 4) + 'px';
    point.style.top = ((centerY - (centerY / r) * nearestY / scale) - 4) + 'px';
    point.dataset.left = point.offsetLeft;
    point.dataset.top = point.offsetTop;
}

function repositionPoints(r){
    let points = document.getElementsByClassName('existingDot');
    if(points.length > 0) {
        for (let i = 0; i < points.length; i++) {
            let originR = +(points[i].dataset.radius);
            points[i].style.left = ((+(points[i].dataset.left) - centerX) * (originR / r) + centerX) + 'px';
            points[i].style.top = ((+(points[i].dataset.top) - centerY) * (originR / r) + centerY) + 'px';
        }
    }
}

function removePoints(r) {
    let points = document.getElementsByClassName('existingDot');
    if (points.length > 0) {
        for (let i = 0; i < points.length; i++) {
            points[i].remove();
        }
    }
}

function removeLastPoint(){
    let point = document.getElementsByClassName('dot')[0];
    point.style.opacity = "0";
}

function hidePoints(){
    let points = document.getElementsByClassName('existingDot');
    if(points.length > 0) {
        for (let i = 0; i < points.length; i++) {
            points[i].style.opacity = "0";
        }
    }
}
function showPoints(){
    let points = document.getElementsByClassName('existingDot');
    if(points.length > 0) {
        for (let i = 0; i < points.length; i++) {
            points[i].style.opacity = "1";
        }
    }
}