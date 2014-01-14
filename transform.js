var through = require('through')

var to_upper = function (buffer) {
  this.queue(buffer.toString().toUpperCase())
}

process.stdin
  .pipe(through(to_upper))
  .pipe(process.stdout)
