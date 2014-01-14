    var split = require('split');
    var through = require('through');
    process.stdin
        .pipe(split())
        .pipe(through(function (line) {
            console.dir(line.toString());
        }))
    ;
