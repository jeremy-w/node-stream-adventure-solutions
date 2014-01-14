var through = require('through')
var split = require('split')

var alt = function (odd_fn, even_fn) {
  var f = even_fn;
  return function (buffer) {
    f = (f === even_fn) ? odd_fn : even_fn
    f.call(this, buffer)
  }
}

process.stdin
  .pipe(split())
  .pipe(through(alt(
    function (buffer) { this.queue(buffer.toString().toLowerCase() + '\n') },
    function (buffer) { this.queue(buffer.toString().toUpperCase() + '\n') })))
  .pipe(process.stdout)
