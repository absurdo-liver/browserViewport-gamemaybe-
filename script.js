const infoText = document.getElementById('infoText');
const canvas = document.getElementById('cartesianCanvas');
const ctx = canvas.getContext('2d');

var clickedPoints = [];
var lastMousePos = [];
var distanceOrigin = 0;
drawingExtras = false;

window.addEventListener('mousemove', mouseMoveHandler);
window.addEventListener('keydown', hotkeyHandler);
canvas.addEventListener('click', clickHandler);


function mouseMoveHandler(e){
  let centerX = resizeHandler()[0];
  let centerY = resizeHandler()[1];
  distanceOrigin = Math.round(Math.hypot(e.clientX - centerX, e.clientY - centerY)*1000)/1000;
  infoText.textContent = `cursor: (${e.clientX}, ${e.clientY})
center: (${centerX}, ${centerY})
distance: ${distanceOrigin}px
` + vectorHandler([centerX,centerY],[e.clientX,e.clientY]);
  lastMousePos = [e.clientX - centerX,e.clientY - centerY];
  renderCanvas(e.clientX - centerX,e.clientY - centerY);
}

function clickHandler(e) {
  let centerX = resizeHandler()[0];
  let centerY = resizeHandler()[1];
  clickedPoints.push({
    x: e.clientX - centerX,
    y: e.clientY - centerY
  });
  renderCanvas(e.clientX - centerX,e.clientY - centerY);
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
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 3;
    ctx.stroke();  
    // vertical line
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.moveTo(mousex, 0);
    ctx.lineTo(mousex, mousey);
    ctx.stroke();
    // horizontal line
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(mousex, 0);
    ctx.stroke();

  } else {return}
}

function hotkeyHandler(e){
  if(e.key === 'x'){
    clickedPoints = [];
    drawingExtras = false;
    renderCanvas(lastMousePos[0],lastMousePos[1]);
  } else if(e.key === 'z'){
    if(!drawingExtras){
      drawingExtras = true;
    } else {
      drawingExtras = false;
    }
    renderCanvas(lastMousePos[0],lastMousePos[1]);
  } else {return}
}


renderCanvas(0,0);
