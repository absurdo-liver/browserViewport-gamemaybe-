const aInputtest = document.getElementById('aInput');
const bInputtest = document.getElementById('bInput');
const cInputtest = document.getElementById('cInput');
const hInputtest = document.getElementById('hInput');
const kInputtest = document.getElementById('kInput');
const pInputtest = document.getElementById('pInput');
const rInputtest = document.getElementById('rInput');
const limitsMinInputtest = document.getElementById('limitsMinInput');
const limitsMaxInputtest = document.getElementById('limitsMaxInput');
const colorInputtest = document.getElementById('colorInput');
const trigRatioInputtest = document.getElementById('trigRatioInput');
const paramInputtest = document.getElementById('paramInput');
const sysInputtest = document.getElementById('sysInput');
const figureInputtest = document.getElementById('figureInput');
const pointArrayInputtest = document.getElementById('pointArrayInput');

aInputtest.addEventListener('input', log);
bInputtest.addEventListener('input', log);
cInputtest.addEventListener('input', log);
hInputtest.addEventListener('input', log);
kInputtest.addEventListener('input', log);
pInputtest.addEventListener('input', log);
rInputtest.addEventListener('input', log);
limitsMinInputtest.addEventListener('input', log);
limitsMaxInputtest.addEventListener('input', log);
colorInputtest.addEventListener('input', log);
trigRatioInputtest.addEventListener('input', log);
paramInputtest.addEventListener('input', log);
sysInputtest.addEventListener('input', log);
figureInputtest.addEventListener('input', log);
pointArrayInputtest.addEventListener('input', log);


let e = 'Enter';

function callRendering(e){
    if(e.key != 'Enter') return
    if (aInputtest.value === '') return
    if (bInputtest.value === '') return
    if (cInputtest.value === '') return
    if (hInputtest.value === '') return
    if (kInputtest.value === '') return
    if (pInputtest.value === '') return
    if (rInputtest.value === '') return
    if (limitsMinInputtest.value === '') return
    if (limitsMaxInputtest.value === '') return
    if (colorInputtest.value === '') return
    if (trigRatioInputtest.value === '') return
    if (paramInputtest.value === '') return
    if (sysInputtest.value === '') return
    if (figureInputtest.value === '') return
    if (pointArrayInputtest.value === '') return
    log();
}


function log(){
    console.log('worked');
}






console.error('testing file active',aInputtest.value,bInputtest.value,cInputtest.value,hInputtest.value,kInputtest.value,pInputtest.value,rInputtest.value,limitsMinInputtest.value,limitsMaxInputtest.value,colorInputtest.value,trigRatioInputtest.value,paramInputtest.value,sysInputtest.value,figureInputtest.value,pointArrayInputtest.value);