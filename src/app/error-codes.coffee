class TransformationNotFoundError extends Error
class InvalidInputError extends Error

log = (message) ->
  console.log message

exports.InvalidInputError = InvalidInputError
exports.TransformationNotFoundError = TransformationNotFoundError
exports.reportError = (error) ->
  switch error.constructor
    when InvalidInputError
      log """
      Input cannot be empty, you can specify input with `-i`.
      Example usage:

        cooldown -i *.md

      Run `cooldown --help` for more info.
      """
    when TransformationNotFoundError
      log error.message
    else
      throw e
