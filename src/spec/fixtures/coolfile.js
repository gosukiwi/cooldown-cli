module.exports = function (load) {
  store = load('GistsStore')({ username: "foo", password: "bar" })

  return [
    load('NoSoftBreak'),
    load('GistSnippets')(store) // TODO: Rename this to `RemoteCodeBlocks`
  ]
}
