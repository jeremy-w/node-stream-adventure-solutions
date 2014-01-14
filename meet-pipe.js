fs = require('fs')

filename = process.argv[2]
fs.createReadStream(filename).pipe(process.stdout)
