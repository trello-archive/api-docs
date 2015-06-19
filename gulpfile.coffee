gulp = require 'gulp'
path = require 'path'
gutil = require 'gulp-util'
concat = require 'gulp-concat'
less = require 'gulp-less'
minifyCSS = require 'gulp-minify-css'
rename = require 'gulp-rename'
LessPluginAutoPrefix = require 'less-plugin-autoprefix'

stylesSrc = './src/styles/entries/app.less'

autoprefix = new LessPluginAutoPrefix
  browsers: [
    'last 3 Chrome versions'
    'last 3 Firefox versions'
  ]

gulp.task 'styles', ->

  gulp
    .src stylesSrc
    .pipe less({
      paths: [path.join(__dirname, './src/styles')]
      plugins: [autoprefix]
    }).on 'error', (err) ->
      gutil.log(err)
      this.emit('end')
    .pipe gulp.dest('./app/styles')
    .pipe minifyCSS()
    .pipe rename('app.min.css')
    .pipe gulp.dest('./app/styles')

gulp.task 'watch', ->
  gulp.watch './src/styles/**/*', ['styles']

gulp.task 'default', ['styles', 'watch']
