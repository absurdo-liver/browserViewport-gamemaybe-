const categories = {
  nouns: ['you', 'thing', 'fault',  'time','year','people','way','day','man','thing','woman','life','child','world','school','state','family','student','group','country','problem','hand','part','place','case','week','company','system','program','question','work','government','number','night','point','home','water','room','mother','area','money','story','fact','month','lot','right','study','book','eye','job','word','business','issue','side','kind','head','house','service','friend','father','power','hour','game','line','end','member','law','car','city','community','name','president','team','minute','idea','kid','body','information','back','parent','face','others','level','office','door','health','person','art','war','history','party','result','change','morning','reason','research','girl','guy','moment','air','teacher','force','education'],
  verbs: ['am', 'are', 'is', 'will', 'have', 'would', 'can', 'see', 'blame', 'find', 'did'],
  adjectives: ['sure', 'wrong'],
  adverbs: ['not'],
  pronouns: ['i', 'me', 'you', 'he', 'she', 'they', 'it', 'we','they','them','us','him','her','his','hers','its','theirs','our','your'],
  conjunctions: ['but'],
  article: ['a', 'what']
};


function parseAndCategorize(text, categories) {
  if (typeof text !== 'string') {
    return 'enter a string';
  }
  
  const output = {
    text: text,
    words: []
  };
  const contractionMap = new Map([
    ["'s", 'is'],
    ["'ll", 'will'],
    ["'re", 'are'],
    ["'ve", 'have'],
    ["'m", 'am'],
    ["'d", 'would'],
    ["n't", 'not'],
  ]);

  let words = text.toLowerCase().split(/[. ,]+/);
  words = words.filter(word => word !== '');
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
        } else if (word === "didn't") {
          result.push(root, 'not');
        }
        else {
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

  output.words = result.map(word => {
    let category = 'unknown';

    for (const key in categories) {
      if (categories[key].includes(word)) {
        category = key;
        break;
      }
    }
    
    return {
      word: word,
      category: category
    };
  });

  return output;
}

let textToParse = "I'm sure you'll find what's wrong, but you can't blame me, I didn't see a thing.";
let parsedAndCategorizedText = parseAndCategorize(textToParse, categories);


console.log(parsedAndCategorizedText);
parsedAndCategorizedText.words.forEach((wordObj, index) => {
  console.log(`word#${index+1}: ${wordObj.word}, category: ${parsedAndCategorizedText.words[index].category}`);
});
