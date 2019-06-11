#!/usr/bin/env node

const { Application } = require('../dist/app/application')
const { Compiler } = require('../dist/app/compiler')
const { reportError } = require('../dist/app/errors')
const commander = require('commander')
const program   = new commander.Command()
const coolfile = require('../dist/app/coolfile')

const options = program
  .version('0.0.2')
  .option('-i, --input <glob>', 'input files to be transformed')
  .option('-o, --output <dir>', 'directory to write transformed files', './out')
  .option('-c, --coolfile <path>', 'the location of the coolfile', './coolfile.js')
  .parse(process.argv)
  .opts()

function runApplication(compiler) {
  new Application(options.input, options.output, compiler).run(function () {
    console.log("Done!")
  })
}

try {
  const transformations = coolfile(options.coolfile)
  if(!Array.isArray(transformations)) {
    console.log(`Invalid coolfile, '${options.coolfile}' must export an array.`)
    process.exit(1)
  }

  const compiler = new Compiler(transformations)
  runApplication(compiler)
} catch (e) {
  reportError(e)
}
