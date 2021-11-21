"use strict";

const gulp = require( "gulp");
const sass = require('gulp-sass')(require('node-sass'));
const groupmedia = require( "gulp-group-css-media-queries");
const autoprefixer = require( "gulp-autoprefixer");
const mincss = require( "gulp-clean-css");
const rename = require( "gulp-rename");
const concat = require( 'gulp-concat');


gulp.task("styleConcat", () => {
    return gulp.src([
        'src/styles/**/*.scss',
        'src/vendors/**/*.scss',
        'src/vendors/**/*.css',
        'src/components/**/*.scss'
    ])
        .pipe(sass())
        .pipe(groupmedia())
        .pipe(autoprefixer({
            cascade: false,
            grid: true
        }))
        .pipe(mincss({
            compatibility: "ie8", level: {
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
        .pipe(concat('styles.css'))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist/css'))
})