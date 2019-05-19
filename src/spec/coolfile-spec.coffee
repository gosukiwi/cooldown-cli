fs = require('fs')
{ coolfile } = require_from_app('coolfile')

fixture = (name) ->
  fs.readFileSync("#{process.cwd()}\\src\\spec\\fixtures\\#{name}", "utf-8")

describe 'Coolfile', ->
  it 'defines the transformations', ->
    file = fixture("coolfile.js")
    transformations = eval(file)()
    expect(transformations).to.eql([1, 2, 3])
