#!/usr/bin/env node

commander = require('commander')
program   = new commander.Command()

program
  .version('0.0.1')
  .option('-i, --input <glob>', 'input files to be transformed')
  .option('-o, --output <dir>', 'directory to write transformed files', './out')
  .parse(process.argv)

console.log(program.opts())
