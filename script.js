const test = document.getElementById('test');
const canvas = document.getElementById('cartesianCanvas');
const ctx = canvas.getContext('2d');

window.addEventListener('mousemove', inputHandler);

function resizeHandler(){
  let centerX = Math.round(window.innerWidth / 2);
  let centerY = Math.round(window.innerHeight / 2);
  return [centerX,centerY];
}

function inputHandler(e){
  let centerX = resizeHandler()[0];
  let centerY = resizeHandler()[1];
  let distanceOrigin = Math.round(Math.hypot(e.clientX - centerX, e.clientY - centerY)*1000)/1000;
  test.textContent = 
`cursor: (${e.clientX}, ${e.clientY})
center: (${centerX}, ${centerY})
distance: ${distanceOrigin}px
` + vectorHandler([centerX,centerY],[e.clientX,e.clientY]);
}


function vectorHandler(origin, coordinates){
  let x = coordinates[0] - origin[0];
  let y = coordinates[1] - origin[1];
  return `v = (${x}, ${y})`;
}

function renderCanvas(){
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let originX = resizeHandler()[0];
let originY = resizeHandler()[1];
let scale = 20; // Pixels per unit

// Set up coordinate system
ctx.translate(originX, originY); // Move origin to the center
// ctx.scale(1, -1); // Flip the Y-axis to match Cartesian coordinates

// Draw the X and Y axes
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.moveTo(-originX, 0);
ctx.lineTo(canvasWidth - originX, 0); // X-axis
ctx.moveTo(0, -originY);
ctx.lineTo(0, canvasHeight - originY); // Y-axis
ctx.stroke();

// Draw a sample line
ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.lineWidth = 2;
ctx.moveTo(0 * scale, 0 * scale);
ctx.lineTo(5 * scale, 10 * scale);
ctx.stroke();

// Draw a sample point
ctx.beginPath();
ctx.fillStyle = 'blue';
ctx.arc(5 * scale, 10 * scale, 3, 0, 2 * Math.PI);
ctx.fill();
}

renderCanvas();
