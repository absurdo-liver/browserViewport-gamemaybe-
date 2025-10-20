
function parseTest(text){
  if(typeof text != 'string') return 'enter a string'
  let output = {};
  
  output.text = text;
  
  let words = text.split(' ');
  for(let i = 0; i < words.length; i++){
    if(words[i].includes('\'')){
      let temp = words[i].split('\'');
      let replacement;
      if(temp[1] === 's'){
        replacement = 'is';
      }
      if(temp[1] === 't'){
        replacement = 'not';
        if(temp[0] === 'didn') temp[0] = 'did';
        if(temp[0] === 'wouldn') temp[0] = 'would';
      }
      if(temp[1] === 've'){
        replacement = 'have';
      }
      
      words.splice(i,1,temp[0],replacement);
    } 
  }
  output.words = words;
  
  
  return output;
}

let textToParse = 'what\'s going on ?';

console.log(parseTest(textToParse));
