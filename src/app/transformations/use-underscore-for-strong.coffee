exports.UseUnderscoreForStrong =
  strong:
    enter: (node, done) ->
      @put "__"
      done()

    leave: (node, done) ->
      @put "__"
      done()
