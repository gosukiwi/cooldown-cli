{ Compiler } = require_from_app('compiler')
{ UseUnderscoreForStrong } = require_from_app('transformations/use-underscore-for-strong')

describe 'Transformations/UseUnderscoreForStrong', ->
  it "uses underscore for strong", (done) ->
    transformations = [ UseUnderscoreForStrong ]
    compiler = new Compiler(transformations)

    compiler.compile "**foo**", (result) ->
      expect(result).to.equal("__foo__")
      done()
