var concat = require('concat-stream')

process.stdin.pipe(concat(function (buffer) {
  process.stdout.write(buffer.toString().split('').reverse().join(''))
  process.stdout.write('\n')
}))
