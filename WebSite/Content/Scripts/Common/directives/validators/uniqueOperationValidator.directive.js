angular
    .module('sfcCommon')
    .directive('uniqueOperationValidator', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.uniqueOperationValidator = function (modelValue) {
                    var name = attributes.name;
                    var list = scope.$eval(attributes.modelList);
                    var duplicates = _.filter(list, function (obj) {
                        return obj.operation == modelValue && obj.$$hashKey != scope.$eval(attributes.elementKey)
                    });
                    return duplicates.length == 0;
                };
            }
        };
    }]);