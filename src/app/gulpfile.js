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
    'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
    'node_modules/angular2-infinite-scroll/bundles/angular2-infinite-scroll.js',
    'node_modules/angular2-infinite-scroll/src/infinite-scroll.js',
    'node_modules/angular2-infinite-scroll/src/axis-resolver.js',
    'node_modules/angular2-infinite-scroll/src/index.js',
    'node_modules/angular2-infinite-scroll/src/position-resolver.js',
    'node_modules/angular2-infinite-scroll/src/scroller.js'
];

var jsFilesWithDest = {

}

var cssFiles = [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'shared/styles/styles.css'
];

gulp.task("clean", function() {
    return gulp.src(["../server/wwwroot/js", "../server/wwwroot/css"], {read: false})
        .pipe(clean({force: true}));
});

gulp.task("ts", ["clean"], function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("../server/wwwroot/js/app"));
});

gulp.task("angular", ["clean"], function() {
    return gulp.src("./node_modules/@angular/**").pipe(gulp.dest("../server/wwwroot/js/@angular"));
});

gulp.task("rxjs", ["clean"], function() {
    return gulp.src("node_modules/rxjs/**").pipe(gulp.dest("../server/wwwroot/js/rxjs"));
});

gulp.task("js", ["clean"], function() {
    return gulp.src(jsFiles)
        .pipe(gulp.dest('../server/wwwroot/js'));
});

gulp.task("copyCSS",  ["clean"], function() {
    return gulp.src(cssFiles)
        .pipe(gulp.dest("../server/wwwroot/css"));
});

gulp.task("compress", ["ts"], function(cb){
    pump(
        [gulp.src("../server/wwwroot/js/app/**/*.js"),
        uglify(),
        gulp.dest("../server/wwwroot/js/app")],
        cb
    );
});

gulp.task("default", ["clean", "ts", "angular", "rxjs", "js", "copyCSS", "compress"]);