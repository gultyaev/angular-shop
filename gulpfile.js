var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    copy = require('gulp-copy'),
    imageMin = require('gulp-imagemin'),
    babel = require('gulp-babel')
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    uglify = require('gulp-uglify');

gulp.task('connect', function() {
	connect.server({
		root: './web',
		livereload: true
	});
});
//copy index
gulp.task('index', function() {
	gulp.src('./src/index.html')
	.pipe(gulp.dest('./web'))
    .pipe(livereload({start: true}));
})
//copy fonts
gulp.task('fonts', function() {
	gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('./web/fonts'));
});
//copy imgs
gulp.task('imgs', function() {
	gulp.src('./src/img/**/*')
	.pipe(gulp.dest('./web/img'));
});
//concat css
gulp.task('css', function() {
  gulp.src('./src/stylus/main.styl')
  .pipe(stylus({
    use: nib(),
    compress: true
  }))
  .pipe(gulp.dest('web/'))
  .pipe(livereload({start: true}));
});

//copy all images into web dir
gulp.task('img-update', function() {
  gulp.src('./src/img/**/*')
      .pipe(imageMin())
      .pipe(gulp.dest('./web/img'));
});

//concat js
gulp.task('js', function() {
  gulp.src('./src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(babel({
          presets: ["es2015"],
          plugins: ["transform-object-rest-spread"]
      }))
      .pipe(uglify())
      .pipe(gulp.dest('./web/'))
      .pipe(livereload({start: true}));
});
gulp.task('js-vendor', function() {
  gulp.src('./src/js/vendor/*.js')
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('./web/'))
  .pipe(livereload({start: true}));
});

//copy project to git folder
// gulp.task('git', function() {
// 	gulp.src('./site1/**/*').
// 	pipe(gulp.dest('../GitHub/site1/'));
// });
//watch
gulp.task('watch', function() {
	gulp.watch('./src/stylus/*.styl', ['css']);
	gulp.watch('./src/index.html', ['index']);
	gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('default', ['connect', 'js', 'js-vendor', 'fonts', 'index', 'css', 'watch']);