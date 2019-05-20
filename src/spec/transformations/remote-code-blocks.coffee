{ Compiler } = require_from_app('compiler')
{ RemoteCodeBlocks } = require_from_app('transformations/remote-code-blocks')

describe 'Transformations/RemoteCodeBlocks', ->
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
    compiler = new Compiler([RemoteCodeBlocks(dummyStore)])

    compiler.compile given, (result) ->
      expect(result).to.equal("<script src='http://some-fake.url.js'></script>\n\n")
      done()
