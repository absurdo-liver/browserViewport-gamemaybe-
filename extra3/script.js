const testElement = document.getElementById('testElement');
const mousePosCurrent = document.getElementById('mousePosCurrent');
const mousePosMostRecent = document.getElementById('mousePosMostRecent');
const mousePosRecent1 = document.getElementById('mousePosRecent1');
const mousePosRecent2 = document.getElementById('mousePosRecent2');
const mousePosRecent3 = document.getElementById('mousePosRecent3');
const mousePosLeastRecent = document.getElementById('mousePosLeastRecent');
const mouseClickCurrent = document.getElementById('mouseClickCurrent');
const mouseWheelScroll = document.getElementById('mouseWheelScroll');

var sizeMult = 1;
var lastScrollY = window.scrollY;
const elemInitWidth = parseFloat(testElement.style.width);

var mouseDetails = {
  currentPostion: [100, 100],
  leftClick: false,
  middleClick: false,
  rightClick: false,
};

var lastMousePostions = {
  mostRecent: [0, 0],
  recent1: [0, 0],
  recent2: [0, 0],
  recent3: [0, 0],
  leastRecent: [0, 0],
};

var offset = {
  x: 0,
  y: 0
};

window.addEventListener('wheel', scrollHandler);
window.addEventListener('mousemove', mouseMovementHandler);
window.addEventListener('mousedown', mouseClickHandler);
window.addEventListener('mouseup', mouseUpHandler);
window.addEventListener('contextmenu', function(e) {e.preventDefault();});

function mouseMovementHandler(e) {
  mouseDetails.currentPostion[0] = e.clientX;
  mouseDetails.currentPostion[1] = e.clientY;

  lastMousePostions.leastRecent = [...lastMousePostions.recent3];
  lastMousePostions.recent3 = [...lastMousePostions.recent2];
  lastMousePostions.recent2 = [...lastMousePostions.recent1];
  lastMousePostions.recent1 = [...lastMousePostions.mostRecent];
  lastMousePostions.mostRecent = [...mouseDetails.currentPostion];

  mousePosCurrent.textContent = `(${mouseDetails.currentPostion.join(', ')})`;
  setTimeout(() => {mousePosMostRecent.textContent = `(${lastMousePostions.mostRecent.join(', ')})`;},100);
  setTimeout(() => {mousePosRecent1.textContent = `(${lastMousePostions.recent1.join(', ')})`;},200);
  setTimeout(() => {mousePosRecent2.textContent = `(${lastMousePostions.recent2.join(', ')})`;},300);
  setTimeout(() => {mousePosRecent3.textContent = `(${lastMousePostions.recent3.join(', ')})`;},400);
  setTimeout(() => {mousePosLeastRecent.textContent = `(${lastMousePostions.leastRecent.join(', ')})`;},500);

  moveElement(testElement);
}

function moveElement(elem) {
  if (mouseDetails.leftClick) {
    let newPosX = mouseDetails.currentPostion[0] - offset.x;
    let newPosY = mouseDetails.currentPostion[1] - offset.y;
    elem.style.left = `${newPosX}px`;
    elem.style.top = `${newPosY}px`;
  }
}

function updateElemSize(elem) {
  let baseFontSize = 16;
  elem.style.fontSize = `${sizeMult*baseFontSize}px`;
};

function mouseClickHandler(e) {
  if (e.button === 0) {
    mouseDetails.leftClick = true;
    offset.x = e.clientX - testElement.offsetLeft;
    offset.y = e.clientY - testElement.offsetTop;
    mouseClickCurrent.textContent = 'left-click';
  }

  if (e.button === 1) {
    mouseDetails.middleClick = true;
    mouseClickCurrent.textContent = 'middle-click';
  }

  if (e.button === 2) {
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
        // Scrolling down
        sizeMult -= 0.1;
    } else if (e.deltaY < 0) {
        // Scrolling up
        sizeMult += 0.1;
    }
    let sign = e.deltaY <= 0 ? 'up' : 'down';
    sizeMult = Math.round(sizeMult * 1000)/1000;
    mouseWheelScroll.textContent = `${sizeMult}x [${sign}]`;
    sizeMult = Math.max(0.5, Math.min(5, sizeMult));
    updateElemSize(testElement);
}

window.addEventListener('keydown', (e) => {
  if(e.key === 'c'){
    sizeMult = 1;
    scrollHandler(e);
  }
})


