// global requires
var gulp = require('gulp');

// JS build requires
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');

// CSS build requires
var sass = require('gulp-sass');
var rename = require('gulp-rename');

// CSS build
gulp.task('css', function(){
  return gulp.src('frontend/index.scss')
    .pipe(sass(
      {errorLogToConsole: true, outputStyle: 'compressed'}
    ))
    .on('error', console.error.bind(console))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/'))
});

// JS build
var jsEntry = 'frontend/index.js';

gulp.task('js', function(){
  return browserify(jsEntry)
    .transform(babelify.configure({presets: ["@babel/preset-env"]}))
    .bundle()
    .pipe(source(jsEntry))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.dirname = '';
      path.extname = '.min.js';
    }))
    .pipe(gulp.dest('build/'))
});

gulp.task('default', ['css', 'js']);