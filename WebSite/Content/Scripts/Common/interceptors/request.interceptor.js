angular
    .module('sfcCommon')
    .factory('requestInterceptor', ['$templateCache', 'BackendRootUrl', function ($templateCache, BackendRootUrl) {

        function appendVersion(url) {
            var queryParameterSeparator = url.indexOf('?') === -1 ? '?' : '&';
            return url + queryParameterSeparator + 'v=' + new Date().getTime();
        }

        return {
            request: function (config) {
                var isTemplateCacheRequest = (config.method === 'GET' && $templateCache.get(config.url) !== undefined);

                if (!isTemplateCacheRequest) {
                    var url = BackendRootUrl + config.url;
                    url = url.replace('//', '/');

                    config.url = appendVersion(url);
                }

                config.headers['X-Requested-With'] = 'XMLHttpRequest';

                return config;
            }
        }
    }]);