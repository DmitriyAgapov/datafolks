"use strict";

const gulp =require("gulp");
const plumber =require("gulp-plumber");
const errorHandler =require('gulp-plumber-error-handler');
const sourcemaps =require("gulp-sourcemaps");
const gulpIf =require('gulp-if');
const cached =require('gulp-cached');
const changed =require('gulp-changed');
const inheritance =require('gulp-sass-inheritance');
const filter =require('gulp-filter');
const sass = require('gulp-sass')(require('node-sass'));

const groupmedia =require("gulp-group-css-media-queries");
const autoprefixer =require("gulp-autoprefixer");
const mincss =require("gulp-clean-css");
const rename =require("gulp-rename");
const concat =require('gulp-concat');
const debug =require("gulp-debug");
// import browsersync from "browser-sync";
// import yargs from "yargs";

// const argv = yargs.argv,
//     production = !!argv.production;

  gulp.task("style", () => {

        return gulp.src([
            'src/styles/**/*.scss',
            'src/vendors/**/*.scss',
            'src/vendors/**/*.css',
            'src/components/**/*.scss'
        ])
            .pipe(sourcemaps.init())
            .pipe(plumber({
                errorHandler: errorHandler(`Ошибка в \'Стилях\' task`)
            }))
            .pipe(cached('sass'))
            .pipe(changed('dist/css/', {
                extension: '.css'
            }))
            .pipe(gulpIf(global.isWatching, inheritance({
                dir: 'src'
            })))
            .pipe(filter(file => /src[\\\/]components/.test(file.path) || /src[\\\/]styles/.test(file.path) || /src[\\\/]vendors/.test(file.path)))
            .pipe(sass())
            .pipe(groupmedia())
            .pipe(autoprefixer({
                cascade: false,
                grid: true
            }))
            .pipe(mincss({
                compatibility: "ie10", level: {
                    1: {
                        specialComments: 0,
                        removeWhitespace: true,
                        semicolonAfterLastProperty: true
                    },
                    2: {
                        mergeAdjacentRules: true,
                        mergeMedia: true,
                        removeEmpty: true,
                        removeDuplicateFontRules: true,
                        removeDuplicateMediaBlocks: true,
                        removeDuplicateRules: true,
                        removeUnusedAtRules: false
                    }
                }
            }))
            .pipe(rename({
                dirname: '.',
                suffix: ".min"
            }))
            .pipe(plumber.stop())
            .pipe(sourcemaps.write("./maps/"))
            .pipe(debug({
                "title": "CSS files"
            }))
            .pipe(gulp.dest('dist/css'));
        // .pipe(browsersync.stream());
    })