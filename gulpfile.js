var gulp 	= require('gulp'),
	concat 	= require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
	jshint 	= require('gulp-jshint'),
	rename 	= require('gulp-rename'),
	uglify 	= require('gulp-uglify'),
	gutil 	= require('gulp-util'),
	stylish = require('jshint-stylish');

var config = {
	styles : {
		src: './src/css/**.css',
		dest : './dist/css',
		name : 'pwag.css'
	},
	scripts : {
		src : [
			// Define files explicitly (rather than /*.js) because sort order is critical
			'./src/js/helpers.js',
			'./src/js/template.js',
			'./src/js/birthday.js',
			'./src/js/yes-no.js',
			'./src/js/links.js',
			'./src/js/lib/hello.all.min.js',
			'./src/js/social-networks.js',
			'./src/js/init.js'
		],
		dest : './dist/js',
		name : 'pwag.js'
	}
}

gulp.task('styles', function() {
	return gulp.src(config.styles.src)
		.pipe(concat(config.styles.name))
		.pipe(cssnano())
		.pipe(gulp.dest(config.styles.dest));
});

gulp.task('scripts', function(){
	return gulp.src(config.scripts.src)
		.pipe(concat(config.scripts.name))
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest(config.scripts.dest));
});

gulp.task('scripts-dev', function(){
	return gulp.src(config.scripts.src)
		.pipe(jshint())
		.pipe(concat(config.scripts.name))
		.pipe(jshint.reporter(stylish))
		.pipe(gulp.dest(config.scripts.dest));
});

gulp.task('default', ['scripts', 'styles']);
gulp.task('dev', ['scripts-dev', 'styles', 'watch']);

gulp.task('watch', function() {
	gulp.watch(config.styles.src, ['styles']);
	gulp.watch(config.scripts.src, ['scripts-dev']);
});
