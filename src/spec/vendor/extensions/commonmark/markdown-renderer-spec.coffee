commonmark = require('commonmark')
{ MarkdownRenderer } = require_from_app('vendor/extensions/commonmark/markdown-renderer')

parser   = new commonmark.Parser()
renderer = new MarkdownRenderer()
compile  = (input, callback) ->
  ast = parser.parse(input)
  callback renderer.render(ast)

describe 'MarkdownRenderer', ->
  it "parses strong", ->
    compile 'Hello **world**!', (compiled) ->
      expect(compiled).to.equal("Hello **world**!\n\n")

  it "parses image", ->
    compile '![my title](http://some.image)', (compiled) ->
      expect(compiled).to.equal("![my title](http://some.image)\n\n")

  it "parses paragraph", ->
    text = """
    A paragraph with a long sentence which is
    broken in two lines.
    """
    compile text, (compiled) ->
      expect(compiled).to.equal "A paragraph with a long sentence which is\nbroken in two lines.\n\n"

  it "parses link", ->
    compile "[some link](http://some.website)", (compiled) ->
      expect(compiled).to.equal "[some link](http://some.website)\n\n"
