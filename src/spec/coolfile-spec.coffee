fs = require('fs')
{ coolfile } = require_from_app('coolfile')

fixture = (name) ->
  fs.readFileSync("#{process.cwd()}\\src\\spec\\fixtures\\#{name}", "utf8")

TRANSFORMATIONS =
  NoSoftBreak: 'no-soft-break'
  GistSnippets: (p) -> p
  GistsStore: -> 'a-fake-store'

describe 'Coolfile', ->
  it 'defines the transformations', ->
    loader = (name) ->
      TRANSFORMATIONS[name] or throw new Error("Cannot find transformation #{name}")
    file = fixture("coolfile.js")

    transformations = eval(file)(loader)

    expect(transformations[0]).to.eql('no-soft-break')
    expect(transformations[1]).to.eql('a-fake-store')
