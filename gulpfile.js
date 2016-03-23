const gulp = require('gulp'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    insert = require('gulp-insert'),
    json = require('gulp-json-editor'),
    settings = require('./package.json'),
	versionHeader = ["/*! ", settings.description, " - ", settings.version, " */\n"].join("");

gulp.task('clean', clean);
gulp.task('minify', ['clean'], minifyJs);
gulp.task('default', ['minify']);
gulp.task('bower:update', updateBowerSettings);
    
function clean() {
    return del('dist');
}

function minifyJs() {
    
    return gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(insert.prepend(versionHeader))
        .pipe(gulp.dest('./dist/'));
}