console.log('script.js loading');
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
const drawButton = document.getElementById('drawButton');

var gridSize = window.innerWidth / 20;
var pointDensity = 0.1;
var pastWidth = 0;
var pastHeight = 0;
var currentWidth = window.innerWidth;
var currentHeight = window.innerHeight;
var currentOrigin = [currentWidth / 2, currentHeight / 2];

var funToCall = [];
var funToCallPrev = []; // add ctrl-z functionality later !
var n = 0;
var lastClick = -1;

window.addEventListener('keydown', keyEventDown);
window.addEventListener('keyup', keyEventUp);
window.addEventListener('mousedown', function(event) {
	if (event.button === 0) {
		lastClick = 0;
	} else if (event.button === 2) {
		lastClick = 2;
	}
});

window.addEventListener('mouseup', function(event) {
	setTimeout(() => {
		lastClick = -1;
	}, 250)
});

window.addEventListener('contextmenu', function(event) {
	event.preventDefault();
	console.log("prevented context menu !");
});
selectionBox.addEventListener('change', selection);
drawButton.addEventListener('click', callRendering);
aInput.addEventListener('keydown', checkInputsBeforeCall);
bInput.addEventListener('keydown', checkInputsBeforeCall);
cInput.addEventListener('keydown', checkInputsBeforeCall);
hInput.addEventListener('keydown', checkInputsBeforeCall);
kInput.addEventListener('keydown', checkInputsBeforeCall);
pInput.addEventListener('keydown', checkInputsBeforeCall);
rInput.addEventListener('keydown', checkInputsBeforeCall);
limitsMinInput.addEventListener('keydown', checkInputsBeforeCall);
limitsMaxInput.addEventListener('keydown', checkInputsBeforeCall);
colorInput.addEventListener('keydown', checkInputsBeforeCall);
trigRatioInput.addEventListener('keydown', checkInputsBeforeCall);
paramInput.addEventListener('keydown', checkInputsBeforeCall);
sysInput.addEventListener('keydown', checkInputsBeforeCall);
figureInput.addEventListener('keydown', checkInputsBeforeCall);
pointArrayInput.addEventListener('keydown', checkInputsBeforeCall);

function checkInputsBeforeCall(e) {
	if (e.key === 'Enter') {
		callRendering();
	}
}

function hideAllInputs() {
	console.log('hiding inputs');
	aInput.classList.add('hidden');
	bInput.classList.add('hidden');
	cInput.classList.add('hidden');
	hInput.classList.add('hidden');
	kInput.classList.add('hidden');
	pInput.classList.add('hidden');
	rInput.classList.add('hidden');
	paramInput.classList.add('hidden');
	trigRatioInput.classList.add('hidden');
	sysInput.classList.add('hidden');
	figureInput.classList.add('hidden');
	pointArrayInput.classList.add('hidden');
	colorInput.classList.add('hidden');
	limitsMinInput.classList.add('hidden');
	limitsMaxInput.classList.add('hidden');
	console.log('success hideAllInputs');
}

function selection() {
	console.log('starting selection function');
	let opt = selectionBox.value;

	hideAllInputs();

	if (opt === 'drawLinearStandard') {
		console.log('chosing linear');
		aInput.classList.remove('hidden')
		bInput.classList.remove('hidden')
		cInput.classList.remove('hidden')
		colorInput.classList.remove('hidden')
		limitsMinInput.classList.remove('hidden')
		limitsMaxInput.classList.remove('hidden')
		console.log('chose success');
	} else if (opt === 'drawPolynomialVertex') {
		console.log('chosing polynomial');
		aInput.classList.remove('hidden')
		hInput.classList.remove('hidden')
		kInput.classList.remove('hidden')
		pInput.classList.remove('hidden')
		colorInput.classList.remove('hidden')
		limitsMinInput.classList.remove('hidden')
		limitsMaxInput.classList.remove('hidden')
		console.log('chose success');
	} else if (opt === 'drawExp') {
		console.log('chosing exponential');
		aInput.classList.remove('hidden')
		bInput.classList.remove('hidden')
		colorInput.classList.remove('hidden')
		limitsMinInput.classList.remove('hidden')
		limitsMaxInput.classList.remove('hidden')
		console.log('chose success');
	} else if (opt === 'drawTrigRatio') {
		console.log('chosing trig');
		aInput.classList.remove('hidden')
		hInput.classList.remove('hidden')
		kInput.classList.remove('hidden')
		paramInput.classList.remove('hidden')
		trigRatioInput.classList.remove('hidden')
		colorInput.classList.remove('hidden')
		limitsMinInput.classList.remove('hidden')
		limitsMaxInput.classList.remove('hidden')
		console.log('chose success');
	} else if (opt === 'drawAngle') {
		console.log('chosing angle');
		aInput.classList.remove('hidden')
		rInput.classList.remove('hidden')
		colorInput.classList.remove('hidden')
		sysInput.classList.remove('hidden')
		console.log('chose success');
	}
	/* else if(opt === 'drawGeometry'){
    console.log('chosing geometry');
    figureInput.classList.remove('hidden')
    pointArrayInput.classList.remove('hidden')
    colorInput.classList.remove('hidden')
    console.log('chose success');
  }                                             */
	console.log('success selection');
}

function callRendering() {
	console.log('starting callRandering');
	let opt = selectionBox.value;
	let a = parseFloat(aInput.value);
	let b = parseFloat(bInput.value);
	let c = parseFloat(cInput.value);
	let h = parseFloat(hInput.value);
	let k = parseFloat(kInput.value);
	let p = parseFloat(pInput.value);
	let r = parseFloat(rInput.value);
	let sys = sysInput.value
	let param = paramInput.value;
	let color = colorInput.value;
	let limits = [parseFloat(limitsMinInput.value), parseFloat(limitsMaxInput.value)];
	let trigRatio = trigRatioInput.value;

	if (opt === 'clear') {
		console.log('chosing clear');
		funToCall.length = 0;
		n = 0;
		localStorage.setItem('drawnFunctions', JSON.stringify(funToCall));
		localStorage.setItem('')
		console.log('chose success');
	} else if (opt === 'drawLinearStandard') {
		console.log('chosing linear');
		funToCall.push({
			func: drawLinearStandard,
			args: [a, b, c, color, limits],
			name: 'drawLinearStandard',
			count: n + 1
		});
		console.log('chose success');
	} else if (opt === 'drawPolynomialVertex') {
		console.log('chosing polynomial');
		funToCall.push({
			func: drawPolynomialVertex,
			args: [a, h, k, p, color, limits],
			name: 'drawPolynomialVertex',
			count: n + 1
		});
		console.log('chose success');
	} else if (opt === 'drawExp') {
		console.log('chosing exponetial');
		funToCall.push({
			func: drawExp,
			args: [a, b, color, limits],
			name: 'drawExp',
			count: n + 1
		});
		console.log('chose success');
	} else if (opt === 'drawTrigRatio') {
		console.log('chose trig ratio');
		funToCall.push({
			func: drawTrigRatio,
			args: [trigRatio, param, a, h, k, color, limits],
			name: 'drawTrigRatio',
			count: n + 1
		});
		console.log('chose success');
	} else if (opt === 'drawAngle') {
		console.log('chosing angle');
		funToCall.push({
			func: drawAngle,
			args: [sys, a, r, color],
			name: 'drawAngle',
			count: n + 1
		});
		console.log('chose success');
	}
	/*  else if(opt === 'drawGeometry'){
	   console.log('chosing geometry');
	   let figure = figureInput.value;
	   let pointArray = pointArrayParse(pointArrayInput.value);
	   let color = colorInput.value;
	   funToCall.push({
	     func: drawGeometry, 
	     args: [figure, pointArray, color],
	     name: 'drawGeometry',
	     count: n
	   });
	   console.log('chose success');
	 }                                                             */
	n += 1;
	updateButtons();
	console.log('success callRendering');
}

function pointArrayParse(textToParse) {
	let output = [];
	textToParse = textToParse.replaceAll(' ', '');
	textToParse = textToParse.replace('(', '');
	textToParse = textToParse.replaceAll('),(', '|');
	textToParse = textToParse.replace(')', '');
	textToParse = textToParse.split('|');
	console.log('normalized inputs');
	for (let i = 0; i < textToParse.length; i++) {
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
	if (typeof color != 'string') return
	if (limits[0] === '' || limits[1] === '') {
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

	if (typeof color != 'string') {
		console.log('color != string, returning');
		return;
	}
	if (limits[0] === '' || limits[1] === '') {
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

	if (typeof color != 'string') {
		console.log('color != string, returning');
		return;
	}
	if (limits[0] === '' || limits[1] === '') {
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
	if (typeof color != 'string') return
	if (typeof param != 'string') return
	if (typeof trigRatio != 'string') return
	if (limits[0] === '' || limits[1] === '') {
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
	if (typeof sys !== 'string' || typeof color !== 'string') return
	if (sys !== 'rad' && sys !== 'deg') return
	if (typeof a !== 'number' || typeof r !== 'number' || r <= 0) return

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

//function drawGeometry(figure, pointArray, color) {
// self explanitory
// ctx.beginPath();
// ctx.moveTo(x1, y1);
// ctx.lineTo(x2, y2);
// ctx.stroke();
//}


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
		console.log('keydown:' + e.key);
	}
	if (e.key === 'Alt') {
		altStatus.textContent = 'alt status: down';
		altIsPressed = true;
		console.log('keydown:' + e.key);
	}
	if (e.key === 'Shift') {
		shiftStatus.textContent = 'shift status: down';
		shiftIsPressed = true;
		console.log('keydown:' + e.key);
	}
}

function keyEventUp(e) {
	if (e.key === 'Control') {
		console.log('keyup:' + e.key);
		ctrlStatus.textContent = 'ctrl status: up';
		ctrlIsPressed = false;
	}
	if (e.key === 'Alt') {
		console.log('keyup:' + e.key);
		altStatus.textContent = 'alt status: up';
		altIsPressed = false;
	}
	if (e.key === 'Shift') {
		console.log('keyup:' + e.key);
		shiftStatus.textContent = 'shift status: up';
		shiftIsPressed = false;
	}
}

function updateButtons() {
	document.getElementById('functionsToCall').innerHTML += `
    <button 
    id='drawnButton${funToCall[n-1].count}' 
    onClick='buttonsClickHandler(${funToCall[n-1].count})' 
    class='drawnButtonsClass'
    >
    [#${funToCall[n-1].count}] ${funToCall[n-1].name} | ${funToCall[n-1].args.join(', ')}
    </button>
    `;
    document.getElementById('hiddenBehind').innerHTML += `
    <p 
    id='drawnButton${funToCall[n-1].count}hiddenText' 
    class='hiddenTextBehind'
    >
     click to delete 
    </p>
    `;
}

function buttonsClickHandler(i) {
	if (lastClick === 0) {
		if (funToCall[i - 1]) {
			n -= 1;
			for (let a = 0; a < funToCall.length; a++) {
				if (funToCall[a].count === i) {
					funToCall.splice(a, 1);
					break
				}
			}
			document.getElementById('functionsToCall').innerHTML = '';
            document.getElementById('hiddenBehind').innerHTML = '';
			for (let b = 0; b < n; b++) {
				funToCall[b].count = b + 1;
				document.getElementById('functionsToCall').innerHTML += `
    <button 
    id='drawnButton${funToCall[b].count}' 
    onClick='buttonsClickHandler(${funToCall[b].count})' 
    class='drawnButtonsClass'
    >
    [#${funToCall[b].count}] ${funToCall[b].name} | ${funToCall[b].args.join(', ')}
    </button>
    `;
    document.getElementById('hiddenBehind').innerHTML += `
    <p 
    id='drawnButton${funToCall[b].count}hiddenText' 
    class='hiddenTextBehind'
    >
     click to delete 
    </p>
    `;
			}

		}
	}
}

let gridCheckInterval = setInterval(() => {
	gridSize = window.innerWidth / 20;
	currentWidth = window.innerWidth;
	currentHeight = window.innerHeight;
	currentOrigin = [currentWidth / 2, currentHeight / 2];
}, 100);

function updateButtonsOnLoad() {
	document.getElementById('functionsToCall').innerHTML = '';
    document.getElementById('hiddenBehind').innerHTML = '';
	for (let i = 0; i < funToCall.length; i++) {
		n += 1;
		document.getElementById('functionsToCall').innerHTML += `
    <button 
    id='drawnButton${funToCall[i].count}' 
    onClick='buttonsClickHandler(${i+1})' 
    class='drawnButtonsClass'
    >
    [#${funToCall[i].count}] ${funToCall[i].name} | ${funToCall[i].args.join(', ')}
    </button>
    `;
    document.getElementById('hiddenBehind').innerHTML += `
    <p 
    id='drawnButton${funToCall[i].count}hiddenText' 
    class='hiddenTextBehind'
    >
     click to delete 
    </p>
    `;
	}
}

function localLoad() {
	let stored = localStorage.getItem('drawnFunctions');

	if (!stored) {
		console.log('no local saved state, creating one...');
		funToCall = [];
		localStorage.setItem('drawnFunctions', JSON.stringify(funToCall));
	} else {
		try {
			funToCall = JSON.parse(stored);
			// Reattach the real function references using the name
			funToCall.forEach(obj => {
				if (typeof window[obj.name] === 'function') {
					obj.func = window[obj.name];
				}
			});
			updateButtonsOnLoad();
			console.log('loaded local saved state');
		} catch (err) {
			console.error('failed to load saved state:', err);
			funToCall = [];
		}
	}

	// Autosave every 10 seconds
	setInterval(() => {
		localStorage.setItem('drawnFunctions', JSON.stringify(funToCall));
		console.log('[autosaved draw state]');
    }, 10000);
}



requestAnimationFrame(renderCanvas);
window.addEventListener('DOMContentLoaded', localLoad);
console.log('script.js loaded');