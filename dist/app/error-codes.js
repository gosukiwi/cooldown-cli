var InvalidInputError, TransformationNotFoundError, log;

TransformationNotFoundError = class TransformationNotFoundError extends Error {};

InvalidInputError = class InvalidInputError extends Error {};

log = function(message) {
  return console.log(message);
};

exports.InvalidInputError = InvalidInputError;

exports.TransformationNotFoundError = TransformationNotFoundError;

exports.reportError = function(error) {
  switch (error.constructor) {
    case InvalidInputError:
      return log("Input cannot be empty, you can specify input with `-i`.\nExample usage:\n\n  cooldown -i *.md\n\nRun `cooldown --help` for more info.");
    case TransformationNotFoundError:
      return log(error.message);
    default:
      throw e;
  }
};
