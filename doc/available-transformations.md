# Available Transformations
Below are all the built-in transformations.

* [NoSoftBreak](#NoSoftBreak)
* [NoEmptyLineAfterHeading](#NoEmptyLineAfterHeading)
* [RemoteCodeBlocks](#RemoteCodeBlocks)
* [UseAsteriskForStrong](#UseAsteriskForStrong)
* [UseUnderscoreForStrong](#UseUnderscoreForStrong)
* [UseAsteriskForEmphasis](#UseAsteriskForEmphasis)
* [UseUnderscoreForEmphasis](#UseUnderscoreForEmphasis)
* [SafeHTML](#SafeHTML)

## NoSoftBreak
Use space as soft-break, so there are no line-breaks in paragraphs.

Transforms this:

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut mauris ut
tellus scelerisque volutpat a sed lacus.

Cras vulputate, sapien maximus vestibulum pulvinar, erat nibh ornare orci, ut
pretium libero tellus quis sapien.
```

Into this:

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut mauris ut tellus scelerisque volutpat a sed lacus.

Cras vulputate, sapien maximus vestibulum pulvinar, erat nibh ornare orci, ut pretium libero tellus quis sapien.
```

Example usage:

```javascript
exports.default = function (load) {
  return [
    // ...
    load('NoSoftBreak')
  ];
}
```

## NoEmptyLineAfterHeading
Do not leave an empty line between the heading and the start of the paragraph.

Transforms this:

```markdown
# Title

This is a paragraph [...]
```

Into this:

```markdown
# Title
This is a paragraph [...]
```

Example usage:

```javascript
exports.default = function (load) {
  return [
    // ...
    load('NoEmptyLineAfterHeading')
  ];
}
```

## RemoteCodeBlocks
This transformation takes all your code blocks and uploads them to what's called
a `store`. By default, the only supported store is
[Gist](https://gist.github.com/), you can get it with `load('GistStore')`.

Transforms this:


    This is a demo code snippet:

    ```ruby
    foo = Bar.new(1, 2, 3)
    ```  

Into this:

    This is a demo code snippet:

    <script src="https://gist.gisthub.com/..."></script>

Example usage:
```javascript
credentials = {
  username: 'my-github-username',
  password: process.env.GITHUB_TOKEN
}

exports.default = function (load) {
  store = load('GistStore')(credentials)

  return [
    // ...
    load('RemoteCodeBlocks', store)
  ];
}
```

Note that the store will need your GitHub `username` as well as a `password`,
which is  your [personal API
token](https://github.blog/2013-05-16-personal-api-tokens/). Make sure the token
has access to your gists!

Because storing sensitive information like that in code is not a good idea,
consider using an environmental variable to store your token. In the example
above, we assume we have a variable named `GITHUB_TOKEN`.

## UseAsteriskForStrong
Use asterisk character for strong.

Transforms this:

```markdown
Some __text__.
```

Into this:

```markdown
Some **text**.
```

Example usage:

```javascript
exports.default = function (load) {
  return [
    // ...
    load('UseAsteriskForStrong')
  ];
}
```

## UseUnderscoreForStrong
Use underscore character for strong.

Transforms this:

```markdown
Some **text**.
```

Into this:

```markdown
Some __text__.
```

Example usage:

```javascript
exports.default = function (load) {
  return [
    // ...
    load('UseUnderscoreForStrong')
  ];
}
```

## UseAsteriskForEmphasis
Use asterisk character for emphasis.

Transforms this:

```markdown
Some _text_.
```

Into this:

```markdown
Some *text*.
```

Example usage:

```javascript
exports.default = function (load) {
  return [
    // ...
    load('UseAsteriskForEmphasis')
  ];
}
```

## UseUnderscoreForEmphasis
Use underscore character for emphasis.

Transforms this:

```markdown
Some *text*.
```

Into this:

```markdown
Some _text_.
```

Example usage:

```javascript
exports.default = function (load) {
  return [
    // ...
    load('UseUnderscoreForEmphasis')
  ];
}
```

# SafeHTML
Ignore HTML inlines and blocks

Transforms this:

```markdown
<p>Hello, World</p>
```

Into this:

```markdown
```

Example usage:

```javascript
exports.default = function (load) {
  return [
    // ...
    load('SafeHTML')
  ];
}
```
