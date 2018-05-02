angular
    .module('sfcCommon')
    .factory('responseNotificationInterceptor', ['$injector', function ($injector) {
        return {
            response: function(response) {
                if (response.headers('notification-response')) {
                    var toastrWrapper = $injector.get('toastrWrapper');
                    toastrWrapper.showNotification(response.data.notificationType, response.data.message);
                }

                return response;
            }
        }
    }]);