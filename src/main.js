// var _ = require('lodash');

function JSONParser(json) {
  if (!json) return '""';

  var parsed;
  if (json.constructor === String) {
    json = json.split('');
  }

  if (json[0].match(/\d/)) {
    parsed = '';
    while (json[0] && json[0].match(/\d/)) {
      parsed += json.shift();
    }
    return parseInt(parsed, 10);
  }


  if (json.slice(0, 4).join('') === 'true') {
    json.splice(0, 4);
    return true;
  }
  if (json.slice(0, 5).join('') === 'false') {
    json.splice(0, 5);
    return false;
  }


  if (json[0] === '"') {
    json.shift();
    for (parsed = ''; json[0] !== '"'; parsed += json.shift());
    if (json.shift() !== '"') throw new Error('there is an unclosed quote'); 
    return parsed;
  }


  if (json[0] === '[') {
    json.shift();
    for (parsed = []; json[0] !== ']';) {
      parsed.push(JSONParser(json));
      if (json[0] === ',') json.shift();
    }
    if (json.shift() !== ']') throw new Error('theres an unclosed square bracket');
    return parsed;
  }


  if (json[0] === '{') {
    json.shift();
    for (parsed = {}; json[0] !== '}'; parsed[key] = value) {
      var key = JSONParser(json);
      if (json[0] === ':') json.shift();
      var value = JSONParser(json);
      if (json[0] === ',') json.shift();
    }
    if (json.shift() !== '}') throw new Error('theres an unclosed square bracket');
    return parsed
  }
}

// console.log(JSONParser(JSON.stringify(1)) === 1);
// console.log(JSONParser(JSON.stringify('test')) === 'test');
// console.log(JSONParser(JSON.stringify(true)) === true);
// console.log(_.isEqual(JSONParser(JSON.stringify([])), []));
// console.log(_.isEqual(JSONParser(JSON.stringify(['a'])), ['a']));
// console.log(_.isEqual(JSONParser(JSON.stringify([1])), [1]));
// console.log(_.isEqual(JSONParser(JSON.stringify([true])), [true]));
// console.log(_.isEqual(JSONParser(JSON.stringify([true,1])), [true,1]));
// console.log(_.isEqual(JSONParser(JSON.stringify([true,1,'test'])), [true,1,'test']));
// console.log(_.isEqual(JSONParser(JSON.stringify({})), {}));
// console.log(_.isEqual(JSONParser(JSON.stringify({a:true})), {a:true}));
// console.log(_.isEqual(JSONParser(JSON.stringify({b:1})), {b:1}));
// console.log(_.isEqual(JSONParser(JSON.stringify({c:'test'})), {c:'test'}));
// console.log(_.isEqual(JSONParser(JSON.stringify({a:true,b:1})), {a:true,b:1}));
// console.log(_.isEqual(JSONParser(JSON.stringify({a:true,b:1,c:'test'})), {a:true,b:1,c:'test'}));
// console.log(_.isEqual(JSONParser(JSON.stringify({a:{}})), {a:{}}));
// console.log(_.isEqual(JSONParser(JSON.stringify({a:{b:1}})), {a:{b:1}}));
// console.log(_.isEqual(JSONParser(JSON.stringify({a:{b:1,c:2}})), {a:{b:1,c:2}}));
// console.log(_.isEqual(JSONParser(JSON.stringify({a:{b:1},c:2})), {a:{b:1},c:2}));
// console.log(_.isEqual(JSONParser(JSON.stringify({a:{b:{c:2}}})), {a:{b:{c:2}}}));
// console.log(_.isEqual(JSONParser(JSON.stringify([{a:1}])), [{a:1}]));
// console.log(_.isEqual(JSONParser(JSON.stringify([{a:1},{b:2}])), [{a:1},{b:2}]));
// console.log(_.isEqual(JSONParser(JSON.stringify([{a:{c:2}},{b:2}])), [{a:{c:2}},{b:2}]));