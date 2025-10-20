function parsePartitionYInt(parts){
  console.log(parts);
  parts = parts.replaceAll(' ', ',');
  parts = parts.split(',');
  console.log(parts);
  
  if(parts[1] != '=') return 'must include "=" @ second place';
  
  let output = {};
  let part1 = parts[2];
  let part2 = parts[4];
  let independentVariable;
  if(part1.includes('x')) independentVariable = 'x';
  if(part1.includes('y')) independentVariable = 'y';
  if(part1.includes('x') && part1.includes('y')){
    console.log('invalid independent variable');
    return
  }
  
  if(part1.length === 1 && part1 === independentVariable){
    output.a = 1;
  } else {
    part1 = part1.replace(independentVariable, '');
    if(part1.includes('.')) output.a = parseFloat(part1);
    if(!part1.includes('.')) output.a = parseInt(part1);
  }
  
  if(parts[3] === '+'){
    if(part2.includes('.')) output.b = parseFloat(part2);
    if(!part2.includes('.')) output.b = parseInt(part2);
  } else if (parts[3] === '-'){
    
  } else {
    console.log('invalid parameter before "b" variable');
    return;
  }
  
  console.log(output);
}



let YinterceptToParse = 'y = 3x + 1';
parsePartitionYInt(YinterceptToParse);


// let textToParse = 'y = ax^2 + bx + c';






