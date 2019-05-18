{ expect } = require('chai')

global.expect = expect
global.require_from_app = (path) ->
  require("../app/#{path}")
