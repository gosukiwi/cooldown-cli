{ Compiler } = require_from_app('compiler')
{ NoSoftBreak } = require_from_app('transformations/no-soft-break')

describe 'Transformations/NoSoftBreak', ->
  it "transforms single new lines into spaces", (done) ->
    given = """
    This is
    a sentence.
    """
    transformations = [ NoSoftBreak ]
    compiler = new Compiler(transformations)

    compiler.compile given, (result) ->
      expect(result).to.equal("This is a sentence.\n\n")
      done()
