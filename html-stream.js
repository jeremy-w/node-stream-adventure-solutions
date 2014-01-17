var trumpet = require('trumpet')
var through = require('through')

var to_upper = function (buffer) {
  this.queue(buffer.toString().toUpperCase())
}

var tr = trumpet()
process.stdin.pipe(tr).pipe(process.stdout)

// Writing to a trumpet element stream replaces the innerHtml of the matched
// element.
var stream = tr.select('.loud').createStream()
stream.pipe(through(to_upper)).pipe(stream)
