let gulp = require('gulp');

let clean = require('gulp-clean');
let jshint = require('gulp-jshint');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let useref = require('gulp-useref');

let bases = {
	app: 'app/',
	dist: 'dist/',
};

let paths = {
	scripts: ['js/**/*.js'],
	styles: ['css/style.css'],
	html: ['index.html'],
	images: ['images/**/*.png', 'images/**/*.svg'],
	data: ['data/*.json']
};

gulp.task('clean', function() {
	return gulp.src(bases.dist)
		.pipe(clean());
});

gulp.task('jshint', function() {
	return gulp.src('app/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('useref', ['clean'], function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		// .pipe(uglify()) //left out because uglify does not support ES6
		.pipe(gulp.dest(bases.dist))
});

gulp.task('copy', ['clean'], function() {
	gulp.src(paths.data)
		.pipe(gulp.dest(bases.dist + 'data'));

	gulp.src(paths.images, {cwd: bases.app})
		.pipe(gulp.dest(bases.dist + 'images'));

	gulp.src(paths.styles, {cwd: bases.app})
		.pipe(gulp.dest(bases.dist + 'css'));
});

gulp.task('default', ['clean', 'useref', 'copy']);