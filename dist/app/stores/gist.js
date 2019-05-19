var sha1;

sha1 = require('sha1');

exports.Gist = class {
  constructor(description, file, isPublic) {
    if (description === void 0) {
      throw new Error("Gist must have a description");
    }
    if (file === void 0) {
      throw new Error("Gist must have a file");
    }
    this.description = description;
    this.public = isPublic || false;
    this.file = file; // { name: "...", content: "..." }
    this.id = null;
    this.url = null;
  }

  toHash() {
    return {
      description: this.description,
      public: this.public,
      files: {
        [`${this.file.name}`]: {
          content: this.file.content
        }
      }
    };
  }

  toJSON() {
    return JSON.stringify(this.toHash());
  }

  cacheKey() {
    return sha1(this.toJSON());
  }

  embedCode() {
    if (this.url === null) {
      throw new Error("Gist must have an URL in order to be embedded");
    }
    return `<script src='${this.url}.js'></script>`;
  }

};
