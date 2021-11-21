"use strict";

const gulp = require("gulp");
const favicons = require("gulp-favicons");
const debug = require("gulp-debug");

gulp.task("favicon", () => {
    return gulp.src('./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}')
        .pipe(favicons({
            icons: {
                appleIcon: false,
                favicons: true,
                online: false,
                appleStartup: false,
                android: false,
                firefox: false,
                yandex: false,
                windows: false,
                coast: false
            }
        }))
        .pipe(gulp.dest('dist/img/favicon/'))
        .pipe(debug({
            "title": "Favicons"
        }));
});
