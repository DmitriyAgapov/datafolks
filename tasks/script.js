"use strict";

const gulp = require( "gulp");
const plumber = require( 'gulp-plumber');
const errorHandler = require( 'gulp-plumber-error-handler');
const cached = require( 'gulp-cached');
const changed = require( 'gulp-changed');
const uglify = require( 'gulp-uglify');
const rename = require( "gulp-rename");
const debug = require( "gulp-debug");

    gulp.task("script", () => {
        return gulp.src(['src/components/**/*.js', 'src/scripts/**/*.js', 'src/vendors/**/*.js'])
            .pipe(plumber({
                errorHandler: errorHandler(`Ошибка в \'JS\' task`)
            }))
            .pipe(cached('js'))
            .pipe(changed('src/js/', {
                extension: '.js'
            }))
            .pipe(uglify())
            .pipe(rename({
                suffix: ".min",
                dirname: '.'
            }))
            .pipe(gulp.dest('dist/js'))
            .pipe(debug({
                "title": "JS files"
            }));
    })