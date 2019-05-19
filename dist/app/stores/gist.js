var sha1;

sha1 = require('sha1');

exports.Gist = class {
  constructor(description, isPublic) {
    if (description === void 0) {
      raise(new Error("Gist must have a description"));
    }
    this.description = description;
    this.public = isPublic || false;
    this.files = [];
  }

  // file looks like this: `{ name: name, content: content }`
  file(file) {
    this.files.push(file);
    return this;
  }

  toHash() {
    var file, hash, i, len, ref;
    if (this.files.length === 0) {
      raise(new Error("Gist must have files"));
    }
    hash = {
      description: this.description,
      public: this.public,
      files: {}
    };
    ref = this.files;
    for (i = 0, len = ref.length; i < len; i++) {
      file = ref[i];
      hash.files[file.name] = {
        content: file.content
      };
    }
    return hash;
  }

  toJSON() {
    return JSON.stringify(this.toHash());
  }

  cacheKey() {
    return sha1(this.toJSON());
  }

};
