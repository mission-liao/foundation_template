var gulp = require('gulp');
var _ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del'],
    rename: {
        'gulp-minify-html': 'minify_html',
        'gulp-minify-css': 'minify_css'
    }
});

// :clean:
gulp.task('clean', function (cb) {
    _.del(['dist/**', '!dist', 'app/css/app.css'], cb);
});


// :sass:
// compile .scss file to css, and copy to dist folder
gulp.task('compile:sass', ['clean'], function () {
    // compile
    return gulp.src(['app/scss/**/*.scss'])
        .pipe(_.sass({includePaths: ['app/bower_components/foundation/scss']}))
        .pipe(gulp.dest('dist/css'));
});

// copy compiled css file to app/css, let connect:app worked.
gulp.task('copy:css', ['compile:sass'], function () {
    // copy css to app/css
    return gulp.src('dist/css/app.css')
        .pipe(gulp.dest('app/css/'));
});

// copy font-aswsome to dist
gulp.task('copy:font', function () {
    return gulp.src('app/bower_components/font-awesome/fonts/**')
        .pipe(gulp.dest('dist/fonts/'))
});

// javascript code quality tool
gulp.task('jshint', ['clean'], function () {
    return gulp.src('app/js/**/*.js')
        .pipe(_.jshint())
        .pipe(_.jshint.reporter('default'));
});

// usemin, everything related to build code is here
gulp.task('usemin', ['jshint', 'copy:css'], function () {
    return gulp.src('app/index.html')
        .pipe(_.usemin({
            css: [_.minify_css(), 'concat'],
            html: [_.minify_html({empty:true})],
            js: [_.uglify(), _.rev()]
        }))
        .pipe(gulp.dest('dist'))
});

// server launching: app
gulp.task('connect:app', function () {
    return _.connect.server({
        root: 'app',
        livereload: true,
        port: 9001
    });
});

// server launching: dist
gulp.task('connect:dist', ['usemin', 'copy:font'], function () {
    return _.connect.server({
        root: 'dist',
        livereload: true,
        port: 9002
    });
});

gulp.task('default', ['usemin', 'connect:dist'])
