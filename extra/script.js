const canvas = document.getElementById('cartesianCanvas');
const ctx = canvas.getContext('2d');
const testobj = document.getElementById('testobj');
const ctrlStatus = document.getElementById('ctrlStatus');
const altStatus = document.getElementById('altStatus');
const shiftStatus = document.getElementById('shiftStatus');
const lastpositiontext = document.getElementById('lastpositiontext');
const tertis1 = document.getElementById('tertis1');


let globalMouseX = 400;
let globalMouseY = 200;

let ctrlIsPressed = false;
let altIsPressed = false;
let shiftIsPressed = false;

var pastWidth = 0;
var pastHeight = 0;
var currentWidth = window.innerWidth;
var currentHeight = window.innerHeight;
var gridSize = window.innerWidth / 20;

const lastPosition = [];

let objectToDrag = null;

window.addEventListener('mousemove', movementHandler);
window.addEventListener('keydown', keyEventDown);
window.addEventListener('keyup', keyEventUp);

window.addEventListener('mouseup', () => {
    document.getElementById(objectToDrag).classList.remove('held');
    document.getElementById(objectToDrag).style.cursor = 'grab';
    document.body.style.cursor = 'default';
    if (objectToDrag) {
        const obj = document.getElementById(objectToDrag);
        let finalX = globalMouseX - obj.offsetWidth / 2;
        let finalY = globalMouseY - obj.offsetHeight / 2;
        [finalX, finalY] = snapping(finalX, finalY);

        obj.style.left = `${finalX}px`;
        obj.style.top = `${finalY}px`;

        newPosition(finalX, finalY);
        objectToDrag = null;
    }
});

function movementHandler(e) {
    globalMouseX = e.clientX;
    globalMouseY = e.clientY;
}

function windowSizeHandler() {
    const centerX = Math.round(window.innerWidth / 2);
    const centerY = Math.round(window.innerHeight / 2);
    return [centerX, centerY];
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

function moveObj() {
    if (objectToDrag) {
        const obj = document.getElementById(objectToDrag);
        let newX = globalMouseX - obj.offsetWidth / 2;
        let newY = globalMouseY - obj.offsetHeight / 2;
        [newX, newY] = snapping(newX, newY);
        obj.style.top = `${newY}px`;
        obj.style.left = `${newX}px`;
    }
    requestAnimationFrame(moveObj);
}


function snapping(valueX, valueY) {
    const snappedX = Math.round(valueX / gridSize) * gridSize;
    const snappedY = Math.round(valueY / gridSize) * gridSize;
    return [snappedX, snappedY];
}

function newPosition(x, y) {
    const newPos = {
        name: `pos${lastPosition.length}`,
        pos: [x, y]
    };
    lastPosition.push(newPos);
    const lastRecorded = lastPosition[lastPosition.length - 1];
    lastpositiontext.textContent = `
    ${lastRecorded.name}, (
    ${Math.round(lastRecorded.pos[0])},
    ${Math.round(lastRecorded.pos[1])})
    `;
}

function dragPre(name) {
    objectToDrag = name;
    document.getElementById(objectToDrag).classList.add('held');
    document.getElementById(objectToDrag).style.position = 'absolute';
    document.getElementById(objectToDrag).style.minWidth = 'max-content';
    document.getElementById(objectToDrag).style.cursor = 'grabbing';
    document.body.style.cursor = 'grabbing';
}

testobj.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragPre('testobj');
});

ctrlStatus.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragPre('ctrlStatus');
});

altStatus.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragPre('altStatus');
});

shiftStatus.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragPre('shiftStatus');
});

lastpositiontext.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragPre('lastpositiontext');
});

tertis1.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragPre('tertis1');
});

function initializeGridPositions() {
    const tertomino = document.getElementById('tertis1');
    if (tertomino) {
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        const [snappedX, snappedY] = snapping(startX - tertomino.offsetWidth / 2, startY - tertis1.offsetHeight / 2);

        tertomino.style.left = `${snappedX}px`;
        tertomino.style.top = `${snappedY}px`;
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

  let elements = document.querySelectorAll('.moveable');
  elements.forEach(element => {
    let elementId = element.id;
    let valueX = window.getComputedStyle(element).left;
    let valueY = window.getComputedStyle(element).top;
    let numValueX = parseInt(valueX, 10) || 0;
    let numValueY = parseInt(valueY, 10) || 0;
    let snappedX = Math.round(numValueX / gridSize) * gridSize;
    let snappedY = Math.round(numValueY / gridSize) * gridSize;
    document.getElementById(elementId).style.left = `${snappedX}px`;
    document.getElementById(elementId).style.top = `${snappedY}px`;
  });
}, 100);



requestAnimationFrame(renderCanvas);
requestAnimationFrame(moveObj);
document.addEventListener('DOMContentLoaded', initializeGridPositions);
