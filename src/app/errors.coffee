class TransformationNotFoundError extends Error
class InvalidInputError extends Error
class CoolfileNotFoundError extends Error

log = (message) ->
  console.log message

exports.InvalidInputError = InvalidInputError
exports.TransformationNotFoundError = TransformationNotFoundError
exports.CoolfileNotFoundError = CoolfileNotFoundError

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
    when CoolfileNotFoundError
      log """
      `./coolfile.js' file not found. 
      
      Please see https://github.com/gosukiwi/cooldown-cli for more info on how 
      to set it up.
      """
    else
      throw error
