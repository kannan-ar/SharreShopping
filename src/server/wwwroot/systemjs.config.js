(function (global) {
    var map = {
        'app': 'js/app',
        '@angular': 'js/@angular',
        'rxjs': 'js/rxjs',
        '@ng-bootstrap/ng-bootstrap': 'js/ng-bootstrap.js',
        'angular2-infinite-scroll': 'js/angular2-infinite-scroll.js',
        'jquery': 'js/jquery.min.js',
        'masonry-layout': 'js/masonry.pkgd.js'
    };

    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'js/src': { defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'upgrade',
        'forms',
        'router'
    ];

    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' }
    }

    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' }
    }

    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    ngPackageNames.forEach(setPackageConfig);
    var config = {map: map, packages: packages};
    System.config(config);
})(this);