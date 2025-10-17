const canvas = document.getElementById('cartesianCanvas');
const ctx = canvas.getContext('2d');

const ctrlStatus = document.getElementById('ctrlStatus');
const altStatus = document.getElementById('altStatus');
const shiftStatus = document.getElementById('shiftStatus');
const selectionBox = document.getElementById('selectionBox');

let ctrlIsPressed = false;
let altIsPressed = false;
let shiftIsPressed = false;

const aInput = document.getElementById('aInput');
const bInput = document.getElementById('bInput');
const cInput = document.getElementById('cInput');
const hInput = document.getElementById('hInput');
const kInput = document.getElementById('kInput');
const pInput = document.getElementById('pInput');
const rInput = document.getElementById('rInput');
const limitsMinInput = document.getElementById('limitsMinInput');
const limitsMaxInput = document.getElementById('limitsMaxInput');
const colorInput = document.getElementById('colorInput');
const trigRatioInput = document.getElementById('trigRatioInput');
const paramInput = document.getElementById('paramInput');
const sysInput = document.getElementById('sysInput');
const figureInput = document.getElementById('figureInput');
const pointArrayInput = document.getElementById('pointArrayInput');

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

// aInput
// bInput
// cInput
// hInput
// kInput
// pInput
// rInput
// limitsMinInput
// limitsMaxInput
// colorInput
// trigRatioInput
// paramInput
// sysInput
// figureInput
// pointArrayInput

  if(opt === '0'){
    funToCall.length = 0;
  } else if(opt === 'drawLinearStandard'){
    let a = aInput.value;
    let b = bInput.value;
    let c = cInput.value;
    let color = colorInput.value;
    let limits = [limitsMinInput.value, limitsMaxInput.value];
    funToCall.push({
      func: drawLinearStandard,
      args: [a, b, c, color, limits],
      name: 'drawLinearStandard'
    });
  } else if(opt === 'drawPolynomialVertex'){
    let a = aInput.value;
    let h = hInput.value;
    let k = kInput.value;
    let p = pInput.value;
    let color = colorInput.value;
    let limits = [limitsMinInput.value, limitsMaxInput.value];
    funToCall.push({
      func: drawPolynomialVertex,
      args: [a, h, k, p, color, limits],
      name: 'drawPolynomialVertex'
    });
  } else if(opt === 'drawExp'){
    let a = aInput.value;
    let b = bInput.value;
    let color = colorInput.value;
    let limits = [limitsMinInput.value, limitsMaxInput.value];
    funToCall.push({
      func: drawExp,
      args: [a, b, color, limits],
      name: 'drawExp'
    });
  } else if(opt === 'drawTrigRatio'){
    let a = aInput.value;
    let h = hInput.value;
    let k = kInput.value;
    let param = paramInput.value;
    let trigRatio = trigRatioInput.value;
    let color = colorInput.value;
    let limits = [limitsMinInput.value, limitsMaxInput.value];
    funToCall.push({
      func: drawTrigRatio,
      args: [trigRatio, param, a, h, k, color, limits],
      name: 'drawTrigRatio'
    });
  } else if(opt === 'drawAngle'){
    let a = aInput.value;
    let r = rInput.value;
    let color = colorInput.value;
    let sys = sysInput.value;
    funToCall.push({
      func: drawAngle,
      args: [sys, a, r, color],
      name: 'drawAngle'
    });
  } else if(opt === 'drawGeometry'){
    let figure = figureInput.value;
    let pointArray = pointArrayParse(pointArrayInput.value);
    let color = colorInput.value;
    funToCall.push({
      func: drawAngle,
      args: [figure, pointArray, color],
      name: 'drawAngle'
    });
  }
}

function pointArrayParse(textToParse){
  let output = [];
  textToParse = textToParse.replaceAll(' ', '');
  textToParse = textToParse.replace('(', '');
  textToParse = textToParse.replaceAll('),(', '|');
  textToParse = textToParse.replace(')', '');
  textToParse = textToParse.split('|');
  for (let i = 0; i < textToParse.length; i++){
    let text = {
      x: parseInt(textToParse[i].toString().split(',')[0]), 
      y: parseInt(textToParse[i].toString().split(',')[1])
    };
    output.push(text);
  }
  return output
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

function drawGeometry(figure, pointArray, color) {
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
