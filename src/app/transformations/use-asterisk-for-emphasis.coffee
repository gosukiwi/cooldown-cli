exports.UseAsteriskForEmphasis =
  emph:
    enter: (node, done) ->
      @put "*"
      done()

    leave: (node, done) ->
      @put "*"
      done()
