// Allows the various packages to be used in the gulp file
var gulp = require('gulp') //allows using gulp tasks
var browserify = require('browserify'); //allows use of browserify package
var source = require('vinyl-source-stream'); //required to use browserify
var concat = require('gulp-concat'); //allows use of concatenation of files
var uglify = require('gulp-uglify'); //allows use of minification
var utilities = require('gulp-util'); //manages the various utilities
var del = require('del'); //allows use of clean task
var jshint = require('gulp-jshint'); //allows use of lint
var sass = require('gulp-sass'); //allows sass to be used
var sourcemaps = require('gulp-sourcemaps');// compilation of sass
var browserSync = require('browser-sync').create();// for server reloading
//all the bower files
var lib = require('bower-files')({
  "overrides": {
    "bootstrap": {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
var buildProduction = utilities.env.production; //specifies the environment we are on (either ddevelopment or production)

//concatenates js files into one js file and sends this file to the js folder in the build folder
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

//concatenates css files and sends thi final sile to the css folder inside the build folder
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

//combines bowerJS and bowerCSS tasks into the bower task
gulp.task('bower', ['bowerJS', 'bowerCSS']);

//minifies the js files to reduce size
gulp.task('minifyScripts', ['jsBrowserify'], function () {
  return gulp.src('./build/js/app/js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

//concatenates all js files ending in '-interface.js' into one file and sends them to the tmp folder
gulp.task('concatInterface', function () {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

//prepares all the files to be run on the browser
gulp.task('jsBrowserify', ['concatInterface'], function () {
  return browserify({
      entries: ['./tmp/allConcat.js']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

//deletes the unminified files during deployment
gulp.task('clean', function () {
  return del(['build', 'tmp']);
});

 //runs clean first then runs all the tasks before deploying to the server
gulp.task('build', ['clean'], function () {
  if (buildProduction) {
    gulp.start('minifyScripts');
  }
  else {
    gulp.start('jsBrowserify')
  }
  gulp.start('bower');
  gulp.start('cssBuild');
});

//runs lint on your file to detect errors in your code when deploying
gulp.task('jshint', function () {
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// creates a server where your project is deployed to
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
//these watch for changes in all the css and js files and automatically reloads the server once a change occurs
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(["css/*.css"], ['cssBuild']);
});

//reloads the server when the js files are changed
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function () {
  browserSync.reload();
});


//reloads the server when bower js or css files are changed
gulp.task('bowerBuild', ['bower'], function () {
  browserSync.reload();
});

// reloads the server when the html file is changed
gulp.task('htmlBuild', function(){
  browserSync.reload();
});

gulp.task('cssBuild', function(){
  browserSync.reload();
});

// reloads the server when the sass file(.scss) is changed and compiles the changed sass automatically before reloading happens
gulp.task('Build', function () {
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});
