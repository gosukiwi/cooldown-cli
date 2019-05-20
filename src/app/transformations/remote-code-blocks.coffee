{ Gist } = require("../models/gist")

extensions =
  actionscript3: 'as'
  clojure: 'clj'
  coffeescript: 'coffee'
  csharp: 'cs'
  bash: 'sh'
  javascript: 'js'
  typescript: 'ts'
  markdown: 'md'
  python: 'py'
  ruby: 'rb'
  text: 'txt'

exports.RemoteCodeBlocks = (store) ->
  code_block:
    enter: (node, done) ->
      language  = node?.info?.split(/\s+/)?[0] or "text"
      extension = extensions?[language] or language
      gist = new Gist("created with cooldown", name: "snippet.#{extension}", content: node.literal)
      store.create gist, (gist) =>
        @put gist.embedCode()
        @put "\n\n"
        done()

  # TODO: This should be run after all the markdown files have been compiled,
  # for general cleanup.
  # finally: ->
  #   GistStore.prune()
