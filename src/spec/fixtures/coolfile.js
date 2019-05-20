module.exports = function (load) {
  store = load('GistStore')({ username: "foo", password: "bar" })

  return [
    load('NoSoftBreak'),
    load('RemoteCodeBlocks')(store)
  ]
}
