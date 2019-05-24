{ Compiler } = require_from_app('compiler')
{ SafeHTML } = require_from_app('transformations/safe-html')

describe 'Transformations/SafeHTML', ->
  it "ignores inline HTML", (done) ->
    given = """
    <p>Hello, World</p>
    """
    transformations = [ SafeHTML ]
    compiler = new Compiler(transformations)

    compiler.compile given, (result) ->
      expect(result).to.equal("")
      done()
