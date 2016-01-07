if (typeof module !== 'undefined') {
  module.exports = JSONParser;
}

function JSONParser(json) {
  if (!json) return '""';

  var i = 0;

  function parse(json) {
    var parsed;

    if (json[i].match(/\d/)) {
      parsed = '';
      while (json[i] && json[i].match(/\d/)) {
        parsed += json[i++];
      }
      return parseInt(parsed, 10);
    }

    if (json.slice(i, i + 4) === 'true') {
      i += 4;
      return true;
    }
    if (json.slice(i, i + 5) === 'false') {
      i += 5;
      return false;
    }
    if (json.slice(i, i + 4) === 'null') {
      i += 4;
      return null;
    }

    if (json[i] === '"') {
      i++;
      parsed = '';
      for(; json[i] !== '"'; i++) {
        var c = json[i];
        if (c === '\\') {
          parsed += json[++i];
        } else {
          parsed += c;
        }
      }
      if (json[i++] !== '"') throw new Error('there is an unclosed quote');
      return parsed;
    }

    if (json[i] === '[') {
      i++;
      for (parsed = []; json[i] !== ']';) {
        parsed.push(parse(json));
        if (json[i] === ',') i++;
      }
      if (json[i++] !== ']') throw new Error('theres an unclosed square bracket');
      return parsed;
    }

    if (json[i] === '{') {
      i++;
      for (parsed = {}; json[i] !== '}'; parsed[key] = value) {
        var key = parse(json);
        if (json[i] === ':') i++;
        var value = parse(json);
        if (json[i] === ',') i++;
      }
      if (json[i++] !== '}') throw new Error('theres an unclosed square bracket');
      return parsed;
    }
  }

  return parse(json);
}
