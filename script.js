const infoText = document.getElementById('infoText');
const canvas = document.getElementById('cartesianCanvas');
const ctx = canvas.getContext('2d');

var clickedPoints = [];
var lastMousePos = [];
var globalMouseX = 200;
var globalMouseY = 200;
var distanceOrigin;
var globalcenterX;
var globalcenterY;
var keyMoveSpeed = 1;
drawingExtras = false;

window.addEventListener('mousemove', mouseMoveHandler);
window.addEventListener('keydown', hotkeyHandler);
canvas.addEventListener('click', clickHandler);


function mouseMoveHandler(e){
  globalcenterX = resizeHandler()[0];
  globalcenterY = resizeHandler()[1];
  globalMouseX = e.clientX;
  globalMouseY = e.clientY;
  lastMousePos = [e.clientX - globalcenterX,e.clientY - globalcenterY];
  calculateDistanceOrigin();
  infoText.textContent = `cursor: (${e.clientX}, ${e.clientY})
center: (${globalcenterX}, ${globalcenterY})
distance: ${distanceOrigin}px
` + vectorHandler([globalcenterX,globalcenterY],[e.clientX,e.clientY]);
  renderCanvas(e.clientX - globalcenterX,e.clientY - globalcenterY);
}

function clickHandler() {
  clickedPoints.push({
    x: lastMousePos[0],
    y: lastMousePos[1]
  });
  renderCanvas(lastMousePos[0],lastMousePos[1]);
}

function resizeHandler(){
  let centerX = Math.round(window.innerWidth / 2);
  let centerY = Math.round(window.innerHeight / 2);
  return [centerX,centerY];
}

function vectorHandler(origin, coordinates){
  let x = coordinates[0] - origin[0];
  let y = coordinates[1] - origin[1];
  return `v = (${x}, ${y})`;
}

function calculateDistanceOrigin(){
  distanceOrigin = Math.round(Math.hypot(globalMouseX - globalcenterX, globalMouseY - globalcenterY)*1000)/1000;
}

function drawPoint(ctx, x, y) {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, Math.PI * 2, true);
  ctx.fill();
}

function renderCanvas(mousex, mousey) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;
  let originX = resizeHandler()[0];
  let originY = resizeHandler()[1];

  // set up coordinate system
  ctx.translate(originX, originY); // move origin to center

  // Draw x and x axes
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.moveTo(-originX, 0);
  ctx.lineTo(canvasWidth - originX, 0); // x-axis
  ctx.moveTo(0, -originY);
  ctx.lineTo(0, canvasHeight - originY); // x-axis
  ctx.stroke();
  
    // Draw all the points from the clickedPoints array
  clickedPoints.forEach(point => {
    drawPoint(ctx, point.x, point.y);
  });

  // draw line to mouse
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.moveTo(0, 0);
  ctx.lineTo(mousex, mousey);
  ctx.stroke();

  // hotkey | draw extras
  if(drawingExtras){
    // circle
    ctx.beginPath();
    ctx.arc(0, 0, distanceOrigin, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
   
    // horizontal line
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(distanceOrigin, 0);
    ctx.stroke();
    // diagonal line
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.moveTo(distanceOrigin, 0);
    ctx.lineTo(mousex, mousey);
    ctx.stroke();
    
  }
  circleMaths(globalMouseX,globalMouseY, originX, originY);
}

function hotkeyHandler(e){
  let x = lastMousePos[0];
  let y = lastMousePos[1];

  if(e.key === 'x'){
    clickedPoints = [];
    drawingExtras = false;
  }
  if(e.key === 'z'){
    drawingExtras = !drawingExtras;
  }
  
  if(e.ctrlKey && e.key === 'ArrowUp'){
    keyMoveSpeed += 1;
  }
  if(e.ctrlKey && e.key === 'ArrowDown'){
    keyMoveSpeed -= 1;
  }

  if(!e.ctrlKey){
    if(e.key === 'ArrowUp'){
      lastMousePos = [x,y-keyMoveSpeed];
      globalMouseY -= keyMoveSpeed;
      calculateDistanceOrigin();
    }
    if(e.key === 'ArrowDown'){
      lastMousePos = [x,y+keyMoveSpeed];
      globalMouseY += keyMoveSpeed;
      calculateDistanceOrigin();
    }
    if(e.key === 'ArrowLeft'){
      lastMousePos = [x-keyMoveSpeed,y];
      globalMouseX -= keyMoveSpeed;
      calculateDistanceOrigin();
    }
    if(e.key === 'ArrowRight'){
      lastMousePos = [x+keyMoveSpeed,y];
      globalMouseX += keyMoveSpeed;
      calculateDistanceOrigin();
    }
  }

  if(e.key === 'Enter' || e.key === ' '){
    clickHandler();
  }
  renderCanvas(lastMousePos[0],lastMousePos[1]);
}


function circleMaths(x, y, a, b) {
  let coord;
  let output = '';
  if (document.getElementById("tempCoordText")) {
    document.getElementById("tempCoordText").remove();
  }

  coord = document.createElement('p');
  coord.id = 'tempCoordText';
  coord.style.position = 'absolute';
  coord.style.top = `${y}px`;
  coord.style.left = `${x}px`;
  coord.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';

  let relX = x - a;
  let relY = y - b;
  output += `Relative: (${relX.toFixed(2)}, ${relY.toFixed(2)})`;

  let rad = Math.atan2(relY, relX);
  output += `\nRadians: ${rad.toFixed(2)}`;

  let deg = rad * (180 / Math.PI);
  output += `\nDegrees: ${deg.toFixed(2)}`;

  output += `\nspeed:${keyMoveSpeed}`
  
  coord.textContent = output;
  document.body.appendChild(coord);
}

function init(){
  globalcenterX = resizeHandler()[0];
  globalcenterY = resizeHandler()[1];
  lastMousePos = [globalMouseX - globalcenterX,globalMouseY - globalcenterY];
  calculateDistanceOrigin();
  infoText.textContent = `cursor: (${globalMouseX}, ${globalMouseY})
center: (${globalcenterX}, ${globalcenterY})
distance: ${distanceOrigin}px
` + vectorHandler([globalcenterX,globalcenterY],[globalMouseX,globalMouseY]);
  renderCanvas(globalMouseX - globalcenterX,globalMouseY - globalcenterY);
}

init();
