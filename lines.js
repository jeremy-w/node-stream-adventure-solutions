var through = require('through')
var split = require('split')

var alt = function (odd_fn, even_fn) {
  var f = even_fn;
  return function (buffer) {
    f = (f === even_fn) ? odd_fn : even_fn
    f.call(this, buffer)
  }
}

var enqueue_after = function (string_fn) {
  return function (buffer) {
    var value = string_fn.call(buffer.toString()) + '\n'
    this.queue(value)
  }
}

process.stdin
  .pipe(split())
  .pipe(through(alt(
    enqueue_after(String.prototype.toLowerCase),
    enqueue_after(String.prototype.toUpperCase))))
  .pipe(process.stdout)
