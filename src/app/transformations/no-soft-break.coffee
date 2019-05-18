exports.NoSoftBreak =
  softbreak:
    enter: (node) ->
      @put " "

    leave: (node) ->
      @put " "
