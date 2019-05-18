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

    $ cooldown src/\*.md dst/

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

    $ npm install -g gulp

Once it's installed, you can watch code in `src/` and run specs on any file
change with:

    $ gulp

Remember to run `npm install` before running `gulp` for the first time.

## Specs
Specs live in `src/spec/`.
