var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var exec = require('gulp-exec');

gulp.task('css', function(){
    gulp.src('client/css/**/*.css')
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('client/min'))
});

gulp.task('javascript', function(){
	gulp.src('client/js/**/*.js')
   .pipe(concat('custom.min.js'))
   //.pipe(uglify())
   .pipe(gulp.dest('client/min/'));
});

gulp.task('server', function (cb) {
  exec('node server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('default', ['css', 'javascript','server'], function() {

});