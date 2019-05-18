var ast, commonmark, reader;

commonmark = require('commonmark');

reader = new commonmark.Parser();

ast = reader.parse("Hello *world*!");
