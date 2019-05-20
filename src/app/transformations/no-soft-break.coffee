exports.NoSoftBreak =
  softbreak:
    enter: (node, done) ->
      @put " "
      done()
