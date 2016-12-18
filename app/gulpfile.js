var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
var pump = require("pump");
var clean = require("gulp-clean");

var tsProject = ts.createProject("tsconfig.json");
var jsFiles = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/typescript/lib/typescript.js',
    'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js'
];

var cssFiles = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
];

gulp.task("clean", function() {
    return gulp.src(["../js", "../css"], {read: false})
        .pipe(clean({force: true}));
});

gulp.task("ts", ["clean"], function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("../js/app"));
});

gulp.task("angular", ["clean"], function() {
    return gulp.src("./node_modules/@angular/**").pipe(gulp.dest("../js/@angular"));
});

gulp.task("rxjs", ["clean"], function() {
    return gulp.src("node_modules/rxjs/**").pipe(gulp.dest("../js/rxjs"));
});

gulp.task("js", ["clean"], function() {
    return gulp.src(jsFiles)
        .pipe(gulp.dest('../js'));
});

gulp.task("copyCSS",  ["clean"], function() {
    return gulp.src(cssFiles)
        .pipe(gulp.dest("../css"));
});

gulp.task("compress", ["ts"], function(cb){
    pump(
        [gulp.src("../js/app/**/*.js"),
        uglify(),
        gulp.dest("../js/app")],
        cb
    );
});

gulp.task("default", ["clean", "ts", "angular", "rxjs", "js", "copyCSS", "compress"]);