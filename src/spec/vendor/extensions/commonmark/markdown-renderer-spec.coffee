commonmark = require('commonmark')
{ MarkdownRenderer } = require_from_app('vendor/extensions/commonmark/markdown-renderer')

parser   = new commonmark.Parser()
renderer = new MarkdownRenderer()
compile  = (input, callback) ->
  ast = parser.parse(input)
  callback renderer.render(ast)

describe 'MarkdownRenderer', ->
  it "parses emphasis", ->
    compile 'Hello _world_!', (compiled) ->
      expect(compiled).to.equal("Hello _world_!\n\n")

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
      expect(compiled).to.equal "#{text}\n\n"

  it "parses link", ->
    compile "[some link](http://some.website)", (compiled) ->
      expect(compiled).to.equal "[some link](http://some.website)\n\n"

  it "parses code", ->
    compile "this is `code`", (compiled) ->
      expect(compiled).to.equal "this is `code`\n\n"

  it "parses heading", ->
    compile "### Level 3 heading", (compiled) ->
      expect(compiled).to.equal "### Level 3 heading"

  it "parses HTML inline", ->
    compile "<strong>some html</strong>", (compiled) ->
      expect(compiled).to.equal "<strong>some html</strong>\n\n"

  it "parses thematic break", ->
    text = """
    some text

    ---

    more text
    """
    compile text, (compiled) ->
      expect(compiled).to.equal "#{text}\n\n"

  it "parses blockquote", ->
    text = """
    > This is a blockquote
    and it's broken into two lines.
    """
    compile text, (compiled) ->
      expect(compiled).to.equal "#{text}\n\n"
