const canvas = document.getElementById('cartesianCanvas');
const ctx = canvas.getContext('2d');

const ctrlStatus = document.getElementById('ctrlStatus');
const altStatus = document.getElementById('altStatus');
const shiftStatus = document.getElementById('shiftStatus');

let ctrlIsPressed = false;
let altIsPressed = false;
let shiftIsPressed = false;

var pastWidth = 0;
var pastHeight = 0;
var currentWidth = window.innerWidth;
var currentHeight = window.innerHeight;
var gridSize = window.innerWidth / 20;

window.addEventListener('keydown', keyEventDown);
window.addEventListener('keyup', keyEventUp);

function windowSizeHandler() {
    const centerX = Math.round(window.innerWidth / 2);
    const centerY = Math.round(window.innerHeight / 2);
    return [centerX, centerY];
}



function drawLinearStandard(a,b,c, limits){
  // a*x + b*y = c
  // limits = []

}

function drawLinearVertex(a,b){
  // y = a*x + b
}

function drawLinearPointSlope(a,h,k){
  // y - k = a*(x - h)
}

function drawPolynomialStandard(a,b,c,p){
  // y = a*x^p + b*x + c 
}

function drawPolynomialVertex(a,h,k,p){
  // y = a*(x - h)^p + k
}

function drawQuadraticFactored(a,p,q){
 // y = a*(x - p)*(x - q)
}

function drawExp(){
  // y = a * b^x
}


function drawTrigRatio(trigRatio, param, a,h,k){
  // trigRatio:
  // sin(x,y)
  // cos(x,y)
  // tan(x,y)
  // cot(x,y)
  // sec(x,y)
  // csc(x,y)

  // opposite of param = a*trigRatio(param - h) + k
}

function drawGeometry(figure, pointArray){
  // self explanitory
}

function drawAngles(sys, a){
  // sys = radians or degrees
  // a = angle

}



function renderCanvas() {
    canvas.width = currentWidth;
    canvas.height = currentHeight;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvasWidth; i += gridSize) {
        ctx.beginPath();

        ctx.moveTo(i, -canvasHeight); // up-down lines
        ctx.lineTo(i, canvasHeight);

        ctx.stroke();
    }

    for (let i = 0; i < canvasHeight; i += gridSize) {
        ctx.beginPath();

        ctx.moveTo(-canvasWidth, i); // left-right lines    
        ctx.lineTo(canvasWidth, i);

        ctx.stroke();
    }


    requestAnimationFrame(renderCanvas);
}

function keyEventDown(e) {
    if (e.key === 'Control') {
        ctrlStatus.textContent = 'ctrl status: down';
        ctrlIsPressed = true;
    }
    if (e.key === 'Alt') {
        altStatus.textContent = 'alt status: down';
        altIsPressed = true;
    }
    if (e.key === 'Shift') {
        shiftStatus.textContent = 'shift status: down';
        shiftIsPressed = true;
    }
}

function keyEventUp(e) {
    if (e.key === 'Control') {
        ctrlStatus.textContent = 'ctrl status: up';
        ctrlIsPressed = false;
    }
    if (e.key === 'Alt') {
        altStatus.textContent = 'alt status: up';
        altIsPressed = false;
    }
    if (e.key === 'Shift') {
        shiftStatus.textContent = 'shift status: up';
        shiftIsPressed = false;
    }
}



let gridCheckInterval = setInterval(() => {
  gridSize = window.innerWidth / 20;
  currentWidth = window.innerWidth;
  currentHeight = window.innerHeight;
  if(currentHeight != pastHeight){renderCanvas();}
  if(currentWidth != pastWidth){renderCanvas();}
  pastWidth = currentWidth;
  pastHeight = currentHeight;

}, 100);



requestAnimationFrame(renderCanvas);
requestAnimationFrame(moveObj);
document.addEventListener('DOMContentLoaded', initializeGridPositions);
