var Gist, extensions;

({Gist} = require("../models/gist"));

extensions = {
  actionscript3: 'as',
  clojure: 'clj',
  coffeescript: 'coffee',
  csharp: 'cs',
  bash: 'sh',
  javascript: 'js',
  typescript: 'ts',
  markdown: 'md',
  python: 'py',
  ruby: 'rb',
  text: 'txt'
};

exports.GistSnippets = function(store) {
  return {
    code_block: {
      enter: function(node) {
        var extension, gist, language, ref, ref1;
        language = (node != null ? (ref = node.info) != null ? (ref1 = ref.split(/\s+/)) != null ? ref1[0] : void 0 : void 0 : void 0) || "text";
        extension = (extensions != null ? extensions[language] : void 0) || language;
        gist = new Gist("created with cooldown", {
          name: `snippet.${extension}`,
          content: node.literal
        });
        return store.create(gist, () => {
          this.cr();
          this.put(gist.embedCode());
          return this.cr();
        });
      }
    },
    // TODO: This should be run after all the markdown files have been compiled,
    // for general cleanup.
    finally: function() {}
  };
};

// GistsStore.prune()
