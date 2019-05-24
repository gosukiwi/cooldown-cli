var headings, hyphenize, renderHeadingLink;

renderHeadingLink = function(heading, indent, basePath) {
  var i, indentation;
  indentation = "";
  if (heading.level > 1) {
    indentation = ((function() {
      var j, ref, results;
      results = [];
      for (i = j = 1, ref = heading.level - 1; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
        results.push(indent);
      }
      return results;
    })()).join("");
  }
  return `${indentation}* [${heading.title}](${basePath}${hyphenize(heading.title)})`;
};

hyphenize = function(words) {
  return words.toLowerCase().replace(/\s+/g, "-");
};

headings = [];

exports.TableOfContents = function(options) {
  return {
    heading: {
      enter: function(node, done) {
        headings.push({
          title: node.firstChild.literal,
          level: node.level
        });
        this.heading(node, true);
        return done();
      }
    },
    finally: function(done) {
      var basePath, heading, indent, spacing, title, toc;
      title = (options != null ? options.title : void 0) || "Table of Contents";
      spacing = (options != null ? options.spacing : void 0) === 'empty-line-after-heading' ? "\n\n" : "\n";
      indent = (options != null ? options.indentation : void 0) || "  "; // 2 spaces
      basePath = (options != null ? options.basePath : void 0) || "#";
      toc = `# ${title}${spacing}`;
      toc += ((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = headings.length; j < len; j++) {
          heading = headings[j];
          results.push(renderHeadingLink(heading, indent, basePath));
        }
        return results;
      })()).join("\n");
      this.buffer = `${toc}\n\n${this.buffer}`;
      headings = [];
      return done();
    }
  };
};
