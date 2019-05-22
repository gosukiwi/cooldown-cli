exports.NoEmptyLineAfterHeading = {
  heading: {
    enter: function(node, done) {
      var i, level, ref;
      for (level = i = 1, ref = node.level; (1 <= ref ? i <= ref : i >= ref); level = 1 <= ref ? ++i : --i) {
        this.put("#");
      }
      this.put(" ");
      return done();
    },
    leave: function(node, done) {
      this.cr();
      return done();
    }
  }
};
