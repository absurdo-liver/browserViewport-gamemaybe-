const test = document.getElementById('test');

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

