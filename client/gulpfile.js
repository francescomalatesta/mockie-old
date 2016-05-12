var gulp = require("gulp");
var webpack = require("webpack-stream");
var minify = require('gulp-minify');
var del = require('del');

gulp.task('clean', function () {
    return del([
        'public/js/*'
    ]);
});

gulp.task('build', function() {
    gulp
        .src('src/Main.js')
        .pipe(webpack(require('./webpack.config')))
        .pipe(minify({
            noSource: false
        }))
        .pipe(gulp.dest(''));
});

gulp.task('default', ['clean', 'build']);
