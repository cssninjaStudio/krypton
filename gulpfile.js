import gulp from "gulp";

import gulpSass from "gulp-sass";
import concat from "gulp-concat";
import imagemin from "gulp-imagemin";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import panini from "panini";
import sassCompiler from "sass";
import del from "del";
import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
import logSymbols from "log-symbols";
import BrowserSync from "browser-sync";

import options from "./config.js";

const { src, dest, watch, series, parallel } = gulp;
const browserSync = BrowserSync.create();
const nodepath = "node_modules/";
const sass = gulpSass(sassCompiler);

//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base,
    },
    port: options.config.port || 5000,
  });
  done();
}

//Copy latest installed Bulma
function setupBulma() {
  console.log("\n\t" + logSymbols.info, "Installing Bulma Files..\n");
  return src([nodepath + "bulma/*.sass", nodepath + "bulma/**/*.sass"]).pipe(
    dest("src/sass/")
  );
}

//Compile Scss code
function compileSCSS() {
  console.log(logSymbols.info, "Compiling App SCSS..");
  return src(["src/scss/main.scss"])
    .pipe(
      sass({
        outputStyle: "compressed",
        sourceComments: "map",
        sourceMap: "scss",
        // includePaths: bourbon,
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer("last 2 versions"))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

//Compile HTML partials with Panini
function compileHTML() {
  console.log(logSymbols.info, "Compiling HTML..");
  panini.refresh();
  return src("src/pages/**/*.html")
    .pipe(
      panini({
        root: "src/pages/",
        layouts: "src/layouts/",
        partials: "src/partials/",
        helpers: "src/helpers/",
        data: "src/data/",
      })
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

//Concat JS
function concatJs() {
  console.log(logSymbols.info, "Compiling Vendor Js..");
  return src(["src/vendor/js/*"])
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

//Concat CSS Plugins
function concatCssPlugins() {
  console.log(logSymbols.info, "Compiling Plugin styles..");
  return src([
    nodepath + "simplebar/dist/simplebar.min.css",
    nodepath + "plyr/dist/plyr.css",
    nodepath + "codemirror/lib/codemirror.css",
    nodepath + "codemirror/theme/shadowfox.css",
    "src/vendor/css/*",
  ])
    .pipe(sourcemaps.init())
    .pipe(concat("app.css"))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

//Reset Panini Cache
function resetPages(done) {
  console.log(logSymbols.info, "Clearing Panini Cache..");
  panini.refresh();
  done();
}

//Triggers Browser reload
function previewReload(done) {
  console.log(logSymbols.info, "Reloading Browser Preview.");
  browserSync.reload();
  done();
}

//Copy images
function copyImages() {
  return src(`${options.paths.src.img}/**/*`).pipe(
    dest(options.paths.dist.img)
  );
}

//Optimize images
function optimizeImages() {
  return src(`${options.paths.src.img}/**/*`)
    .pipe(imagemin())
    .pipe(dest(options.paths.dist.img));
}

// Let's write our task in a function to keep things clean
function javascriptBuild() {
  // Start by calling browserify with our entry pointing to our main javascript file
  return (
    browserify({
      entries: [`${options.paths.src.js}/main.js`],
      // Pass babelify as a transform and set its preset to @babel/preset-env
      transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
    })
      // Bundle it all up!
      .bundle()
      // Source the bundle
      .pipe(source("bundle.js"))
      // Then write the resulting files to a folder
      .pipe(dest(`dist/js`))
  );
}

function copyFonts() {
  console.log(logSymbols.info, "Copying fonts to dist folder.");
  return src(["src/fonts/*"])
    .pipe(dest("dist/fonts"))
    .pipe(browserSync.stream());
}

function watchFiles() {
  watch(
    `${options.paths.src.base}/**/*.html`,
    series(compileHTML, previewReload)
  );
  watch(["src/scss/**/*", "src/scss/*"], compileSCSS);
  watch(
    `${options.paths.src.js}/**/*.js`,
    series(javascriptBuild, previewReload)
  );
  watch(`${options.paths.src.img}/**/*`, series(copyImages, previewReload));
  console.log(logSymbols.info, "Watching for Changes..");
}

function devClean() {
  console.log(logSymbols.info, "Cleaning dist folder for fresh start.");
  return del([options.paths.dist.base]);
}

const buildTasks = [
  devClean,
  resetPages,
  parallel(
    concatJs,
    copyFonts,
    concatCssPlugins,
    compileSCSS,
    javascriptBuild,
    compileHTML
  ),
];

export const build = (done) => {
  series(devClean, resetPages, parallel(...buildTasks, optimizeImages))();
  done();
};

export default (done) => {
  series(
    devClean,
    resetPages,
    parallel(...buildTasks, copyImages),
    parallel(livePreview, watchFiles)
  )();
  done();
};

export const setup = () => {
  series(setupBulma);
};
