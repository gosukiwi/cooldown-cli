{ Compiler } = require_from_app('compiler')
{ NoEmptyLineAfterHeading } = require_from_app('transformations/no-empty-line-after-heading')

describe 'Transformations/NoEmptyLineAfterHeading', ->
  it "doesn't write an empty line after the heading", (done) ->
    given = """
    # This is a heading

    And it has an empty new line afterwards.
    """
    expected = """
    # This is a heading
    And it has an empty new line afterwards.
    """
    transformations = [ NoEmptyLineAfterHeading ]
    compiler = new Compiler(transformations)

    compiler.compile given, (result) ->
      expect(result).to.equal(expected)
      done()
