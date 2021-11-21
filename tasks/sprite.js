"use strict";

const gulp = require( "gulp");
const plumber = require( 'gulp-plumber');
const errorHandler = require( 'gulp-plumber-error-handler');
const spritesmith = require( 'gulp.spritesmith');
const buffer = require( 'vinyl-buffer');
const merge = require( 'merge-stream');
// const browsersync = require( "browser-sync";

let spritesPaths = {
    icons: {
        images: 'src/img/icons/*.png',
        imgName: 'sprite.png',
        cssName: '_sprites.scss',
        imgPath: '../img/sprite.png',
        scss: 'src/styles/helpers'
    }
};


gulp.task("sprite", function () {
        let spriteData = gulp.src(spritesPaths.icons.images).pipe(spritesmith({
            imgName: spritesPaths.icons.imgName,
            cssName: spritesPaths.icons.cssName,
            imgPath: spritesPaths.icons.imgPath
        }));
        let imgStream = spriteData.img
            .pipe(buffer())
            .pipe(gulp.dest('src/img'));
        let cssStream = spriteData.css
            .pipe(gulp.dest(spritesPaths.icons.scss));
        // .on("end", browsersync.reload);
        return merge(imgStream, cssStream);
    })