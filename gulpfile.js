'use strict';

let gulp  = require('gulp');
let jshint = require('gulp-jshint');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let gutil = require('gulp-util');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
	return gulp.src('app/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
	return gulp.src('app/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		//only uglify if gulp is ran with '--type production'
		.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch('app/js/**/*.js', ['jshint']);
});