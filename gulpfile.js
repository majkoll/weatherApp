var gulp = require('gulp'), 
	sass = require('gulp-ruby-sass'),
	minifycss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'), 
	rename = require('gulp-rename'), 
	notify = require('gulp-notify'), 
	jshint = require('gulp-jshint'), 
	uglify = require('gulp-uglify'),
	webserver = require('gulp-webserver');

gulp.task('sass', function() {
	return sass('app/scss/*.scss', {style: 'expanded'})
		.on('error', sass.logError)
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('app/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({message: 'sass are fixed'}));
});

gulp.task('js', function() {
	return gulp.src('app/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js/'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({message: 'js are fixed'}));
});

gulp.task('webserver', function() {
	gulp.src('./dist')
		.pipe(webserver({
			livereload: true, 
			open: true,
			directoryListing: {
				enable: true,
				path: './dist'
			},
			port: 9000,
		}))
});

gulp.task('watch', function() {
	gulp.watch('app/scss/*.scss', ['sass']);
	gulp.watch('app/js/*.js', ['js']);
});

gulp.task('default', ['webserver', 'sass', 'js', 'watch']);