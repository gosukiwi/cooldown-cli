exports.UseUnderscoreForEmphasis =
  emph:
    enter: (node, done) ->
      @put "_"
      done()

    leave: (node, done) ->
      @put "_"
      done()
