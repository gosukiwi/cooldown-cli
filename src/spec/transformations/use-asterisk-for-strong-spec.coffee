{ Compiler } = require_from_app('compiler')
{ UseAsteriskForStrong } = require_from_app('transformations/use-asterisk-for-strong')

describe 'Transformations/UseAsteriskForStrong', ->
  it "doesn't write an empty line after the heading", (done) ->
    transformations = [ UseAsteriskForStrong ]
    compiler = new Compiler(transformations)

    compiler.compile "__foo__", (result) ->
      expect(result).to.equal("**foo**")
      done()
