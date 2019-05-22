exports.NoEmptyLineAfterHeading =
  heading:
    enter: (node, done) ->
      @put "#" for level in [1..node.level]
      @put " "
      done()

    leave: (node, done) ->
      @cr()
      done()
