{ Compiler } = require_from_app('compiler')
{ UseUnderscoreForEmphasis } = require_from_app('transformations/use-underscore-for-emphasis')

describe 'Transformations/UseUnderscoreForEmphasis', ->
  it "uses underscore for emphasis", (done) ->
    transformations = [ UseUnderscoreForEmphasis ]
    compiler = new Compiler(transformations)

    compiler.compile "*foo*", (result) ->
      expect(result).to.equal("_foo_")
      done()
