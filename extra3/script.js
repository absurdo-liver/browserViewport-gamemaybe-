const testElement = document.getElementById('testElement');
const cursorP = document.getElementById('cursorP');
const mousePosCurrent = document.getElementById('mousePosCurrent');
const mouseClickCurrent = document.getElementById('mouseClickCurrent');
const mouseWheelScroll = document.getElementById('mouseWheelScroll');
const mouseIsMoving = document.getElementById('mouseIsMoving');
const rangeBar = document.getElementById('rangeBar');
const rangeValue = document.getElementById('rangeValue');
const prettyCollectToggle = document.getElementById('prettyCollectToggle');

var sizeMult = 1;
var cursorSizeMult = 1;
var globalI = 1;
var baseFontSize = 16;
var intervalId = null; 
var proccessCollect = false;
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
rangeBar.addEventListener('input', rangeSliderHandler);
prettyCollectToggle.addEventListener('click', () => {
  proccessCollect = !proccessCollect;
  prettyCollectToggle.textContent = proccessCollect ? 'Pretty Collect: on' : 'Pretty Collect: off';
});

testElement.style.left = `${mouseDetails.currentPosition[0]}px`;
testElement.style.top = `${mouseDetails.currentPosition[1]}px`;

function mouseMovementHandler(e) {
  if (e) {
    mouseDetails.currentPosition = [e.clientX, e.clientY];
  }
  
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
      newElem.textContent = '+';
      newElem.style.margin= `0px`;
      newElem.style.position = `absolute`;
      newElem.style.width = `1em`;
      newElem.style.height = `1em`;
      newElem.style.display = `flex`;
      newElem.style.justifyContent = `center`;
      newElem.style.alignItems = `center`;
      newElem.style.zIndex = `1`;
      newElem.style.opacity = `${100 - i*(mousePositionsHistory.length/100)}%`;
      document.body.appendChild(newElem);
    }
    document.getElementById(`newElem${i+1}`).style.left = `calc(${mousePositionsHistory[i][0]}px - 0.5em)`;
    document.getElementById(`newElem${i+1}`).style.top = `calc(${mousePositionsHistory[i][1]}px - 0.5em)`;
    updateCursorElemSize();
  }
}

function updateElemSize(elem) {
  elem.style.fontSize = `${sizeMult * baseFontSize}px`;
};

function updateCursorElemSize() {
  newSize = `${cursorSizeMult * baseFontSize}px`;
  cursorP.style.fontSize = newSize;
  for(let i = 0; i < mousePositionsHistory.length; i++){
    if(document.getElementById(`newElem${i+1}`)){
      document.getElementById(`newElem${i+1}`).style.fontSize = newSize;
    }
  }
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
    updateCursorElemSize();
  }
  if (e.key === '-') {
    cursorSizeMult -= 0.1;
    updateCursorElemSize();
  }
}


function rangeSliderHandler(){
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
  if(mouseDetails.isMoving) {
    globalI = 1;
    for(let i = 0; i < mousePositionsHistory.length; i++){
      document.getElementById(`newElem${i+1}`).classList.remove('opacityTransitions');
    }
  }
  if(!mouseDetails.isMoving && !proccessCollect){
    if(globalI < mousePositionsHistory.length + 1){
      mousePositionsHistory[(mousePositionsHistory.length - globalI)] = mousePositionsHistory[0];
      globalI++
      moveElement(testElement);
    }
  } else if(!mouseDetails.isMoving && proccessCollect){
    if(globalI < mousePositionsHistory.length + 1){
      mousePositionsHistory[(mousePositionsHistory.length - globalI)] = mousePositionsHistory[0];
      globalI++
      moveElement(testElement);
    }
    for(let i = 0; i < mousePositionsHistory.length; i++){
      document.getElementById(`newElem${i+1}`).classList.add('opacityTransitions');
    }
  }

  mouseDetails.previousPosition = mouseDetails.currentPosition;
  mouseIsMoving.textContent = mouseDetails.isMoving;
}, 25);




