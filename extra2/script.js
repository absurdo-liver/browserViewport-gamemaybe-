const canvas = document.getElementById('cartesianCanvas');
const ctx = canvas.getContext('2d');

const ctrlStatus = document.getElementById('ctrlStatus');
const altStatus = document.getElementById('altStatus');
const shiftStatus = document.getElementById('shiftStatus');

let ctrlIsPressed = false;
let altIsPressed = false;
let shiftIsPressed = false;

var gridSize = window.innerWidth / 20;
var pointDensity = 0.1;
var pastWidth = 0;
var pastHeight = 0;
var currentWidth = window.innerWidth;
var currentHeight = window.innerHeight;
var currentOrigin = [currentWidth/2, currentHeight/2];
var funToCall = [];

window.addEventListener('keydown', keyEventDown);
window.addEventListener('keyup', keyEventUp);

funToCall.push({
    func: drawLinearStandard,
    args: [1, 2, 4, [-5, 5]]
});

funToCall.push({
    func: drawPolynomialVertex,
    args: [2, 0, 0, 2, [-2, 2]]
});

funToCall.push({
    func: drawExp,
    args: [2, 2, [-3, 3]]
});


function callerFunction(){
  for(let i = 0; i < funToCall.length; i++){
    const { func, args } = funToCall[i];
    // Use spread syntax (...) to pass array of arguments to function
    func(...args); 
  }
}

function drawLinearStandard(a,b,c,limits){
    if (b === 0) return;
    a = -a;
    if (!limits){
      limits = [-currentWidth / (2 * gridSize), currentWidth / (2 * gridSize)]; 
    }

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;

    for(let x_cartesian = limits[0]; x_cartesian <= limits[1]; x_cartesian += pointDensity){
        let y_cartesian = (c - a * x_cartesian) / b;

        let x_canvas = x_cartesian * gridSize + currentOrigin[0];
        let y_canvas = currentOrigin[1] - y_cartesian * gridSize;

        if (firstPoint) {
            ctx.moveTo(x_canvas, y_canvas);
            firstPoint = false;
        } else {
            ctx.lineTo(x_canvas, y_canvas);
        }
    }
    ctx.stroke();
}

function drawPolynomialVertex(a,h,k,p,limits){
  if (!limits){
      limits = [-currentWidth / (2 * gridSize), currentWidth / (2 * gridSize)]; 
  }

    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;

    for(let x_cartesian = limits[0]; x_cartesian < limits[1] + pointDensity; x_cartesian += pointDensity){
        let y_cartesian = (a * (x_cartesian - h)**p + k);

        let x_canvas = x_cartesian * gridSize + currentOrigin[0];
        let y_canvas = currentOrigin[1] - y_cartesian * gridSize;

        if (firstPoint) {
            ctx.moveTo(x_canvas, y_canvas);
            firstPoint = false;
        } else {
            ctx.lineTo(x_canvas, y_canvas);
        }
    }
    ctx.stroke();
}


function drawExp(a,b,limits){
  if (!limits){
      limits = [-currentWidth / (2 * gridSize), currentWidth / (2 * gridSize)]; 
  }
  
  ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;

    for(let x_cartesian = limits[0]; x_cartesian < limits[1] + pointDensity; x_cartesian += pointDensity){
        let y_cartesian = (a * (b**x_cartesian));

        let x_canvas = x_cartesian * gridSize + currentOrigin[0];
        let y_canvas = currentOrigin[1] - y_cartesian * gridSize;

        if (firstPoint) {
            ctx.moveTo(x_canvas, y_canvas);
            firstPoint = false;
        } else {
            ctx.lineTo(x_canvas, y_canvas);
        }
    }
    ctx.stroke();
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

// ctx.beginPath();
// ctx.moveTo(x1, y1);
// ctx.lineTo(x2, y2);
// ctx.stroke();

function renderCanvas() {
    ctx.clearRect(0, 0, currentWidth, currentHeight);
    canvas.width = currentWidth;
    canvas.height = currentHeight;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 1;

    const originX = currentOrigin[0];
    const originY = currentOrigin[1];

    // Draw vertical lines (from center outwards)
    for (let i = 0; i <= originX; i += gridSize) {
        ctx.beginPath();
        // Right side of origin
        ctx.moveTo(originX + i, 0); 
        ctx.lineTo(originX + i, canvasHeight);
        ctx.stroke();

        if (i > 0) {
            ctx.beginPath();
            // Left side of origin
            ctx.moveTo(originX - i, 0); 
            ctx.lineTo(originX - i, canvasHeight);
            ctx.stroke();
        }
    }

    // Draw horizontal lines (from center outwards)
    for (let i = 0; i <= originY; i += gridSize) {
        ctx.beginPath();
        // Down from origin (positive canvas Y direction)
        ctx.moveTo(0, originY + i); 
        ctx.lineTo(canvasWidth, originY + i);
        ctx.stroke();

        if (i > 0) {
            ctx.beginPath();
            // Up from origin (negative canvas Y direction)
            ctx.moveTo(0, originY - i); 
            ctx.lineTo(canvasWidth, originY - i);
            ctx.stroke();
        }
    }
    
    // Draw X & Y Axes
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originY); // X-axis
    ctx.lineTo(currentWidth, originY);
    ctx.moveTo(originX, 0); // Y-axis
    ctx.lineTo(originX, currentHeight);
    ctx.stroke();

    callerFunction();

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
  currentOrigin = [currentWidth/2, currentHeight/2];
  
}, 100);



document.addEventListener('DOMContentLoaded', requestAnimationFrame(renderCanvas));
