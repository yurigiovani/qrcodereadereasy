const 	gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		gls = require('gulp-live-server'),
		browserify = require('gulp-browserify'),
		rename = require('gulp-rename');

gulp.task('default', ['browserify', 'css', 'watch', 'serve', 'cordova']);

gulp.task('css', function() {

	gulp.src([
		'app/resources/css/font-material-icons/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2'
	])
	.pipe(gulp.dest('public/css'));

	return gulp.src([
		'node_modules/angular-material/angular-material.css',
		'app/resources/css/font-material-icons/font-material-icons.css'
	])
	.pipe(concat('app.css'))
	.pipe(gulp.dest('public/css'));

});

gulp.task('watch', function() {

	gulp.watch('app/**/*.js', ['browserify']);

});

gulp.task('serve', function() {

	var server = gls.static('./public', 3000);
	server.start();

	gulp.watch('public/js/**/*.js', function(file) {
		server.notify.apply(server, [file]);
	});
	gulp.watch('public/**/*.html', function(file) {
		server.notify.apply(server, [file]);
	});

});

gulp.task('browserify', function() {

	return gulp.src([
				'app/app.js'
			])
			.pipe(browserify())
			// .pipe(uglify())
			.pipe(rename('main.js'))
			.pipe(gulp.dest('public/js/'));

});

gulp.task('cordova', function() {

	gulp.src([
		'public/**/*'
	]).
	pipe(gulp.dest('cordova/www/'));

	gulp.src([
		'app/resources/icons/android/*'
	]).
	pipe(gulp.dest('cordova/res/android'));

	gulp.src([
		'app/resources/splashscreen/android/*'
	]).
	pipe(gulp.dest('cordova/res/screen/android'));

});