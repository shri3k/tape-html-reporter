var through = require('through2');
var document = {
  stats: {
    tag: '<div>',
    props: {
      asserts: {
        tag: '<span>'
      },
      passes: {
        tag: '<span>'
      },
      failures: {
        tag: '<span>'
      }
    }
  },
  asserts: {
    tag: '<div>',
    props: {
      number: {
        tag: '<span>'
      },
      comment: {
        tag: '<span>'
      },
      name: {
        tag: '<span>'
      },
      extra: {
        tag: '<div>',
        props: {
          operator: {
            tag: '<span>'
          },
          expected: {
            tag: '<span>'
          },
          actual: {
            tag: '<span>'
          }
        }
      }
    }
  }
};
/**
 * Formats to right html
 * @param {Object} data JSON object to be formatted
 * @return {String} Formatted html string
 */

var stack = [];

function saveStack(arr) {
  stack.push(arr);
}

function getChunks(obj) {
  var result = '';
  for (var k in obj) {
    result += k + ' ' + obj[k];
  }
  return result;
}

function getChunkVal(obj, hie) {
	var result; 
  result = hie.split('.').reduce(function(prop, key, index, arr) {
    var end = index + 1 === arr.length ? true : false;
    return end ? getChunks(obj[key]) : obj[key];
  }, obj)
  return result;
}

function format(obj) {
  var result = '';
  recurse(obj);
  stacks.forEach(function(stack) {
    result += stack.split('.').reduce(function(obj, key, i, arr) {
      return obj[key].props || (obj[key].tag + getChunkVal(obj, arr) + obj[key].tag.replace('<', '</'));
    }, document);
  });
  stack = [];
  return result;
}

function recurse(obj, key) {
  'use strict';
  key = key || '';
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      if (isObject(obj[k])) {
        var dot = key ? '.' : '';
        var stack = key + dot + k;
        saveStack(stack);
        recurse(obj[k], stack);
      }
    }
  }
}

module.exports = through.obj(function(chunk, err, cb) {
  try {
    var obj = JSON.parse(chunk);
    this.push(format(obj));
    cb();
  } catch (e) {
    process.stdout.err.write(e)
    cb();
  }
});
