{ Compiler } = require_from_app('compiler')
{ UseAsteriskForEmphasis } = require_from_app('transformations/use-asterisk-for-emphasis')

describe 'Transformations/UseAsteriskForEmphasis', ->
  it "doesn't write an empty line after the heading", (done) ->
    transformations = [ UseAsteriskForEmphasis ]
    compiler = new Compiler(transformations)

    compiler.compile "_foo_", (result) ->
      expect(result).to.equal("*foo*")
      done()
