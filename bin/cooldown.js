#!/usr/bin/env node

const { Cooldown } = require('../dist/app/cooldown')
const { ERROR_CODES } = require('../dist/app/error-codes')
const commander = require('commander')
const program   = new commander.Command()
const coolfile = require('../dist/app/coolfile')

const options = program
  .version('0.0.1')
  .option('-i, --input <glob>', 'input files to be transformed')
  .option('-o, --output <dir>', 'directory to write transformed files', './out')
  .option('-c, --coolfile <path>', 'the location of the coolfile', './coolfile.js')
  .parse(process.argv)
  .opts()

// Get coolfile
try {
  const transformations = coolfile(options.coolfile)
  console.log('[DEBUG] Transformations: ', transformations)
} catch (e) {
  console.log(`Could not find '${options.coolfile}'.`)
  process.exit(1)
}

// Run cooldown
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
      console.log("Error not caught", e.message)
      console.log("This should be reported as a bug.")
  }
}
