const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("gulp-cssnano");
const babel = require("gulp-babel");
const mode = require("gulp-mode")();
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const postImport = require("postcss-import");
const autoprefixer = require("autoprefixer");

function cssTask(cb) {
  return gulp
    .src("./src/sass/app.sass")
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([postImport(), autoprefixer()]))
    .pipe(cssnano())
    .pipe(gulp.dest("./public/css/"))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(browserSync.stream());
  cb();
}

function jsTask(cb) {
  return gulp
    .src("src/js/*.js")
    .pipe(
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              useBuiltIns: "entry",
            },
          ],
        ],
      })
    )
    .pipe(gulp.dest("public/js/"))
    .pipe(browserSync.stream());
  cb();
}

function webpackTask(cb) {
  return gulp
    .src("./public/js/app.js")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest("./public/js/"));
  cb();
}

function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: ["public", "static"],
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  gulp.watch(
    "./src/js/*.js",
    gulp.series(jsTask, webpackTask, browsersyncReload)
  );
  gulp.watch(["./src/sass/*.sass"], gulp.series(cssTask, browsersyncReload));
}

if (mode.production()) {
  module.exports.default = gulp.series(
    cssTask,
    jsTask,
    webpackTask,
    browsersyncServe
  );
} else {
  module.exports.default = gulp.series(
    cssTask,
    jsTask,
    webpackTask,
    browsersyncServe,
    watchTask
  );
}
