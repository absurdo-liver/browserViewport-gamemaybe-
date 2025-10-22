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
