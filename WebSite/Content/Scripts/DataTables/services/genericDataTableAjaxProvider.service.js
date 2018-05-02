angular
    .module('sfcDataTables')
    .factory('genericDataTableAjaxProvider', ['$http', 'toastrWrapper', function ($http, toastrWrapper) {
        var errorCallback = function (callback) {
            callback({ recordsTotal: 0, recordsFilterd: 0, data: [] });
        };

        return function (url) {
            return function (data, callback, settings) {
                $http.post(url, data)
                     .then(function (response) {
                         if (response.data.error) {
                             errorCallback(callback);
                             toastrWrapper.showError(response.data.error);
                         } else {
                             callback(response.data);
                         }
                     }, function () {
                         errorCallback(callback);
                     });
            };
        }
    }]);