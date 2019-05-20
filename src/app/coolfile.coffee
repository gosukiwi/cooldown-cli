loader = require('./loader')
fs = require('fs')

module.exports = (path) ->
  coolfile = fs.readFileSync(path, "utf-8")
  eval(coolfile)(loader)
