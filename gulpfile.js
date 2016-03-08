var browserSync = require('browser-sync').create(),
    gulp        = require('gulp'),
    ngConstant  = require('gulp-ng-constant');

var paths = {
  app:   './app'
};

gulp.task('watch', function() {
  gulp.watch('app/**/*.html').on('change', browserSync.reload);
  gulp.watch('app/**/*.js').on('change', browserSync.reload);
  gulp.watch('app/**/*.css').on('change', browserSync.reload);
  gulp.watch('config.json').on('change', browserSync.reload);
});

// gulp.task('config', function () {
//   gulp.src('./config.json')
//     .pipe(ngConstant())
//     .pipe(gulp.dest(paths.app+'/js'));
// });

// gulp.task('serve', ['watch', 'config'], function() {
gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: paths.app
  });
});

gulp.task('default', ['serve']);
