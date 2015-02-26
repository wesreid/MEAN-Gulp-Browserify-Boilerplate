'use strict';
var gulp = require('gulp')
    , sass = require('gulp-sass')
    , minifyCss = require('gulp-minify-css')
    , rename = require('gulp-rename')
    , jshint = require('gulp-jshint')
    , browserify = require('gulp-browserify')
    , clean = require('gulp-clean')
    , uglify = require('gulp-uglify')
    , sourcemaps = require('gulp-sourcemaps')
    , plumber = require('gulp-plumber')
    , stringify = require('stringify')
    , nodemon = require('gulp-nodemon')
    , livereload = require('gulp-livereload')
    ;


var paths = {
    sass: ['./scss/**/*.scss','./public/js/**/*.scss']
    , js: ['!./public/js/bundled.js', '!./public/js/dist/**/**.js', './public/js/**/*.js']
    , html: ['./public/js/**/*.html']
};

gulp.task('default', ['sass','lint','js']);

gulp.task('js', function() {
    if (process.env.NODE_ENV === 'production') {
        gulp.src(['./public/js/index.js'])
            .pipe(plumber())
            .pipe(browserify({
                insertGlobals: true,
                debug: true
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./public/js/dist/'))
        ;
    }
    else {
        gulp.src(['./public/js/index.js'])
            .pipe(plumber())
            .pipe(browserify({
                transform: ['stringify'],
                extensions: ['.html', '.json'],
                insertGlobals: true,
                debug: true
            }))
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            //.pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public/dist/'))
        ;
    }
});

gulp.task('sass', function(done) {
    var includePaths = require('node-bourbon').includePaths
        , appSassIncludePaths = require('./lib/SassIncludePaths').getIncludePaths('./public/js');
    gulp.src('./scss/main.scss')
        .pipe(plumber({errorHandler:function(err) {
            console.log(err);
            this.emit('end');
        }}))
        .pipe(sass({includePaths: includePaths.concat(appSassIncludePaths)}))
        .pipe(gulp.dest('./public/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./public/css/'))
        .on('end', done);
});

gulp.task('watch', function(cb) {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['lint','js']);
});

gulp.task('lint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function() {
    gulp.src('./public/js/bundled.js')
        .pipe(clean({force: true}));
});

gulp.task('run', function () {
    livereload.listen();
    nodemon({
            script: 'server.js'
            , ext: 'html js scss'
            , ignore: [
                'node_modules/**/*.js'
                ,'public/js/bundled.js'
                , 'public/js/dist/**/**.js'
            ]
            , env: {
                'NODE_ENV': 'development'
                , 'PORT': 10100
            }
            , watch: [
                'app'
                , 'config'
                , 'lib'
                , 'scss'
                , 'public/js'
            ]
            , nodeArgs: []
        }
    )
        .on('change', ['sass','lint','js'])
        .on('restart', function () {
            console.log('-----\nrefreshed server at ',Date.now(),'\n-----');
            setTimeout(livereload.reload, 1000);
        })
});

gulp.task('run-qa', function () {
    livereload.listen();
    nodemon({
            script: 'server.js'
            , ext: 'html js scss'
            , ignore: [
                'node_modules/**/*.js'
                , 'public/js/dist/index.js'
            ]
            , env: {
                'NODE_ENV': 'qa'
                , 'PORT': 10100
            }
            , watch: [
                'app'
                , 'config'
                , 'lib'
                , 'scss'
                , 'public/js'
            ]
            , nodeArgs: ['--debug']
        }
    )
        .on('change', ['sass','lint','js'])
        .on('restart', function () {
            console.log('-----\nrefreshed server at ',Date.now(),'\n-----');
            setTimeout(livereload.reload, 1000);
        })
});

gulp.task('run-prod', function () {
    livereload.listen();
    nodemon({
            script: 'server.js'
            , ext: 'html js scss'
            , ignore: [
                'node_modules/**/*.js'
                , 'public/js/dist/index.js'
            ]
            , env: {
                'NODE_ENV': 'production'
                , 'PORT': 10100
            }
            , watch: [
                'app'
                , 'config'
                , 'lib'
                , 'scss'
                , 'public/js'
            ]
            , nodeArgs: ['--debug']
        }
    )
        .on('change', ['sass','lint','js'])
        .on('restart', function () {
            console.log('-----\nrefreshed server at ',Date.now(),'\n-----');
            setTimeout(livereload.reload, 1000);
        })
});

gulp.task('run-debug', function () {
    livereload.listen();
    nodemon({
            script: 'server.js'
            , ext: 'html js scss'
            , ignore: [
                'node_modules/**/*.js'
                , 'public/js/dist/index.js'
            ]
            , env: {
                'NODE_ENV': 'development'
                , 'PORT': 10100
            }
            , watch: [
                'app'
                , 'config'
                , 'lib'
                , 'scss'
                , 'public/js'
            ]
            , nodeArgs: ['--debug']
        }
    )
        .on('change', ['sass','lint','js'])
        .on('restart', function () {
            console.log('-----\nrefreshed server at ',Date.now(),'\n-----');
            setTimeout(livereload.reload, 1000);
        })
});
