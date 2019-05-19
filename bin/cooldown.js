#!/usr/bin/env node

const { Cooldown } = require('../dist/app/cooldown')
const { ERROR_CODES } = require('../dist/app/error-codes')
const commander = require('commander')
const program   = new commander.Command()

program
  .version('0.0.1')
  .option('-i, --input <glob>', 'input files to be transformed')
  .option('-o, --output <dir>', 'directory to write transformed files', './out')
  .parse(process.argv)

const options = program.opts()

try {
  const cooldown = new Cooldown(options.input, options.output)
  cooldown.run()
} catch(e) {
  switch(+e.message) {
    case ERROR_CODES.INVALID_INPUT:
      console.log('Input cannot be empty, you can specify input with `-i`.')
      console.log('Example usage: ')
      console.log()
      console.log('\tcooldown -i *.md')
      console.log()
      console.log('Run `cooldown --help` for more info.')
      break
    default:
      console.log(e.message)
  }
}
