{ src, dest, watch, series } = require('gulp')
coffee = require('gulp-coffee')
run = require('gulp-run')
del = require('del')

cleanTask = ->
  del ['./dist/**/*']

coffeeTask = ->
  src('./src/**/*.coffee')
    .pipe(coffee(bare: true))
    .pipe(dest('./dist/'))

testsTask = ->
  run('npm run test').exec()

watch ['src/**/*.coffee'], series(cleanTask, coffeeTask, testsTask)

exports.default = series(cleanTask, coffeeTask, testsTask)
