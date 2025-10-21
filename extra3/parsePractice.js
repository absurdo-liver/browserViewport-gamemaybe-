function parseTest(text) {
  if (typeof text !== 'string') {
    return 'enter a string';
  }

  let output = {};
  output.text = text;

  const contractionMap = new Map([
    ["'s", 'is'],
    ["'ll", 'will'],
    ["'re", 'are'],
    ["'ve", 'have'],
    ["'m", 'am'],
    ["'d", 'would'],
    ["n't", 'not'],
  ]);

  let words = text.split(' ');
  let result = [];

  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    let replaced = false;
    for (const [contraction, replacement] of contractionMap.entries()) {
      if (word.endsWith(contraction)) {
        let root = word.slice(0, word.length - contraction.length);
        
        if (word === "can't") {
          result.push('can', 'not');
        } else if (word === "won't") {
          result.push('will', 'not');
        } else {
          result.push(root, replacement);
        }
        replaced = true;
        break;
      }
    }

    if (!replaced) {
      result.push(word);
    }
  }

  output.words = result;
  return output;
}

let textToParse = "I'm sure you'll find what's wrong, but you can't blame me, I didn't see a thing.";

console.log(parseTest(textToParse));
