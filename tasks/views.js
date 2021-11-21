const gulp = require( "gulp");
const gulpif = require( "gulp-if");
const plumber = require( "gulp-plumber");
const jade = require( "gulp-jade");
// const prettify = require( 'gulp-jsbeautifier');
const inheritance = require( 'gulp-jade-inheritance');
const cached = require( 'gulp-cached');
const filter = require( 'gulp-filter');
const rename = require( 'gulp-rename');
// const debug = require( "gulp-debug");
const errorHandler = require( 'gulp-plumber-error-handler');
// const changed = require( 'gulp-changed');
// const notify = require( "gulp-notify");
// const useref = require( 'gulp-useref');
// const csso = require( 'gulp-csso');
// const replace = require( "gulp-replace");
const browsersync = require( "browser-sync");
const yargs = require( "yargs");
// function views(cb) {
//     cb(

    gulp.task("views", () => {
        return gulp.src('src/**/*.jade')
            .pipe(plumber({
                errorHandler: errorHandler(`Ошибка в \'template\' task`)
            }))
            .pipe(cached('jade'))
            .pipe(gulpif(global.isWatching, inheritance({
                basedir: 'src'
            })))
            .pipe(filter(function(file) {
                return /src[\\\/]templates/.test(file.path) && !/src[\\\/]templates[\\\/]layout[\\\/]default[\.]jade/.test(file.path) && !/src[\\\/]templates[\\\/]helpers/.test(file.path);
            }))
            .pipe(jade({
                basedir: 'src',
                pretty: true
            }))
            .pipe(rename({
                dirname: '.'
            }))
            .pipe(gulp.dest('dist/'))
        // .pipe(browsersync.stream());
    })
// module.exports = views