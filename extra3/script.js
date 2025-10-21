const testElement = document.getElementById('testElement');
const mousePosCurrent = document.getElementById('mousePosCurrent');
const mousePosMostRecent = document.getElementById('mousePosMostRecent');
const mousePosRecent1 = document.getElementById('mousePosRecent1');
const mousePosRecent2 = document.getElementById('mousePosRecent2');
const mousePosRecent3 = document.getElementById('mousePosRecent3');
const mousePosLeastRecent = document.getElementById('mousePosLeastRecent');

var sizeMult = 1;
var lastScrollY = window.scrollY;

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
window.addEventListener('scroll', scrollHandler);
window.addEventListener('mousemove', mouseMovementHandler);
window.addEventListener('mousedown', mouseClickHandler);
window.addEventListener('mouseup', mouseUpHandler);
window.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

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

function mouseClickHandler(e) {
  if (e.button === 0) {
    mouseDetails.leftClick = true;
    offset.x = e.clientX - testElement.offsetLeft;
    offset.y = e.clientY - testElement.offsetTop;
  }

  if (e.button === 1) {
    mouseDetails.middleClick = true;
  }

  if (e.button === 2) {
    mouseDetails.rightClick = true;
  }
}

function mouseUpHandler() {
  mouseDetails.leftClick = false;
  mouseDetails.middleClick = false;
  mouseDetails.rightClick = false;
}

function scrollHandler(){
  const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down
        console.log('Scrolling Down');
        // Add your logic for scrolling down here
    } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        console.log('Scrolling Up');
        // Add your logic for scrolling up here
    }

    lastScrollY = currentScrollY;
}

// `calc(var(--baseSize) * ${sizeMult})`;


