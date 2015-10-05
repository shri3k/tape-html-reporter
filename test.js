var fs = require('fs');
var through2 = require('through2');
fs.createReadStream('ex.txt')
  .pipe(through2(function(chunk, enc, callback) {
    for (var i = 0; i < chunk.length; i++)
      if (chunk[i] == 97)
        chunk[i] = 122 // swap 'a' for 'z'

    this.push(chunk)

    callback()
  }))
  .pipe(process.stdout)
