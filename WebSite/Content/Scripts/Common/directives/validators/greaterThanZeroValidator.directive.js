angular
    .module('sfcCommon')
    .directive('revalidateOn', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var eventName = attrs.revalidateOn;

                scope.$on(eventName, function () {
                    ngModel.$validate();
                });
            }
        }
    }])
    .directive('maxValue', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.maxValue = function (modelValue) {

                    if (_.isNaN(modelValue)) {
                        ngModel.$viewValue = '';
                        ngModel.$render();
                        ngModel.$setValidity('required', false);
                        return true;
                    }

                    var maxValue = $parse(attributes.maxValue)(scope);
                    return modelValue <= maxValue;
                };
            }
        };
    }])
    .directive('minValue', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.minValue = function (modelValue) {

                    if (_.isNaN(modelValue)) {
                        ngModel.$viewValue = '';
                        ngModel.$render();
                        ngModel.$setValidity('required', false);
                        return true;
                    }

                    var minValue = $parse(attributes.minValue)(scope);
                    return modelValue >= minValue;
                };
            }
        };
    }])
    .directive('greaterThanZero', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.greaterThanZero = function (modelValue) {

                    if (_.isNaN(modelValue)) {
                        ngModel.$viewValue = '';
                        ngModel.$render();
                        ngModel.$setValidity('required', false);
                        return true;
                    }

                    return modelValue > 0;
                };
            }
        };
    }]);