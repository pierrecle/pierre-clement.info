var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var jade = require('gulp-jade');
var data = require('gulp-data');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var connect = require('gulp-connect');
var pdf = require('gulp-html-pdf')
var uglifycss = require('gulp-uglifycss');

gulp.task('connect', function() {
    connect.server({
        root: 'build/',
        livereload: true
    });
});

gulp.task('less', function() {
    return gulp.src(['src/style/main.less'])
        .pipe(less())
        .pipe(gulp.dest('build/style/'))
        .pipe(connect.reload());
});

gulp.task('typescript', function() {
   return gulp.src(['src/scripts/**/*.ts'])
       .pipe(ts())
       .pipe(gulp.dest('build/scripts'))
       .pipe(connect.reload());
});

gulp.task('templates', function() {
    return gulp.src(['src/views/*.jade', '!src/views/layout.jade'])
        .pipe(data(function(file) {
            var filename = path.basename(file.path, '.jade');
            var data = {};
            try {
                data = require('./src/views/data/' + filename + '.json');
            }
            catch(e){}
            finally {
                data.filename = filename;
            }
            return data;
        }))
        .pipe(jade({
            pretty: true
        }))
        .on('error', function(error){
            console.error(error);
            this.emit('end');
        })
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('generate-cv-pdf', function() {
    return gulp.src('src/goodies/cv.jade')
        .pipe(data(function(file) {
            var data = {};
            try {
                data.index = require('./src/views/data/index.json');
                data.experience = require('./src/views/data/experience.json');
                data.formation = require('./src/views/data/formation.json');
            }
            catch(e){}
            finally {
            }
            return data;
        }))
        .pipe(jade())
        .pipe(pdf())
        .pipe(rename('Pierre-CLEMENT-CV.pdf'))
        .pipe(gulp.dest('build/goodies'))
});

gulp.task('copy', function () {
    gulp.src(['src/*.png'])
        .pipe(gulp.dest('build/'));
    return gulp.src(['src/goodies/*.pdf'])
        .pipe(gulp.dest('build/goodies/'));
});

gulp.task('build', ['less', 'typescript', 'templates', 'generate-cv-pdf', 'copy']);

gulp.task('watch', ['build'], function() {
    gulp.watch("src/scripts/**/*.ts", ['typescript']);
    gulp.watch(["src/style/**/*.less"], ['less']);
    gulp.watch("src/views/**/*", ['templates']);
    gulp.watch("src/*.png", ['copy']);
    gulp.watch(["src/goodies/cv.jade", "src/style/**/*.less"], ['generate-cv-pdf']);
});

gulp.task('default', ['watch', 'connect']);
