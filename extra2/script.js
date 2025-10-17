const canvas = document.getElementById('cartesianCanvas');
const ctx = canvas.getContext('2d');

const ctrlStatus = document.getElementById('ctrlStatus');
const altStatus = document.getElementById('altStatus');
const shiftStatus = document.getElementById('shiftStatus');
const selectionBox = document.getElementById('selectionBox');

let ctrlIsPressed = false;
let altIsPressed = false;
let shiftIsPressed = false;

var gridSize = window.innerWidth / 20;
var pointDensity = 0.1;
var pastWidth = 0;
var pastHeight = 0;
var currentWidth = window.innerWidth;
var currentHeight = window.innerHeight;
var currentOrigin = [currentWidth / 2, currentHeight / 2];

var funToCall = [];

window.addEventListener('keydown', keyEventDown);
window.addEventListener('keyup', keyEventUp);
selectionBox.addEventListener('change', selection);
window.addEventListener('mousemove', () => {
  let output = '';

  for(let i = 0; i < funToCall.length; i++){
    output += `${funToCall[i].name} | ${funToCall[i].args.join(', ')}\n`;
  }

  document.getElementById('functionsToCall').textContent = output;
});

function selection(){
  let opt = selectionBox.value;

  // show / hides elements accordingly ...

  callRendering(opt);

}

function callRendering(opt){
//a 
//b 
//c 
//color 
//limits -> [min, max] 
//h 
//k 
//p 
//trigRatio 
//param 
//sys 
//r 
//figure 
//pointArray

  if(opt === '0'){
    funToCall.length = 0;
  } else if(opt === 'drawLinearStandard'){
    funToCall.push({
      func: drawLinearStandard,
      args: [0.25, 2, -2, 'red', [-10, 8]],
      name: 'drawLinearStandard'
    });
  } else if(opt === 'drawPolynomialVertex'){
    funToCall.push({
      func: drawPolynomialVertex,
      args: [2, 0, -2, 2, 'blue', [-2, 2]],
      name: 'drawPolynomialVertex'
    });
  } else if(opt === 'drawExp'){
    funToCall.push({
      func: drawExp,
      args: [2, 2, 'green', [-3, 3]],
      name: 'drawExp'
    });
  } else if(opt === 'drawTrigRatio'){
    funToCall.push({
      func: drawTrigRatio,
      args: ['sin', 'x', 1, 0, 0, 'orange'],
      name: 'drawTrigRatio'
    });
  } else if(opt === 'drawAngle'){
    funToCall.push({
      func: drawAngle,
      args: ['rad', 0.125, 5, 'orange'],
      name: 'drawAngle'
    });
  }
}

function callerFunction() {
    for (let i = 0; i < funToCall.length; i++) {
        let {
            func,
            args
        } = funToCall[i];
        // Use spread syntax (...) to pass array of arguments to function
        func(...args);
    }
}


function drawLinearStandard(a, b, c, color, limits) {
    if (b === 0) return;
    if (typeof color != 'string') return;
    if (!limits) {
        limits = [-currentWidth / (2 * gridSize), currentWidth / (2 * gridSize)];
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;

    for (let x_cartesian = limits[0]; x_cartesian <= limits[1]; x_cartesian += pointDensity) {
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

function drawPolynomialVertex(a, h, k, p, color, limits) {
    if (typeof color != 'string') return;
    if (!limits) {
        limits = [-currentWidth / (2 * gridSize), currentWidth / (2 * gridSize)];
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;

    for (let x_cartesian = limits[0]; x_cartesian < limits[1] + pointDensity; x_cartesian += pointDensity) {
        let y_cartesian = (a * (x_cartesian - h) ** p + k);

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


function drawExp(a, b, color, limits) {
    if (typeof color != 'string') return;
    if (!limits) {
        limits = [-currentWidth / (2 * gridSize), currentWidth / (2 * gridSize)];
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    let firstPoint = true;

    for (let x_cartesian = limits[0]; x_cartesian < limits[1] + pointDensity; x_cartesian += pointDensity) {
        let y_cartesian = (a * (b ** x_cartesian));

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


function drawTrigRatio(trigRatio, param, a, h, k, color, limits) {
    let firstPoint = true;
    let ratioResult;
    if (typeof color != 'string') return;
    if (typeof param != 'string') return;
    if (typeof trigRatio != 'string') return;
    if (!limits) {
        limits = [-currentWidth / (2 * gridSize), currentWidth / (2 * gridSize)];
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    if (param === 'x') {
        for (let x_cartesian = limits[0]; x_cartesian < limits[1] + pointDensity; x_cartesian += pointDensity) {
            if (trigRatio === 'sin') {
                ratioResult = Math.sin(x_cartesian - h);
            } else if (trigRatio === 'cos') {
                ratioResult = Math.cos(x_cartesian - h);
            } else if (trigRatio === 'tan') {
                ratioResult = Math.tan(x_cartesian - h);
            } else if (trigRatio === 'cot') {
                ratioResult = 1 / Math.tan(x_cartesian - h);
            } else if (trigRatio === 'sec') {
                ratioResult = 1 / Math.cos(x_cartesian - h);
            } else if (trigRatio === 'csc') {
                ratioResult = 1 / Math.sin(x_cartesian - h);
            } else {
                return;
            }
            let y_cartesian = (a * ratioResult + k);
            let x_canvas = x_cartesian * gridSize + currentOrigin[0];
            let y_canvas = currentOrigin[1] - y_cartesian * gridSize;

            if (firstPoint) {
                ctx.moveTo(x_canvas, y_canvas);
                firstPoint = false;
            } else {
                ctx.lineTo(x_canvas, y_canvas);
            }
        }
    } else if (param === 'y') {
        for (let y_cartesian = limits[0]; y_cartesian < limits[1] + pointDensity; y_cartesian += pointDensity) {
            if (trigRatio === 'sin') {
                ratioResult = Math.sin(y_cartesian - h);
            } else if (trigRatio === 'cos') {
                ratioResult = Math.cos(y_cartesian - h);
            } else if (trigRatio === 'tan') {
                ratioResult = Math.tan(y_cartesian - h);
            } else if (trigRatio === 'cot') {
                ratioResult = 1 / Math.tan(y_cartesian - h);
            } else if (trigRatio === 'sec') {
                ratioResult = 1 / Math.cos(y_cartesian - h);
            } else if (trigRatio === 'csc') {
                ratioResult = 1 / Math.sin(y_cartesian - h);
            } else {
                return;
            }
            let x_cartesian = (a * ratioResult + k);
            let x_canvas = x_cartesian * gridSize + currentOrigin[0];
            let y_canvas = currentOrigin[1] - y_cartesian * gridSize;

            if (firstPoint) {
                ctx.moveTo(x_canvas, y_canvas);
                firstPoint = false;
            } else {
                ctx.lineTo(x_canvas, y_canvas);
            }
        }
    } else {
        return
    }
    ctx.stroke();
}

function drawAngle(sys, a, r, color) {
    // sys = radians or degrees
    // a = angle
    if (typeof sys !== 'string' || typeof color !== 'string') return;
    if (sys !== 'rad' && sys !== 'deg') return;
    if (typeof a !== 'number' || typeof r !== 'number' || r <= 0) return;

    if (sys === 'deg') {
        a *= Math.PI / 180;
    } else if (a > 1) {
        a %= 1;
        a *= 2 * Math.PI;
    } else {
        a *= 2 * Math.PI;
    }


    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(currentOrigin[0], currentOrigin[1], r * gridSize, -a, 0);
    ctx.stroke();
}

function drawGeometry(figure, pointArray) {
    // self explanitory
    // ctx.beginPath();
    // ctx.moveTo(x1, y1);
    // ctx.lineTo(x2, y2);
    // ctx.stroke();
}


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
    currentOrigin = [currentWidth / 2, currentHeight / 2];

}, 100);



document.addEventListener('DOMContentLoaded', requestAnimationFrame(renderCanvas));
