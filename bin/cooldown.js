#!/usr/bin/env node

const { Application } = require('../dist/app/application')
const { Compiler } = require('../dist/app/compiler')
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

// build compiler using coolfile
let compiler = null
try {
  const transformations = coolfile(options.coolfile)
  if(!Array.isArray(transformations)) {
    console.log(`Invalid coolfile, '${options.coolfile}' must export an array.`)
    process.exit(1)
  }

  compiler = new Compiler(transformations)
} catch (e) {
  console.log(`Could not find '${options.coolfile}'.`)
  throw e
}

// start application!
try {
  new Application(options.input, options.output, compiler).run()
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
      throw e
  }
}
