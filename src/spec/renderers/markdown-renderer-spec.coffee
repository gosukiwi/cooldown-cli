commonmark = require('commonmark')
{ MarkdownRenderer } = require_from_app('renderers/markdown-renderer')

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
      expect(compiled).to.equal "### Level 3 heading\n"

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

  describe 'codeblock', ->
    it "parses with a language", ->
      text = """
      ```ruby
      a = 1
      ```
      """
      compile text, (compiled) ->
        expect(compiled).to.equal "#{text}\n\n"

    it "parses without a language", ->
      text = """
      ```
      a = 1
      ```
      """
      compile text, (compiled) ->
        expect(compiled).to.equal "#{text}\n\n"

  describe 'lists', ->
    it 'parses bulleted lists', ->
      text = """
      * one
      * two
      * three
      """
      compile text, (compiled) ->
        expect(compiled).to.equal "#{text}\n\n"

    it 'parses numbered lists', ->
      text = """
      1. one
      1. two
      1. three
      """
      compile text, (compiled) ->
        expect(compiled).to.equal "#{text}\n\n"

    it 'always uses `1.` on numbered lists', ->
      given = """
      1. one
      2. two
      3. three
      """
      expected = """
      1. one
      1. two
      1. three


      """
      compile given, (compiled) ->
        expect(compiled).to.equal expected

  it "works with a big complex example", ->
    given = """
# Cooldown - Style and automate your markdown!
Cooldown allows you to transform markdown files so they all follow the same
rules.

It could be considered a compiler, or a linter which auto-fixes issues. The
whole  idea behind Cooldown is simply being able to generate standard markdown
files.

Additionally, you can apply transformations to the markdown, for example, you
can replace all code snippets with gist embed codes.

# Usage
`coolfile.js`:

```javascript
exports.default = function (transformations) {
  [
    transformations.gist(),
    transformations.joinSentences()
  ]
}
```

Then simply run:

```bash
$ cooldown src/\*.md dst/
```

And markdown looking like this:

```markdown
# A title

A paragraph with a long sentence which is
broken in two lines.

Another paragraph. There is some code below:

```ruby
some = "code"
```

Will be translated to:

```markdown
# A title

A paragraph with a long sentence which is broken in two lines.

Another paragraph. There is some code below:

<script...></script>
```

# Developers
The application code lives in `src/app`. This application uses `gulp` and
CofeeScript. You can install gulp with:

```bash
$ npm install -g gulp
```

Once it's installed, you can watch code in `src/` and run specs on any file
change with:

```bash
$ gulp
```

Remember to run `npm install` before running `gulp` for the first time.

## Specs
Specs live in `src/spec/`.
    """
    compile given, (compiled) ->
      expect(compiled).to.equal "#{given}\n\n"
