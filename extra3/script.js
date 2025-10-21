const testElement = document.getElementById('testElement');
const cursorP = document.getElementById('cursorP');
const mousePosCurrent = document.getElementById('mousePosCurrent');
const mouseClickCurrent = document.getElementById('mouseClickCurrent');
const mouseWheelScroll = document.getElementById('mouseWheelScroll');
const mouseIsMoving = document.getElementById('mouseIsMoving');
const rangeBar = document.getElementById('rangeBar');
const rangeValue = document.getElementById('rangeValue');

var sizeMult = 1;
var cursorSizeMult = 1;
var intervalId = null; 
var isUpdatingArray = false;
var mousePositionsHistory = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

var mouseDetails = {
  currentPosition: [100, 100],
  previousPosition: [100,100],
  leftClick: false,
  middleClick: false,
  rightClick: false,
  isMoving: false
};

var offset = {
  x: 0,
  y: 0
};

window.addEventListener('wheel', scrollHandler);
window.addEventListener('mousemove', mouseMovementHandler);
window.addEventListener('mousedown', mouseClickHandler);
window.addEventListener('mouseup', mouseUpHandler);
window.addEventListener('contextmenu', function(e) { e.preventDefault(); });
window.addEventListener('keydown', keyHandler);
rangeBar.addEventListener('input', rangeSliderHandler)

testElement.style.left = `${mouseDetails.currentPosition[0]}px`;
testElement.style.top = `${mouseDetails.currentPosition[1]}px`;

function mouseMovementHandler(e) {
  if (e) {
    mouseDetails.currentPosition = [e.clientX, e.clientY];
  }

  isUpdatingArray = false;
  
  mousePositionsHistory.unshift([...mouseDetails.currentPosition]);
  mousePositionsHistory.pop();

  mousePosCurrent.textContent = `(${mouseDetails.currentPosition.join(', ')})`;

  moveElement(testElement);
}

function moveElement(elem) {
  if (mouseDetails.leftClick) {
    let newPosX = mouseDetails.currentPosition[0] - offset.x;
    let newPosY = mouseDetails.currentPosition[1] - offset.y;
    elem.style.left = `${newPosX}px`;
    elem.style.top = `${newPosY}px`;
  }
  cursorP.style.left = `calc(${mouseDetails.currentPosition[0]}px - 0.5em)`;
  cursorP.style.top = `calc(${mouseDetails.currentPosition[1]}px - 0.5em)`;

  for(let i = 0; i < mousePositionsHistory.length; i++){
    if(!document.getElementById(`newElem${i+1}`)){
    const newElem = document.createElement('p');
      newElem.id = `newElem${i+1}`;
      newElem.style.margin= `0px`;
      newElem.style.position = `absolute`;
      newElem.style.width = `1em`;
      newElem.style.height = `1em`;
      newElem.style.display = `flex`;
      newElem.style.justifyContent = `center`;
      newElem.style.alignItems = `center`;
      newElem.style.zIndex = '1';
      newElem.textContent = '+';
      document.body.appendChild(newElem);
    }       // OPACITY GOES DOWN THE FARTHER AWAY FROM OG CURSOR ADDDDD!!!!!
    document.getElementById(`newElem${i+1}`).style.left = `calc(${mousePositionsHistory[i][0]}px - 0.5em)`;
    document.getElementById(`newElem${i+1}`).style.top = `calc(${mousePositionsHistory[i][1]}px - 0.5em)`;
  }
}

function updateElemSize(elem) {
  let baseFontSize = 16;
  elem.style.fontSize = `${sizeMult * baseFontSize}px`;
};

function mouseClickHandler(e) {
  if (e.button === 0) {
    mouseDetails.leftClick = true;
    offset.x = e.clientX - testElement.offsetLeft;
    offset.y = e.clientY - testElement.offsetTop;
    mouseClickCurrent.textContent = 'left-click';
  } else if (e.button === 1) {
    mouseDetails.middleClick = true;
    mouseClickCurrent.textContent = 'middle-click';
  } else if (e.button === 2) {
    mouseDetails.rightClick = true;
    mouseClickCurrent.textContent = 'right-click';
  }
}

function mouseUpHandler() {
  mouseDetails.leftClick = false;
  mouseDetails.middleClick = false;
  mouseDetails.rightClick = false;
  mouseClickCurrent.textContent = 'up';
}

function scrollHandler(e) {
    e.preventDefault();
    if (e.deltaY > 0) {
        sizeMult -= 0.1;
    } else {
        sizeMult += 0.1;
    }
    const sign = e.deltaY <= 0 ? 'up' : 'down';
    sizeMult = Math.round(sizeMult * 1000) / 1000;
    mouseWheelScroll.textContent = `${sizeMult}x [${sign}]`;
    sizeMult = Math.max(0.2, Math.min(9.9, sizeMult));
    updateElemSize(testElement);
}

function keyHandler(e) {
  if (e.key === 'c') {
    sizeMult = 1;
    updateElemSize(testElement);
    mouseWheelScroll.textContent = `${sizeMult}x [reset]`;
  }
  if (e.key === '=') {
    cursorSizeMult += 0.1;
    cursorP.style.fontSize = `${cursorSizeMult * 16}px`;
  }
  if (e.key === '-') {
    cursorSizeMult -= 0.1;
    cursorP.style.fontSize = `${cursorSizeMult * 16}px`;
  }
}


function rangeSliderHandler(e){
  rangeValue.textContent = rangeBar.value
  for(let i = 0; i < mousePositionsHistory.length; i++){
    document.getElementById(`newElem${i+1}`).remove();
  }
  mousePositionsHistory = [];
  for(let i = 0; i < rangeBar.value; i++){
    mousePositionsHistory.push([0,0]);
  }
}



const movementCheckInterval = setInterval(() => {

  mouseDetails.isMoving = (mouseDetails.currentPosition[0] !== mouseDetails.previousPosition[0] || mouseDetails.currentPosition[1] !== mouseDetails.previousPosition[1]);
  
  if (!mouseDetails.isMoving && !isUpdatingArray) {
    isUpdatingArray = true;

    const firstPosition = mousePositionsHistory[0];
    const allSame = mousePositionsHistory.every(pos => pos[0] === firstPosition[0] && pos[1] === firstPosition[1]);
    
    if (allSame) {
      isUpdatingArray = false;
    } else {
      for (let i = mousePositionsHistory.length - 1; i > 0; i--) {
        mousePositionsHistory[i] = mousePositionsHistory[i - 1].slice();
      }
      moveElement(false);
    }
  }

  mouseDetails.previousPosition = mouseDetails.currentPosition.slice();
  mouseIsMoving.textContent = mouseDetails.isMoving;
}, 100);

setInterval(() => {
  document.getElementById('historyArray').textContent = mousePositionsHistory.join(', ');
}, 100);




