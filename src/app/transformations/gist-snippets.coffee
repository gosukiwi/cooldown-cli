{ GistStore } = require("../gist-store")
sha1 = require('sha1')

store = new GistStore("gosukiwi")

codes =
  actionscript3: 'as'
  asp: 'asp'
  c: 'c'
  clojure: 'clj'
  coffeescript: 'coffee'
  csharp: 'cs'
  bash: 'sh'
  javascript: 'js'
  markdown: 'md'
  python: 'py'
  ruby: 'rb'

exports.GistSnippets =
  code_block:
    enter: (node) ->
      info_words = if node.info then node.info.split(/\s+/) else []
      language   = info_words[0]
      extension  = codes?[language] or language
      sha1       = sha1(node.literal)
      options    =
        description: "Demo from node",
        public: false,
        files:
          "snippet-#{sha1}.#{extension}":
            content: node.literal

      store.create options, (err, res) ->
        console.log "GIST:", res
