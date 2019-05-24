{ src, dest, watch, series } = require('gulp')
coffee = require('gulp-coffee')
del = require('del')
# used for `documentationTask`
{ Cooldown, Compiler, loader } = require('./dist/app/index')

cleanTask = ->
  del ['./dist/**/*']

coffeeTask = ->
  src('./src/**/*.coffee')
    .pipe(coffee(bare: true))
    .pipe(dest('./dist/'))

compiler = new Compiler([loader('TableOfContents')(basePath: 'https://github.com/gosukiwi/cooldown-cli/blob/master/dist/doc/available-transformations.md#')])
cooldown = new Cooldown('./src/doc/*.md', './dist/doc', compiler)
documentationTask = (done) ->
  cooldown.run(done)

watch ['src/**/*.coffee'], series(cleanTask, coffeeTask, documentationTask)
watch ['src/doc/*.md'], documentationTask

exports.default = series(cleanTask, coffeeTask, documentationTask)
