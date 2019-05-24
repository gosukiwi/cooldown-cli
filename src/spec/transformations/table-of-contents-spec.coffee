{ Compiler } = require_from_app('compiler')
{ TableOfContents } = require_from_app('transformations/table-of-contents')

describe 'Transformations/TableOfContents', ->
  it "transforms single new lines into spaces", (done) ->
    given = """
    # This is a heading
    Some text.

    ```markdown
    # This should not appear on the ToC
    ```

    ## A level 2 heading
    Some more text.

    # A level 1 heading again
    This is a sentence.

    ## A level 2 heading
    Some more text.

    ### A level 3 heading
    Some more text.
    """

    expected = """
    # Table of Contents
    * [This is a heading](#this-is-a-heading)
      * [A level 2 heading](#a-level-2-heading)
    * [A level 1 heading again](#a-level-1-heading-again)
      * [A level 2 heading](#a-level-2-heading)
        * [A level 3 heading](#a-level-3-heading)

    # This is a heading
    Some text.

    ```markdown
    # This should not appear on the ToC
    ```

    ## A level 2 heading
    Some more text.

    # A level 1 heading again
    This is a sentence.

    ## A level 2 heading
    Some more text.

    ### A level 3 heading
    Some more text.
    """

    transformations = [ TableOfContents() ]
    compiler = new Compiler(transformations)

    compiler.compile given, (result) ->
      expect(result).to.equal(expected)
      done()
