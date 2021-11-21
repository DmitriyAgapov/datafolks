"use strict";
const gulp = require("gulp");
const debug = require("gulp-debug");

    gulp.task("fonts", () => {
        return gulp.src('src/fonts/**/*')
            .pipe(gulp.dest('dist/fonts'))
            .pipe(debug({
                "title": "Fonts"
            }));
    })