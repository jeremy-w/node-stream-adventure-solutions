var through = require('through')
var split = require('split')

var alt = (function () {
  var n = 0
  var is_odd = function (n) { return (n % 2) == 1 }
  return function (odd_fn, even_fn) {
    return function (buffer) {
      n += 1
      var f = is_odd(n) ? odd_fn : even_fn
      f(this, buffer)
    }
  }
})()

process.stdin
  .pipe(split())
  .pipe(through(alt(
    function (t, buffer) { t.queue(buffer.toString().toLowerCase() + '\n') },
    function (t, buffer) { t.queue(buffer.toString().toUpperCase() + '\n') })))
  .pipe(process.stdout)
