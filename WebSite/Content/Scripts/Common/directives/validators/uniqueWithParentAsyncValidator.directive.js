angular
    .module('sfcCommon')
    .directive('uniqueWithParentAsyncValidator', ['$q', '$http', function ($q, $http) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                ngModel.$asyncValidators.uniqueWithParentAsyncValidator = function (modelValue) {

                    var modelId = scope.$eval(attributes.modelId);
                    var modelParentId = scope.$eval(attributes.modelParentId);
                    var url = attributes.uniqueWithParentAsyncValidator;

                    return $http.post(url, { id: modelId, parentId: modelParentId, value: modelValue })
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