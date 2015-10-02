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
        tag: '<div>'
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

function format(data) {

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

