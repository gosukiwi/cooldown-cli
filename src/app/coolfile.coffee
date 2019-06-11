loader = require('./loader')
fs = require('fs')
{ CoolfileNotFoundError } = require('./errors')

module.exports = (path) ->
  try
    coolfile = fs.readFileSync(path, "utf-8")
    eval(coolfile)(loader)
  catch
    throw new CoolfileNotFoundError
