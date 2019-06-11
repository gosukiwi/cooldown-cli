var CoolfileNotFoundError, InvalidInputError, TransformationNotFoundError, log;

TransformationNotFoundError = class TransformationNotFoundError extends Error {};

InvalidInputError = class InvalidInputError extends Error {};

CoolfileNotFoundError = class CoolfileNotFoundError extends Error {};

log = function(message) {
  return console.log(message);
};

exports.InvalidInputError = InvalidInputError;

exports.TransformationNotFoundError = TransformationNotFoundError;

exports.CoolfileNotFoundError = CoolfileNotFoundError;

exports.reportError = function(error) {
  switch (error.constructor) {
    case InvalidInputError:
      return log("Input cannot be empty, you can specify input with `-i`.\nExample usage:\n\n  cooldown -i *.md\n\nRun `cooldown --help` for more info.");
    case TransformationNotFoundError:
      return log(error.message);
    case CoolfileNotFoundError:
      return log("`./coolfile.js' file not found. \n\nPlease see https://github.com/gosukiwi/cooldown-cli for more info on how \nto set it up.");
    default:
      throw error;
  }
};
