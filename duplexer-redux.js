'use strict'

var duplex = require('duplexer')
var through = require('through')

module.exports = function (counter) {
  var counts = {}
  return duplex(through(record_count, set_count), counter)

  // Shifting the declaration of |counts| after the |return|
  // statement triggers a "huh what |counts|?" error in record_count:
  //
  //     TypeError: Cannot read property 'MX' of undefined

  // Also note this "declare functions after return" trick relies on
  // function declarations getting picked up during parsing,
  // unlike function expressions, which only execute when the line
  // executes. See http://stackoverflow.com/a/336868/72508.
  function record_count(obj) {
    var country = obj.country
    var count = counts[country] || 0
    counts[country] = count + 1
  }

  function set_count() {
    counter.setCounts(counts)
    counts = {}
  }
}
