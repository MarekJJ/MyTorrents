angular
    .module('sfcCommon')
    .factory('responseErrorInterceptor', ['$q', '$window', '$injector', function ($q, $window, $injector) {
        return {
            responseError: function (response) {
                var toastrWrapper = $injector.get('toastrWrapper');

                if (response.status === 401) {
                    $window.location.reload();
                }
                else if (response.status === 403) {
                    toastrWrapper.showTranslatedError('common.accessForbidden');
                }
                else if (response.status === 404) {
                    toastrWrapper.showTranslatedError('common.notFoundProblem', { url: response.config.url });
                }
                else if (!response.data || !response.data.message === undefined) {
                    toastrWrapper.showTranslatedError('common.serverResponseProblem');
                }
                else if (response.data.validationData) {
                    toastrWrapper.showValidationError('common.anErrorOccuredWhileSaving', response.data.validationData);
                }
                else {
                    toastrWrapper.showError(response.data.message);
                }

                return $q.reject(response);
            }
        }
    }]);