var obj = {
  "stats": {
    "one": {
      "level": "only"
    },
    "test": {
      "hey": "there",
      "good": {
        "bye": "lala",
        "hey": "no"
      }
    },
    "asserts": 4,
    "passes": 2,
    "failures": 2
  },
  "asserts": [{
    "number": 1,
    "comment": "1 === 1",
    "name": "should be equal",
    "ok": true,
    "extra": {}
  }, {
    "number": 2,
    "comment": "2 === 2",
    "name": "should be equal",
    "ok": true,
    "extra": {}
  }, {
    "number": 3,
    "comment": "1 === 2",
    "name": "should be equal",
    "ok": false,
    "extra": {
      "operator": "equal",
      "expected": "2",
      "actual": "1"
    }
  }, {
    "number": 4,
    "comment": "2 === 1",
    "name": "should be equal",
    "ok": false,
    "extra": {
      "operator": "equal",
      "expected": "1",
      "actual": "2"
    }
  }]
};

function isObject(obj) {
  var result = false;
  if (typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0) {
    result = true;
  }
  return result;
}

var stack = [];

function saveStack(arr) {
  stack.push(arr);
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

recurse(obj);
console.log(stack);

