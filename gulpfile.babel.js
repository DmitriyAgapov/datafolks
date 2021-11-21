const gulp = require("gulp");

const requireDir = require("require-dir");
// const {views} = require("./tasks/views");
// const style = require("./tasks/style");
// const styleConcat = require("./tasks/styleConcat");
// const script = require("./tasks/script");
// const scriptConcat = require("./tasks/scriptConcat");
// const {image} = require("./tasks/image");
// const fonts = require("./tasks/fonts");
// const {server} = require("./tasks/server");
// const clean = require("./tasks/clean");
// const sprite = require("./tasks/sprite");
// const spritesvg = require("./tasks/spritesvg");

requireDir("./tasks/");

const development = gulp.series("clean", "sprite", "spritesvg",
    gulp.parallel(["views", "style", "styleConcat", "script", "scriptConcat", "image", "fonts"]),
    gulp.parallel("server"));


// const prod = gulp.series(clean, sprite, spritesvg,
//     gulp.series([views, style, styleConcat, script, scriptConcat, image, fonts]));

exports.dev = development
