const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

// Sass compilation
gulp.task('sass', done => {
    gulp.src('src/assets/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss({ "uglyComments": true }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('public/css'))

    done()
});

// Sass watching, depending on "sass" task
gulp.task('sass:watch', function () {
    gulp.watch('./src/assets/scss/**/*.scss', gulp.series('sass'));
});

// JS compilation
gulp.task('js', done => {
    gulp.src('src/assets/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/js'))

    done()
});

// JS watching, depending on "js" task
gulp.task('js:watch', function () {
    gulp.watch('./src/assets/js/**/*.js', gulp.series('js'));
});

// Application watching
gulp.task('appMonitor:watch', function () {
    gulp.watch(['./**/*.js', './**/*.css', './**/*.njk']).on("change", browserSync.reload);
});

// Nodemon task:
// Start nodemon once and execute callback (browser-sync)
gulp.task('nodemon', cb => {
    let started = false;
    return nodemon({
        script: './server/server.js'
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;
        }
    });
});

// BrowserSync task:
// calls nodemon tasks and pass itself as callback
gulp.task(
    'browser-sync',
    gulp.series('nodemon', () => {
        browserSync.init(null, {
            proxy: 'http://localhost:8000',
            files: ['public/**/*.*'],
            port: 8001
        });
    })
);

// Dev Task:
// Parallel execution of browser-sync/nodemon
// and sass watching
gulp.task('default', gulp.series('sass', 'js', gulp.parallel('browser-sync', 'sass:watch', 'js:watch', 'appMonitor:watch')));