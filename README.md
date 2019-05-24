# Cooldown - Normalize your markdown! 😎
Cooldown allows you to transform markdown files so they all look the same. It's
an automation CLI tool - available on `npm` - which will do the repetitive work
of formatting and adjusting markdown for you. At it's core, it's an extendable
markdown transpiler.

Cooldown is all about applying _transformations_ to markdown files. Simply
plug-in the transformations you want in `coolfile.js`, and run `cooldown -i
*.md`.

# Why
Markdown is great. But if you use it a lot, across different platforms, you'll
find inconsistencies.

Sometimes, this is not a big deal, GitLab and GitHub parse markdown in almost
the same way. But WordPress doesn't like soft-breaks, and it will translate a
single line-break as a new paragraph, which totally breaks compatibility.

Even if your markdown doesn't break, you might want to systematically apply some
changes to it, for example, when moving from GitLab to WordPress, you might want
to swap all the code blocks with [Gist](https://gist.github.com) embeds.

For cases like that, `Cooldown` was created. It's an automation tool which will
do the repetitive work of formatting and adjusting markdown for you.

You can even plug-it into `gulp` and normalize all your files as you write if
you ever want that workflow.

# Installation

    $ npm install -g cooldown-cli

# Usage
`coolfile.js`:
```javascript
exports.default = function (load) {
  return [
    load('NoSoftBreak'),
    load('NoEmptyLineAfterHeading')
  ]
}
```

Then run:

```bash
$ cooldown -i *.md
```

That's it! Now markdown looking like this:

```markdown
# A title

A paragraph with a long sentence which is
broken in two lines.

Another paragraph. There is some code below:
```

Will be transpiled to:

```markdown
# A title
A paragraph with a long sentence which is broken in two lines.

Another paragraph. There is some code below:
```

The new version will live in `./out/my-original-file.md` by default. Run
`--help` for more info on the CLI.

# The `cooldown.js` file
The **coolfile** is just a regular JavaScript file which exports a function. The
exported function takes a `transformations` function as argument, which is used
to retrieve built-in transformations. Our exported function must return an array
of transformations.

An empty coolfile would look like this:

```javascript
exports.default = function (load) {
  return [
    // load('SomeTransformationName')
  ]
}
```

# Available Transformations
Below are all the built-in transformations.

* [NoSoftBreak](doc/available-transformations.md#NoSoftBreak)
* [NoEmptyLineAfterHeading](doc/available-transformations.md#NoEmptyLineAfterHeading)
* [RemoteCodeBlocks](doc/available-transformations.md#RemoteCodeBlocks)
* [UseAsteriskForStrong](doc/available-transformations.md#UseAsteriskForStrong)
* [UseUnderscoreForStrong](doc/available-transformations.md#UseUnderscoreForStrong)
* [UseAsteriskForEmphasis](doc/available-transformations.md#UseAsteriskForEmphasis)
* [UseUnderscoreForEmphasis](doc/available-transformations.md#UseUnderscoreForEmphasis)
* [SafeHTML](doc/available-transformations.md#SafeHTML)

# Custom Transformations
You can define your own transformations as such:

```javascript
const myCustomTransformation = {
  paragraph: {
    enter: function (node, done) {
      this.put("A paragraph")
      done()
    }
  }
};

exports.default = function (load) {
  return [
    load('NoSoftBreak'),
    myCustomTransformation
  ];
}
```

## Public Transformations
If interested, `npm` packages can be created to share your transformations:

```javascript
const someCoolTransformation = require('cooldown-coolstuff')

exports.default = function (load) {
  return [
    load('NoSoftBreak'),
    someCoolTransformation
  ];
}
```

If you do create a package, please let me know so I can list it here!

## How filters interact with the `MarkdownRenderer`
Filters are used by renderers. To write filters, it makes sense to know the
life-cycle of a renderer.

A renderer is an object which takes a tree data-structure and implements a
[Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern) to traverse the
tree.

It will visit all the nodes and call a method for each node type. So for node
type `paragraph`, it will call `renderer#paragraph`. A renderer looks something
like this: (taken from `./src/app/renderers/markdown-renderer.coffee`):

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

In the snippet above, `emph`, `strong` and `link` are all node types.  

Each method takes a `node` and an `entering` flag. The flag is used because the
node is visited twice, one when entering, and one when leaving.

The transformation objects reflect this structure with the `enter` and `leave`
methods.

```javascript
const PlainText = {
  text: { // <-- `text` was the node type
    enter: function(node, done) {
      this.put(node.literal)
      done()
    },

    leave: function (node, done) {
      // do something... or not
      done()
    }
  }
}
```

It's very important to note that if there is at least one filter which defines a
method for a node, **the base method will be ignored**. If you want to invoke
the default behaviour you can do something like:

```javascript
enter: function(node, done) {
  this.text(node, true); // or `false` if this were in the leave method
  done()
}
```

Another important thing to know is that not all nodes have children, so the
`#leave` will not be called in that case.

### Cleanup
Transformations can also perform cleanup tasks once the markdown file has been
generated. It's useful for releasing resources, invalidating caches and whatnot.

You can define a cleanup task simply by defining a `finally` method:

```javascript
const SomeTransformation = {
  text: {
    // ...
  },

  paragraph: {
    // ...
  }

  finally: function(done) {
    // do some work
    done()
  }
}
```

## Writing to the output buffer
You can use the following methods inside your `enter` and `leave` functions to
write to the output buffer:

* `put`: Write string to the output buffer
* `putEscaped`: Escape string for markdown format, and then write it to the output buffer
* `cr`: Write a new line. If the last added character to the string was a new line, this will do nothing.

## Node types
These are all possible node types: `text`, `softbreak`, `linebreak`, `emph`,
`strong`, `html_inline`, `link`, `image`, `code`, `document`, `paragraph`,
`block_quote`, `item`, `list`, `heading`, `code_block`, `html_block`,
`thematic_break`.

See `src/app/vendor/extensions/commonmark/markdown-renderer.coffee` to know the
details of the `MarkdownRenderer`.

## Example Transformations
You can check out the built-in transformations to get examples. Built-in
transformations live in `./src/app/transformations/`.

# Programmatic usage
You can use Cooldown programmatically as such:

```javascript
const { Cooldown, Compiler, coolfile, loader } = require('cooldown')
const transformations = coolfile('./coolfile.js')(loader)
const compiler = new Compiler(transformations)
const cooldown = new Cooldown('./src/*.md', './out', compiler)

cooldown.run(() => console.log('Done!'))
```

If you don't want to use a `coolfile.js` file, or you don't need to, you can
always manually load the transformations you want:

```javascript
const { Cooldown, Compiler, loader } = require('cooldown')
const transformations = [
  loader('NoSoftBreak'),
  loader('UseAsteriskForStrong')
]
const compiler = new Compiler(transformations)
const cooldown = new Cooldown('./src/*.md', './out', compiler)

cooldown.run(() => console.log('Done!'))
```

You can test the output with `Compiler#compile`:

```javascript
compiler.compile("Some _markdown_ **here**", (result) => {
  console.log(result)
})
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
Specs live in `src/spec/`. To run specs:

    $ npm test

To run a single spec:

    $ npx mocha --grep MyTestName --recursive --file ./dist/spec/spec_helper.js ./dist /spec
