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
const myCustomTransformation = {
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
const someCoolTransformation = require('cooldown-coolstuff')

exports.default = function (transformation) {
  return [
    transformation('GistSnippet'),
    transformation('NoSoftBreak'),
    someCoolTransformation
  ];
}
```

If you do create a package, please let me know so I can list it here!

### Transformations
A transformation is a function which writes what a node means in certain
context. For example, if we are talking about markdown, when a node looks like
this:

```json
{
  "type": "text",
  "literal": "Hello, World!"
}
```

We most likely just want to translate it to plain text. We could do it like
this:

```javascript
const PlainText = {
  text: { // <-- `text` was the node type
    enter: function(node) {
      this.put(node.literal);
    }
  }
}
```

That would write the `Hello, World!` text to the output, which is what we want
in this case.

The `put` function belongs to the `renderer` object. A `renderer` is an object
which takes some nodes and produces output.

Some example renders are `HtmlRenderer` and `MarkdownRenderer`. They translate
nodes into HTML and Markdown, respectively.

As you might have guessed, all transformations are applied to a
`MarkdownRenderer`.

### How Renderers Work
A renderer takes a tree data-structure and implements some kind of [Visitor
Pattern](https://en.wikipedia.org/wiki/Visitor_pattern) to traverse the tree.

So a renderer will define a method for each possible node type, and each method
write whatever that node translates as.

Here is a snippet of the `MarkdownRenderer`:

```coffee
exports.MarkdownRenderer = class extends Renderer
  # ...
  emph: (node, entering) ->
    @put '_'

  strong: (node, entering) ->
    @put '**'

  link: (node, entering) ->
    @put if entering
      "["
    else
      "#{node.title}](#{node.destination})"
```

`emph`, `strong` and `link` are all node types. Note that each method takes a
`node` and an `entering` flag, which will let you know if we are entering the
node or leaving it.

This is because the node is using a depth-first traversal, called [Postorder
Traversal](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/).

Each time a node is visited, a visitor method is called. Also, a visitor method
is called every time a node is left. So we have two method calls per node, one
when entering, one when leaving.

The transformation objects reflect this structure, and they define their own
`enter` and `leave` methods which will be used for this purpose.

```javascript
const PlainText = {
  text: { // <-- `text` was the node type
    enter: function(node) {
      this.put(node.literal);
    },

    leave: function (node) {
      // do something... or not
      // note that this will override the default behaviour!
      // if you want to invoke the default behaviour you can do
      // this.text(node, false); // or true if this is `entering`
    }
  }
}
```

Sometimes, nodes cannot contain children, in that case, the `leave` method will
never be called, only the `enter` method will.

### Node types
Here's a list of all possible node types: `text`, `softbreak`, `linebreak`,
`emph`, `strong`, `html_inline`, `link`, `image`, `code`, `document`,
`paragraph`, `block_quote`, `item`, `list`, `heading`, `code_block`,
`html_block`, `thematic_break`.

See `src/app/vendor/extensions/commonmark/markdown-renderer.coffee` to know the
details of the `MarkdownRenderer`.

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
