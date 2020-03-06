var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('gulp_nodemon', function () {
    nodemon({
        script: './server/server',
        env: { 'NODE_ENV': 'development' },
    });
});

gulp.task('sync', function () {
    browserSync.init({
        port: 8001,
        proxy: 'http://localhost:8000/',
        reloadDelay: 500
    });
    return gulp.watch(['./**/*.js', './**/*.css', './**/*.scss']).on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('gulp_nodemon', 'sync'));
