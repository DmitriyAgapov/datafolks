const gulp = require( "gulp");
const plumber = require( 'gulp-plumber');
const errorHandler = require( 'gulp-plumber-error-handler');
const cached = require( 'gulp-cached');
const changed = require( 'gulp-changed');
const uglify = require( 'gulp-uglify');
const rename = require( "gulp-rename");
const debug = require( "gulp-debug");
const concat = require( 'gulp-concat');


    gulp.task("scriptConcat", () => {
        return gulp.src(['src/scripts/plugins.js', 'src/components/**/*.js', 'src/scripts/theme.js'])
            .pipe(uglify())
            .pipe(concat('theme-concat.js'))
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest('dist/js'))
            .pipe(debug({
                "title": "JS files"
            }));
    })