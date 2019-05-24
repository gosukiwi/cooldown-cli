exports.SafeHTML =
  html_inline:
    enter: (_node, done) ->
      # Do not output HTML inlines
      done()

  html_block:
    enter: (_node, done) ->
      # Do not output HTML blocks
      done()
