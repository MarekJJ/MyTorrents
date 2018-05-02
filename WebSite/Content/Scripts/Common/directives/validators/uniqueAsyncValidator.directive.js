angular
    .module('sfcCommon')
    .directive('uniqueAsyncValidator', ['$q', '$http', function ($q, $http) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                ngModel.$asyncValidators.uniqueAsyncValidator = function (modelValue) {

                    var modelId = scope.$eval(attributes.modelId);
                    var url = attributes.uniqueAsyncValidator;

                    return $http.post(url, { id: modelId, value: modelValue })
                         .then(function (response) {
                             if (response.data === true) {
                                 return $q.resolve();
                             } else {
                                 return $q.reject();
                             }
                         });
                };
            }
        };
    }]);