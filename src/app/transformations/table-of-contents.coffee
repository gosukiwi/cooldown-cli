renderHeadingLink = (heading, indent, basePath) ->
  indentation = ""
  indentation = (indent for i in [1..(heading.level - 1)]).join("") if heading.level > 1
  "#{indentation}* [#{heading.title}](#{basePath}#{hyphenize(heading.title)})"


hyphenize = (words) ->
  words.toLowerCase().replace(/\s+/g, "-")

headings = []
exports.TableOfContents = (options) ->
  heading:
    enter: (node, done)->
      headings.push(title: node.firstChild.literal, level: node.level)
      @heading(node, true)
      done()

  finally: (done) ->
    title   = options?.title or "Table of Contents"
    spacing = if options?.spacing is 'empty-line-after-heading' then "\n\n" else "\n"
    indent  = options?.indentation or "  " # 2 spaces
    basePath = options?.basePath or "#"

    toc = "# #{title}#{spacing}"
    toc += (renderHeadingLink(heading, indent, basePath) for heading in headings).join("\n")
    @buffer = "#{toc}\n\n#{@buffer}"

    headings = []
    done()
