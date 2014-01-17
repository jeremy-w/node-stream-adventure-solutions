// In this challenge, write an http server that uses a through stream to write
// back the request stream as upper-cased response data for POST requests.
var http = require('http');
var fs = require('fs');
var through = require('through');

var to_upper = function (buffer) {
  this.queue(buffer.toString().toUpperCase())
}

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req
        .pipe(through(to_upper))
        .pipe(res);
    }
});
server.listen(process.argv[2]);
