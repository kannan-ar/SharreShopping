(function (global) {
    var map = {
        'app': 'js/app',
        '@angular': 'js/@angular',
        'rxjs': 'js/rxjs',
        '@angular/common/http': 'js/@angular/common/bundles/common-http.umd.js',
        '@ng-bootstrap/ng-bootstrap': 'js/ng-bootstrap.js',
        '@angular/animations': 'js/@angular/animations/bundles/animations.umd.js',
        '@angular/animations/browser': 'js/@angular/animations/bundles/animations-browser.umd.js',
        '@angular/platform-browser/animations': 'js/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
        'angular2-infinite-scroll': 'js/angular2-infinite-scroll.js',
        'jquery': 'js/jquery.min.js',
        'masonry-layout': 'js/masonry.pkgd.js',
        'imagesloaded': 'js/imagesloaded.pkgd.js',
        'ng2-material-dropdown': 'js/ng2-dropdown.bundle.js',
        'ngx-chips': 'js/ngx-chips.bundle.js',
        'tslib':'js/tslib.js'
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