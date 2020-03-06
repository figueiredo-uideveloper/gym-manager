// const gulp = require('gulp')
// const sass = require('gulp-sass')
// const uglifycss = require('gulp-uglifycss')
// const concat = require('gulp-concat')

// gulp.task('default', () => {
//     gulp.src('src/assets/scss/main.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(uglifycss({"uglyComments": true}))
//     .pipe(concat('style.min.css'))
//     .pipe(gulp.dest('public/css'))
// })


// var gulp = require('gulp');
// var nodemon = require('gulp-nodemon');
// var browserSync = require('browser-sync').create();

// gulp.task('gulp_nodemon', function () {
//     nodemon({
//         script: './server',
//         env: { 'NODE_ENV': 'development' },
//     });
// });

// gulp.task('sync', function () {
//     browserSync.init({
//         port: 8001,
//         proxy: 'http://localhost:8000/',
//         reloadDelay: 500
//     });
//     return gulp.watch(['./**/*.js', './**/*.css']).on("change", browserSync.reload);
// });

// gulp.task('default', gulp.parallel('gulp_nodemon', 'sync'));


var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Javascripts
gulp.task('js', function () {
    return gulp.src('./public/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js/'))
        .pipe(reload({ stream: true }));
});


// Stylesheets
gulp.task('sass', function () {
    return gulp.src('./public/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css/'))
        .pipe(reload({ stream: true }));
});

// Nodemon
gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: './bin/www',
        ext: '.js .ejs',
        ignore: [
            'public/**/*.js',
            'node_modules/**/*.js'
        ],
        env: {
            'NODE_ENV': 'development',
            'PORT': 8888
        },
    }).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    }).on('restart', function () {
        console.log('Nodemon restarted!');
    });
});

// BrowserSync
gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init({
        proxy: "localhost:8888",
        open: false,
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        },
        // browser: "Google Chrome",
        notify: true
        // notify: {
        //     styles: {
        //         top: 'auto',
        //         bottom: '0'
        //     }
        // }
    });
});

// Build
gulp.task('build', ['js', 'sass']);

// Default
gulp.task('default', ['sass', 'js', 'browser-sync'], function () {
    gulp.watch('./public/sass/**/*.scss', ['sass']);
    gulp.watch('./public/js/**/*.js', ['js']);
    gulp.watch('./views/**/*.ejs', reload);
});