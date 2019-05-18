exports.NoSoftBreak = {
  softbreak: {
    enter: function(node) {
      return this.put(" ");
    },
    leave: function(node) {
      return this.put(" ");
    }
  }
};
