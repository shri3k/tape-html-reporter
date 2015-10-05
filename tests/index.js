var reporter = require('../');
var test = require('tape');
test('test the output of recursion', function(t) {
  var actual = {
    "stats": {
      "asserts": 4,
      "passes": 2,
      "failures": 2
    },
    "asserts": [{
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
  var expected = [
    'stats',
    'asserts',
    'asserts.0',
    'asserts.0.extra',
    'asserts.1',
    'asserts.1.extra'
  ];
  t.equal(reporter.recurse(obj), expected, 'must be equal proper paths');
  t.notEqual(reporter.recurse(obj), ['stats.asserts.0.extra.1.extra'], 'must not be equal');
});
test('testing format')
