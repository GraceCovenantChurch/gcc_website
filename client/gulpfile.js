var gulp =  require("gulp");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task("transpile", function(){
  gulp.src(['assets/javascript/app.js', '!assets/javascript/vendor/*.js', 'assets/javascript/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task("watch", ["transpile"], function() {
  gulp.watch("assets/javascript/**/*.js", ["transpile"]);
});
