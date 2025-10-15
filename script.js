// Author: Olivier LeGallee | latest update: Oct. 15th 2025 11:00am
// Uploaded to GitHub repository: "browserViewport-gamemaybe-", by user: "absurdo-liver"
// absurdo-liver => absurd-oliver alternative account | managed by the author
// P.S all "console.log()" functions log debug information to the JavaScript console
// start of script.js file

// declare constants
const infoText = document.getElementById('infoText');
const canvas = document.getElementById('cartesianCanvas');
const ctx = canvas.getContext('2d');

// declare variables, to be dynamically updated
var clickedPoints = [];
var lastMousePos = [];
var globalMouseX = 400;
var globalMouseY = 200;
var delta1 = [0, 0];
var delta2 = [0, 0];
var deltaSpeed = 0;
var piRel = 0;
var distanceOrigin;
var globalcenterX;
var globalcenterY;
var keyMoveSpeed = 1;
var drawingExtras = false;
var mouseMove = true;

// event listeners
window.addEventListener('mousemove', mouseMoveHandler);
window.addEventListener('keydown', hotkeyHandler);
canvas.addEventListener('click', clickHandler);

// mouse movement handler, handle mouse movement
function mouseMoveHandler(e) {
	if (mouseMove) {
		globalcenterX = resizeHandler()[0];
		globalcenterY = resizeHandler()[1];
		globalMouseX = e.clientX;
		globalMouseY = e.clientY;
		lastMousePos = [e.clientX - globalcenterX, e.clientY - globalcenterY];
		calculateDistanceOrigin();
		deltaSpeedHandler();
		infoTextHandler();
		renderCanvas(e.clientX - globalcenterX, e.clientY - globalcenterY);
    console.log('ran mouseMoveHandler() with mouseMove');
	} else {
    console.log('ran mouseMoveHandler() without mouseMove');
		return
	}
}

// delta speed handler, handle speed calculations, somewhat misleading name (oops)
function deltaSpeedHandler() {
	delta2 = delta1;
	delta1 = [globalMouseX, globalMouseY];
	deltaSpeed = Math.round(Math.hypot(delta1[0] - delta2[0], delta1[1] - delta2[1]) * 1000) / 1000;
  console.log('ran deltaSpeedHandler() & updated deltaSpeed & co.');
}

// inforamtion text handler, handle dynamic updating of information text
function infoTextHandler() {
	infoText.textContent = `cursor: (${globalMouseX}, ${globalMouseY})
  center: (${globalcenterX}, ${globalcenterY})
  distance: ${distanceOrigin}px
  ` + vectorHandler([globalcenterX, globalcenterY], [globalMouseX, globalMouseY]);
  console.log('ran infoTextHandler() & updated infoText');
}

// click handler, handle adding points to be drawn and saving their position, somewhat misleading name again (oops.v2)
function clickHandler() {
	clickedPoints.push({
		x: lastMousePos[0],
		y: lastMousePos[1]
	});
	renderCanvas(lastMousePos[0], lastMousePos[1]);
  console.log('ran clickHandler(), updated clickedPoints & called renderCanvas()');
}

// resize handler, handle calculations updating stored width and height in case of window resize
function resizeHandler() {
	let centerX = Math.round(window.innerWidth / 2);
	let centerY = Math.round(window.innerHeight / 2);
  console.log('ran resizeHandler(), updated centerX|centerY & called returned them');
	return [centerX, centerY];
}

// vector handler, handle calculating vector and display text
function vectorHandler(origin, coordinates) {
	let x = coordinates[0] - origin[0];
	let y = coordinates[1] - origin[1];
  console.log('ran vectorHandler() & updated vector text');
	return `v = (${x}, ${y})`;
}

// calculate distance origin, handle calculating distance from origin
function calculateDistanceOrigin() {
	distanceOrigin = Math.round(Math.hypot(globalMouseX - globalcenterX, globalMouseY - globalcenterY) * 1000) / 1000;
  console.log('ran calculateDistanceOrigin() & updated distanceOrigin');
}

// draw point, handle drawing a single point, called be renderCanvas() that uses stored info provided by clickHandler()
function drawPoint(ctx, x, y) {
	ctx.fillStyle = 'black';
	ctx.beginPath();
	ctx.arc(x, y, 2, 0, Math.PI * 2, true);
	ctx.fill();
  console.log('ran drawPoint() & rendered point');
}

// render canvas, handle rendering canvas and all its components, excluding single points (handled by calling drawPoint())
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
	ctx.lineTo(0, canvasHeight - originY); // y-axis
	ctx.stroke();

	for (let i = -canvasWidth; i < canvasWidth; i += canvasWidth / 20) {
		ctx.beginPath();
		ctx.strokeStyle = 'grey';
		ctx.lineWidth = 1;
		ctx.moveTo(-originX, i);
		ctx.lineTo(canvasWidth - originX, i); // x-axis
		ctx.moveTo(i, -originY);
		ctx.lineTo(i, canvasHeight - originY); // y-axis
		ctx.stroke();
	}

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
	if (drawingExtras) {
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


		ctx.beginPath();
		ctx.arc(0, 0, distanceOrigin / 10, piRel * Math.PI, 0);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 3;
		ctx.stroke();
	}
	cursorDisplay(globalMouseX, globalMouseY, originX, originY);
  console.log('ran renderCanvas() & rendered canvas & co.');
}

// hotkey handler, handle hotkey commands, inluding movement keys
function hotkeyHandler(e) {
	let x = lastMousePos[0];
	let y = lastMousePos[1];

	if (e.key === 'x') {
		clickedPoints = [];
		drawingExtras = false;
	}
	if (e.key === 'z') {
		drawingExtras = !drawingExtras;
	}
	if (e.key === 'c') {
		mouseMove = !mouseMove;
		if (!mouseMove) {
			document.getElementById('mouseMoveToggleShow').textContent = '(off)';
		} else {
			document.getElementById('mouseMoveToggleShow').textContent = '(on)';
		}

	}

	if (e.ctrlKey && e.key === 'ArrowUp') {
		if (keyMoveSpeed < 20) {
			keyMoveSpeed += 1;
		}
		keyMoveSpeed += 0;
	}
	if (e.ctrlKey && e.key === 'ArrowDown') {
		if (keyMoveSpeed > 1) {
			keyMoveSpeed -= 1;
		}
		keyMoveSpeed -= 0;
	}

	if (!e.ctrlKey) {
		if (e.key === 'ArrowUp') {
			lastMousePos = [x, y - keyMoveSpeed];
			globalMouseY -= keyMoveSpeed;
			calculateDistanceOrigin();
		}
		if (e.key === 'ArrowDown') {
			lastMousePos = [x, y + keyMoveSpeed];
			globalMouseY += keyMoveSpeed;
			calculateDistanceOrigin();
		}
		if (e.key === 'ArrowLeft') {
			lastMousePos = [x - keyMoveSpeed, y];
			globalMouseX -= keyMoveSpeed;
			calculateDistanceOrigin();
		}
		if (e.key === 'ArrowRight') {
			lastMousePos = [x + keyMoveSpeed, y];
			globalMouseX += keyMoveSpeed;
			calculateDistanceOrigin();
		}
	}

	if (e.key === 'Enter' || e.key === ' ') {
		clickHandler();
	}

	infoTextHandler();
	deltaSpeedHandler();
	renderCanvas(lastMousePos[0], lastMousePos[1]);
  console.log('ran hotkeyHandler() & handled hotkeys');
}

// cursor display, handle text display @ cursor
function cursorDisplay(x, y, a, b) {
	let coord;
	let output = '';
	let relX = x - a;
	let relY = y - b;
	let deg = Math.abs(Math.atan2(relY, relX)) * (180 / Math.PI);
	piRel = Math.atan2(relY, relX) / Math.PI;

	if (document.getElementById("tempCoordText")) {
		document.getElementById("tempCoordText").remove();
	}

	coord = document.createElement('p');
	coord.id = 'tempCoordText';
	coord.style.position = 'absolute';
	coord.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
	coord.style.top = `${y}px`;
	coord.style.left = `${x}px`;


	output += `Relative: (${relX.toFixed(2)}, ${relY.toFixed(2)})`;
	if (drawingExtras) {
		if (piRel <= 0) {
			output += `\nPi: ${Math.abs(piRel).toFixed(2)}`;
			output += `\nDegrees: ${deg.toFixed(2)}`;
		} else {
			output += `\nPi: ${Math.abs(2-piRel).toFixed(2)}`;
			output += `\nDegrees: ${(360-deg).toFixed(2)}`;
		}
	}
	output += `\nspeed(keys):${keyMoveSpeed}`;
	output += `\nspeed(Δ):${deltaSpeed}`;
	coord.textContent = output;
	document.body.appendChild(coord);
  console.log('ran cursorDisplay(), updated & appended coords');
}

// initialization, handles initialization
function init() {
	globalcenterX = resizeHandler()[0];
	globalcenterY = resizeHandler()[1];
	lastMousePos = [globalMouseX - globalcenterX, globalMouseY - globalcenterY];
	calculateDistanceOrigin();
	infoText.textContent = `cursor: (${globalMouseX}, ${globalMouseY})
  center: (${globalcenterX}, ${globalcenterY})
  distance: ${distanceOrigin}px
  ` + vectorHandler([globalcenterX, globalcenterY], [globalMouseX, globalMouseY]);
	renderCanvas(globalMouseX - globalcenterX, globalMouseY - globalcenterY);
  console.log('ran init() & initialized');
}

// run only once DOM content is loaded, call init()
window.addEventListener("DOMContentLoaded", init);
