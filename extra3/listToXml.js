const website = {
  html: {
    head: {
      title: {
        text: 'nuh uhh',
        id: 'none',
        tags: {}
      },
      script: {
        text: 'none',
        id: 'none',
        tags: {
          src: 'script.js',
          defer: true
        }
      },
      link: {
        text: 'none',
        id: 'none',
        tags: {
          rel: 'stylesheet',
          href: 'styles.css'
        }
      }
    },
    body: {
      /*
      <div id='info'>
    <p id='mousePosCurrent'>(0, 0)</p>
    <input id='rangeBar' type="range" min="1" max="100" value="7">
    <br>
    <p id='rangeValue'>7</p>
    <br>
    <button id='prettyCollectToggle'>Pretty Collect: off</button>
    <br>
    <p id='mouseClickCurrent'>up</p>
    <p id='mouseWheelScroll'>1x [none]</p>
    <p id='mouseIsMoving'>false</p>
  </div>
  <p id='cursorP'>+</p>
  <p id='testElement'>test</p>
  */
    }
  }
}





function objectToXml(obj) {
  let xml = '';
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      xml += `<${key}>`;
      if (typeof value === 'object' && Object.keys(value).length > 0) {
        xml += objectToXml(value);
      }
      xml += `</${key}>`;
    }
  }
  return xml;
}

const xmlOutput = objectToXml(website);
console.log(xmlOutput);
