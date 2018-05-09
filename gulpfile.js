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
		src  : './src/css/**.css',
		dest : './dist/css',
		name : {
			dev  : 'pwag.css',
			dist : 'pwag.min.css'
		},
		opts : {
			zindex: false
		}
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
		name : {
			dev  : 'pwag.js',
			dist : 'pwag.min.js'
		}
	}
}

gulp.task('styles-dev', function() {
	return gulp.src(config.styles.src)
		.pipe(concat(config.styles.name.dev))
		.pipe(gulp.dest(config.styles.dest));
});

gulp.task('styles', function() {
	return gulp.src(config.styles.src)
		.pipe(concat(config.styles.name.dist))
		.pipe(cssnano(config.styles.opts))
		.pipe(gulp.dest(config.styles.dest));
});

gulp.task('scripts-dev', function(){
	return gulp.src(config.scripts.src)
		.pipe(jshint())
		.pipe(concat(config.scripts.name.dev))
		.pipe(jshint.reporter(stylish))
		.pipe(gulp.dest(config.scripts.dest));
});

gulp.task('scripts', function(){
	return gulp.src(config.scripts.src)
		.pipe(concat(config.scripts.name.dist))
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest(config.scripts.dest));
});

gulp.task('default', ['scripts', 'styles']);
gulp.task('dev', ['scripts-dev', 'styles-dev', 'watch']);
gulp.task('all', ['scripts', 'scripts-dev', 'styles', 'styles-dev']);

gulp.task('watch', function() {
	gulp.watch(config.styles.src, ['styles-dev']);
	gulp.watch(config.scripts.src, ['scripts-dev']);
});
