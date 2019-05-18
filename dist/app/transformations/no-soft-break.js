exports.NoSoftBreak = {
  softbreak: {
    enter: function(node) {
      return this.put(" ");
    }
  }
};
