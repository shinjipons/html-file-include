const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// HTML task
function html() {
  return gulp.src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("src/**/*.html", html);
}

// BrowserSync
function browserSyncInit() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

// Define complex tasks
const watch = gulp.parallel(watchFiles, browserSyncInit);
const build = gulp.series(html);

// Export tasks
exports.html = html;
exports.watch = watch;
exports.build = build;
exports.default = build;