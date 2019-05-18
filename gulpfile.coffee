{ src, dest, watch, series } = require('gulp')
coffee = require('gulp-coffee')
del = require('del')

cleanTask = ->
  del ['./dist/**/*']

coffeeTask = ->
  src('./src/**/*.coffee')
    .pipe(coffee(bare: true))
    .pipe(dest('./dist/'))

watch ['src/**/*.coffee'], series(cleanTask, coffeeTask)

exports.default = series(cleanTask, coffeeTask)
