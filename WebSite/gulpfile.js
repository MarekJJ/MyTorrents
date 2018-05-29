/// <binding ProjectOpened='init' />

var gulp = require('gulp'),     //gulp
    bower = require('gulp-bower'), // gulp dala bowera
    ignore = require('gulp-ignore'), // ignoruje jakieś tam pliki które są wskazywane w te samej funkcji
    fs = require('fs'), // ?
    watch = require('gulp-watch'), // wach
    concat = require('gulp-concat'),//nazywa nowo utworzony plik
    uglify = require('gulp-uglify'), // robi minifikacje  czyli, tworzy male pliczki .min
    concatCss = require('gulp-concat-css'),// nazywa pliki css
    cleanCss = require('gulp-clean-css'), // oczyszcza jakiś problem, nie rozumieć ???https://www.npmjs.com/package/gulp-clean-css#regarding-issues
    rebaseUrls = require('gulp-css-url-rebase'), //umożliwia pliki zawartość z różnych plików w różnym położeniu zapianie w jednym pliku wykożystna jest z plikami less do jednego css https://www.npmjs.com/package/gulp-css-url-rebase
    modifyCssUrls = require('gulp-modify-css-urls'), // łączys URL z sciężką do pliku https://www.npmjs.com/package/gulp-modify-css-urls
    less = require('gulp-less'), //konewrtuje na css pomaga zapisywac za pomocą komendy @import do jednego pliku css
    lessChanged = require('gulp-less-changed'),//https://www.npmjs.com/package/gulp-less-changed
    sourcemaps = require('gulp-sourcemaps'),//https://www.npmjs.com/package/gulp-sourcemaps
    runSequence = require('run-sequence'),// pozwala uruchomić sekwencje wstrzykninenć
    resx2 = require('gulp-resx2'),     // do konwersji resx na json
    mergeJson = require('gulp-merge-json'), // pozwala na mergowanie wielu plików json do jednego wykożystyny jest  przy zapisywaniu tłumaczeń w json do jednego pliku
    cleanDest = require('gulp-dest-clean'),//czyści jakiś tymczasowy folder
    path = require('path'),//This is an exact copy of the NodeJS ’path’ module published to the NPM registry.
    camelCase = require('camel-case');// zamienia foo-bar na fooBar

var paths = {
    vendorDir: './Content/Vendor/',
    lessFiles: './Content/Styles/**/*.less', //ok
    jsFiles:  ['./Content/Scripts/**/*.js', './Areas/**/*.js'],
    bundlesFile: './bundles.json',
    resxFiles: '../TOR.Resources/FrontEndTranslations/**/*.resx', // scieżka do plików tłumaczeń

    distCssBundle: './Content/Dist/css/',
    distJsBundle: './Content/Dist/js',
    distI18N: './Content/Dist/i18n'
};

var translationResxFileMap = {
    'en': '!(*.*).resx',
    'pl': '*.pl-PL.resx'
}

//----------------------- tasks -------------------------------

gulp.task('copyVendorFiles', ['installBowerDependencies'], function () {
    copyTool.from('./bower_components/jquery/dist/jquery.js').to('jquery');
    copyTool.from('./bower_components/underscore/underscore.js').to('underscore');

    copyTool.from('./bower_components/datatables/media/js/jquery.dataTables.js').to('datatables/js');
    copyTool.from('./bower_components/datatables/media/css/jquery.dataTables.css').to('datatables/css');
    copyTool.from('./bower_components/datatables/media/images/*.png').to('datatables/images');
    copyTool.from('./bower_components/datatables-i18n/i18n/en.json').to('datatables/i18n');
    copyTool.from('./bower_components/datatables-i18n/i18n/pl.json').to('datatables/i18n');

    copyTool.from('./bower_components/font-awesome/css/font-awesome.css').to('font-awesome/css');
    copyTool.from('./bower_components/font-awesome/fonts/*.*').to('font-awesome/fonts');

    copyTool.from('./bower_components/bootstrap/dist/js/bootstrap.js').to('bootstrap/js');
    copyTool.from('./bower_components/bootstrap/dist/css/bootstrap.css').to('bootstrap/css');
    copyTool.from('./bower_components/bootstrap/dist/fonts/*.*').to('bootstrap/fonts');

    copyTool.from('./bower_components/iCheck/icheck.js').to('icheck');
    copyTool.from('./bower_components/iCheck/skins/flat/green*.*').to('icheck/skins/flat');

    copyTool.from('./bower_components/messageformat/messageformat.js').to('messageformat');
    copyTool.from('./bower_components/moment/min/moment-with-locales.js').to('moment');

    copyTool.from('./bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js').to('eonasdan-bootstrap-datetimepicker');
    copyTool.from('./bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css').to('eonasdan-bootstrap-datetimepicker');
    copyTool.from('./bower_components/angular-eonasdan-datetimepicker/dist/angular-eonasdan-datetimepicker.js').to('angular-eonasdan-datetimepicker');

    copyTool.from('./bower_components/angular/angular.js').to('angularjs');
    copyTool.from('./bower_components/angular/angular-csp.css').to('angularjs');
    copyTool.from('./bower_components/angular-sanitize/angular-sanitize.js').to('angular-sanitize');
    copyTool.from('./bower_components/angular-messages/angular-messages.js').to('angular-messages');
    copyTool.from('./bower_components/angular-animate/angular-animate.js').to('angular-animate');
    copyTool.from('./bower_components/angular-ui-scrollpoint/dist/scrollpoint.js').to('angular-ui-scrollpoint');
    copyTool.from('./bower_components/angular-toastr/dist/angular-toastr.tpls.js').to('angular-toastr');
    copyTool.from('./bower_components/angular-toastr/dist/angular-toastr.css').to('angular-toastr');
    copyTool.from('./bower_components/angular-bootstrap/ui-bootstrap-tpls.js').to('angular-bootstrap');
    copyTool.from('./bower_components/angular-ui-select/dist/select.js').to('angular-ui-select');
    copyTool.from('./bower_components/angular-ui-select/dist/select.css').to('angular-ui-select');
    copyTool.from('./bower_components/angular-datatables/dist/angular-datatables.js').to('angular-datatables');
    copyTool.from('./bower_components/angular-datatables/dist/css/angular-datatables.css').to('angular-datatables');
    copyTool.from('./bower_components/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js').to('angular-datatables/plugins/bootstrap');
    copyTool.from('./bower_components/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css').to('angular-datatables/plugins/bootstrap');
    copyTool.from('./bower_components/angular-datatables/dist/plugins/select/angular-datatables.select.js').to('angular-datatables/plugins/select');
    copyTool.from('./bower_components/angular-cookies/angular-cookies.js').to('angular-cookies');
    copyTool.from('./bower_components/angular-translate/angular-translate.js').to('angular-translate');
    copyTool.from('./bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js').to('angular-translate-loader-static-files');
    copyTool.from('./bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js').to('angular-translate-interpolation-messageformat');
    copyTool.from('./bower_components/ng-file-upload/ng-file-upload-all.js').to('ng-file-upload');
    copyTool.from('./bower_components/angular-dynamic-number/release/dynamic-number.js').to('angular-dynamic-number');
    copyTool.from('./bower_components/ngprogress/build/ngprogress.js').to('ngprogress');
    copyTool.from('./bower_components/ngprogress/ngProgress.css').to('ngprogress');
    copyTool.from('./bower_components/angular-ivh-treeview/dist/ivh-treeview.css').to('angular-ivh-treeview');
    copyTool.from('./bower_components/angular-ivh-treeview/dist/ivh-treeview-theme-basic.css').to('angular-ivh-treeview');
    copyTool.from('./bower_components/angular-ivh-treeview/dist/ivh-treeview.js').to('angular-ivh-treeview');
    copyTool.from('./bower_components/angular-click-outside/clickoutside.directive.js').to('angular-click-outside');
    copyTool.from('./bower_components/ui-router/release/angular-ui-router.js').to('ui-router');
    copyTool.from('./bower_components/angular-bootstrap-colorpicker/css/colorpicker.css').to('angular-bootstrap-colorpicker/css');
    copyTool.from('./bower_components/angular-bootstrap-colorpicker/img/alpha.png').to('angular-bootstrap-colorpicker/img');
    copyTool.from('./bower_components/angular-bootstrap-colorpicker/img/hue.png').to('angular-bootstrap-colorpicker/img');
    copyTool.from('./bower_components/angular-bootstrap-colorpicker/img/saturation.png').to('angular-bootstrap-colorpicker/img');
    copyTool.from('./bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js').to('angular-bootstrap-colorpicker/js');
    copyTool.from('./bower_components/angular-local-storage/dist/angular-local-storage.js').to('angular-local-storage');
});

gulp.task('convertResxToJson', function () {

    var tempFolder = paths.distI18N + '_tmp/';
    return gulp.src(paths.resxFiles)
       .pipe(cleanDest(tempFolder))
       .pipe(resx2())
       .pipe(gulp.dest(tempFolder));
});

gulp.task('cleanDistI18N', function () {
    return gulp.src(paths.distI18N, { read: false })
        .pipe(cleanDest(paths.distI18N));
});

gulp.task('generateTranslations', ['convertResxToJson', 'cleanDistI18N'], function () {

    var subtasks = Object.keys(translationResxFileMap).map(function (culture) {
        var resxFileFormat = translationResxFileMap[culture];
        return gulp.src(paths.distI18N + '_tmp/**/' + resxFileFormat)
            .pipe(mergeJson({
                fileName: 'locale-' + culture + '.json',
                edit: function (parsedJson, file) {
                    var fileName = path.basename(file.path);
                    var fileNameWitoutExtension = fileName.substr(0, fileName.indexOf('.'));
                    var jsonKey = camelCase(fileNameWitoutExtension);

                    var obj = {};
                    obj[jsonKey] = parsedJson;
                    return obj;
                }
            }))
            .pipe(gulp.dest(paths.distI18N));
    });

    return subtasks;
});

//ok
gulp.task('compileLess', function () {
    return gulp.src(paths.lessFiles, { base: './' }) // lessFiles: ./Content/Styles/**/*.less',
        .pipe(ignore.exclude('**/_*.less')) // tutaj jest ta kreska _ te pliki są pomijane bo barany jest tylko dop
        //.pipe(lessChanged())
        .pipe(less()) // less = require('gulp-less'),
        .pipe(gulp.dest('./')); // oznacza że jest w tym samym miejscu
});

gulp.task('generateCssBundles', ['compileLess'], function () {
    var bundles = getBundles();

    Object.keys(bundles).forEach(function (bundleName) {
        var urlFix = getUrlPrefixForBundle(bundleName);

        if (bundleName.endsWith('-Css')) {
            gulp.src(bundles[bundleName])
                .pipe(concatCss(bundleName + '.min.css'))
                .pipe(rebaseUrls())
                .pipe(modifyCssUrls({
                    modify: function (url, filePath) {
                        return urlFix + url;
                    }
                }))
                .pipe(cleanCss())
                .pipe(gulp.dest(paths.distCssBundle));
        }
    });
});

gulp.task('generateJsBundles', function () {
    var bundles = getBundles();

    Object.keys(bundles).forEach(function (bundleName) {
        if (bundleName.endsWith('-Js')) {
            gulp.src(bundles[bundleName])
                .pipe(concat(bundleName + '.min.js'))
                .pipe(sourcemaps.init())
                .pipe(uglify().on('error', function (e) {
                    console.log(e);
                }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(paths.distJsBundle));
        }
    });
});

gulp.task('generate:all', function () {
    return runSequence(['generateCssBundles', 'generateJsBundles', 'generateTranslations']);
})

gulp.task('installBowerDependencies', function () {
    return bower();
});

gulp.task('watchLess', function () {
    return watch(paths.lessFiles, function () {
        runSequence('generateCssBundles');
    });
});

gulp.task('watchJs', function () {
    return watch(paths.jsFiles, function () {
        runSequence('generateJsBundles');
    });
});

gulp.task('watchBundles', function () {
    return watch(paths.bundlesFile, function () {
        runSequence('generateCssBundles', 'generateJsBundles');
    });
});

gulp.task('watchResx', function () {
    return watch(paths.resxFiles, function () {
        runSequence('generateTranslations');
    });
});

gulp.task('init', function () {
    runSequence(['watchLess', 'watchJs', 'watchBundles', 'watchResx']);
});

//----------------------- utils -------------------------------

var copyTool = {
    from: function (src) {
        return {
            to: function (dest) {
                gulp.src(src)
                    .pipe(gulp.dest(paths.vendorDir + dest));
            }
        }
    }
}

function getBundles() {
    var bundlesFileContent = fs.readFileSync(paths.bundlesFile, 'utf8');
    var bundles = JSON.parse(bundlesFileContent.replace(/^\uFEFF/, ''));

    return bundles;
}

function getUrlPrefixForBundle(bundleName) {
    var nestingLevel = bundleName.split('/').length - 1;
    var urlPrefix = '../../../' // from Content/dist/css up to root
    for (var i = 0; i < nestingLevel; i++) {
        urlPrefix += '../'
    }

    return urlPrefix;
}

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}