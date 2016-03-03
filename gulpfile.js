var browserSync = require('browser-sync').create(),
    gulp        = require('gulp');

var paths = {
  app:   './app'
};

gulp.task('watch', function() {
  gulp.watch('app/**/*.html').on('change', browserSync.reload);
  gulp.watch('app/**/*.js').on('change', browserSync.reload);
  gulp.watch('app/**/*.css').on('change', browserSync.reload);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: paths.app
  });
});

gulp.task('default', ['serve']);
