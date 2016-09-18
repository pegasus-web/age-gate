var gulp = require('gulp'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	stylish = require('jshint-stylish');

gulp.task('styles', function() {
	return gulp.src('./src/css/pwag.css')
		.pipe(cssnano())
		.pipe(rename('pwag.min.css'))
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', function(){
	// Define files explicitly (rather than /*.js) because sort order is critical
	return gulp.src([
		'./src/js/helpers.js',
		'./src/js/template.js',
		'./src/js/core.js',
		'./src/js/init.js'
	])
		.pipe(concat('pwag.min.js'))
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['scripts', 'styles']);