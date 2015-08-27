var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html');

var copyfiles = ['src/css/**/*', 'src/svg/**/*', 'src/img/**/*', 'src/manifest.json'];

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(uglify({
            outSourceMap: true,
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('html', function () {
    var opts = {
        spare: true
    };

    return gulp.src('src/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy', function () {
    return gulp.src(copyfiles, {
        base: 'src'
    }).pipe(gulp.dest('dist/'));
});

gulp.task('default', function () {
    gulp.start(['js', 'html', 'copy']);

    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch(copyfiles, ['copy']);
});
