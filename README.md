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
exports.default = function (transformation) {
  return [
    transformation('GistSnippet'),
    transformation('NoSoftBreak')
  ];
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

## Configuration
You can define your own transformations as such:

```javascript
myCustomTransformation = {
  paragraph: {
    enter: function (node, entering) {
      this.put("A paragraph");
    }
  }
};

exports.default = function (transformation) {
  return [
    transformation('GistSnippet'),
    transformation('NoSoftBreak'),
    myCustomTransformation
  ];
}
```

If interested, `npm` packages can be created to share your transformations:

```javascript
someCoolTransformation = require('cooldown-coolstuff')

exports.default = function (transformation) {
  return [
    transformation('GistSnippet'),
    transformation('NoSoftBreak'),
    someCoolTransformation
  ];
}
```

If you do create a package, please let me know so I can list it here!

### Renderer
Note that the function is evaluated in the context of a `MarkdownRenderer`. This
means that you get some helper functions like `put` and `cr`.

This also means that you can define instance variables across functions and use
them to  orchestrate your transformations, if you ever have that need.

> NOTE: I have to admit that while this extremely mutable design is not great,
> it was the easiest to use, because AST data structure uses a `walker` to
> traverse  the tree. Maybe in a future version, I'll write an immutable
> version.

A transformation is simply an object which can be used to evaluate what output
should a node type have.

For example, for a `paragraph` node, you'll want to do nothing when entering,
and add two new line characters when leaving. You can add characters by using
`put`.

Here's a list of all possible node types: `text`, `softbreak`, `linebreak`,
`emph`, `strong`, `html_inline`, `link`, `image`, `code`, `document`,
`paragraph`, `block_quote`, `item`, `list`, `heading`, `code_block`,
`html_block`, `thematic_break`.

See `src/app/vendor/extensions/commonmark/markdown-renderer.coffee` to know the
details of how the renderer works.

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
