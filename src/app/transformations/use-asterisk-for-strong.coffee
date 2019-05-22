exports.UseAsteriskForStrong =
  strong:
    enter: (node, done) ->
      @put "**"
      done()

    leave: (node, done) ->
      @put "**"
      done()
