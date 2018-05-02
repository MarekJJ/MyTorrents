angular
    .module('sfcCommon', ['datatables', 'ui.router', 'pascalprecht.translate'])
    .config(['$httpProvider', '$translateProvider', 'toastrConfig', 'uiSelectConfig', 'dynamicNumberStrategyProvider', 'CurrentLanguage', '$provide',
    function ($httpProvider, $translateProvider, toastrConfig, uiSelectConfig, dynamicNumberStrategyProvider, CurrentLanguage, $provide) {

        $httpProvider.interceptors.push('progressIndicatorInterceptor');
        $httpProvider.interceptors.push('requestInterceptor');
        $httpProvider.interceptors.push('responseNotificationInterceptor');
        $httpProvider.interceptors.push('responseErrorInterceptor');

        $translateProvider.useStaticFilesLoader({
            prefix: '/Content/i18n/locale-',
            suffix: '.json'
        });

        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
        $translateProvider.preferredLanguage(CurrentLanguage);

        uiSelectConfig.theme = 'bootstrap';
        uiSelectConfig.resetSearchInput = true;
        uiSelectConfig.appendToBody = true;


        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-right'
        });

        dynamicNumberStrategyProvider.addStrategy('byte', {
            numThousand: false,
            numInt: 3,
            numFract: 0
        });
        dynamicNumberStrategyProvider.addStrategy('integer', {
            numSep: '.',
            numThousand: false,
            numInt: 10,
            numFract: 0
        });
        dynamicNumberStrategyProvider.addStrategy('positive-integer', {
            numSep: '.',
            numThousand: false,
            numInt: 10,
            numFract: 0,
            numNeg: false
        });
        dynamicNumberStrategyProvider.addStrategy('decimal', {
            numSep: '.',
            numThousand: false,
            numInt: 8,
            numFract: 10
        });
        dynamicNumberStrategyProvider.addStrategy('positive-decimal', {
            numSep: '.',
            numThousand: false,
            numInt: 8,
            numFract: 10,
            numNeg: false
        });
        dynamicNumberStrategyProvider.addStrategy('small-decimal', {
            numSep: '.',
            numThousand: false,
            numInt: 5,
            numFract: 2
        });
        dynamicNumberStrategyProvider.addStrategy('positive-small-decimal', {
            numSep: '.',
            numThousand: false,
            numInt: 5,
            numFract: 2,
            numNeg: false
        });

        $provide.decorator('uibAccordionGroupDirective', ['$delegate', function ($delegate) {
            var directive = $delegate[0];
            directive.templateUrl = function (element, attrs) {
                return attrs.templateUrl || '/Content/Scripts/Common/templates/_accordionOverrideTemplate.html';
            }
            return $delegate;
        }]);
    }])
    .run(['$rootScope', '$window', 'permissionService', 'datatablesConfigurationService', 'Permissions', function ($rootScope, $window, permissionService, datatablesConfigurationService, Permissions) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (_.isString(toState.permission) && !permissionService.hasPermission(toState.permission)) {
                event.preventDefault();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function () {
            $window.scrollTo(0, 0);
        });

        permissionService.setPermissions(Permissions);

        datatablesConfigurationService();

    }]);