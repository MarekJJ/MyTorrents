angular
    .module('sfcCommon')
    .factory('progressIndicatorInterceptor', ['$injector', '$q', function ($injector, $q) {
        return {
            request: function (config) {
                config.progressActionId = $injector.get('progressIndicatorService').start();
                return config;
            },
            response: function (response) {
                $injector.get('progressIndicatorService').stop(response.config.progressActionId);
                return response;
            },
            responseError: function (response) {
                $injector.get('progressIndicatorService').stop(response.config.progressActionId);
                return $q.reject(response);
            }
        }
    }]);