var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('less', function() {
	return gulp.src('app/less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('watch', ['browserSync', 'less'], function() {
	gulp.watch('app/less/**/*.less', ['less']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
	// Caching images that ran through imagemin
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback)
});

gulp.task('build', function (callback) {
	runSequence('clean:dist',
		['less', 'useref', 'images'],
		callback
	)
});

gulp.task('default', function (callback) {
	runSequence(['less','browserSync', 'watch'],
		callback
	)
});