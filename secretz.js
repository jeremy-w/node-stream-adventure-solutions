'use strict'

var crypto = require('crypto')
var cipher = process.argv[2]
var passphrase = process.argv[3]
var decrypter = crypto.createDecipher(cipher, passphrase)

var gunzip = require('zlib').createGunzip()

var through = require('through')
var parser = require('tar').Parse()
parser.on('entry', function (entry) {
  if (entry.type !== 'File') return

  var name = entry.path
  var hasher = crypto.createHash('md5')
  entry.pipe(hasher).pipe(through(function write_line(hash_buffer) {
    var hash = hash_buffer.toString('hex')
    process.stdout.write(hash + ' ' + name + '\n')
  }))
})

process.stdin
  .pipe(decrypter)
  .pipe(gunzip)
  .pipe(parser)
