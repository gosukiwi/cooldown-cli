{ Compiler } = require_from_app('compiler')
{ GistSnippets } = require_from_app('transformations/gist-snippets')

describe 'Transformations/GistSnippets', ->
  it "creates a gist from a `code_block`", (done) ->
    dummyStore =
      create: (gist, callback) ->
        gist.id = 123
        gist.url = "http://some-fake.url"
        callback(gist)
    given = """
    ```ruby
    this_is = "some ruby code!"
    ```
    """
    # TODO: `GistSnippets` expects credentials and uses the real GistStore. This
    # should use a mock...
    compiler = new Compiler([GistSnippets(dummyStore)])

    compiler.compile given, (result) ->
      expect(result).to.equal("<script src='http://some-fake.url.js'></script>\n")
      done()
