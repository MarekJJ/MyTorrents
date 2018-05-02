angular
    .module('sfcDataTables')
    .factory('datatablesConfigurationService', ['DTDefaultOptions', 'BackendRootUrl', 'CurrentLanguage', function (DTDefaultOptions, BackendRootUrl, CurrentLanguage) {
        return function () {

            DTDefaultOptions.setLanguage({
                url: BackendRootUrl + 'Content/Vendor/datatables/i18n/' + CurrentLanguage + '.json'
            });
        };
    }]);