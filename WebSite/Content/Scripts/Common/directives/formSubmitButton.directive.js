angular
    .module('sfcCommon')
    .service('formValidationHelper', function () {

        function markFormAsTouched(form) {
            angular.forEach(form.$error, function (field) {
                angular.forEach(field, function (errorField) {
                    if (errorField.$submitted !== undefined) {
                        markFormAsTouched(errorField);
                    } else {
                        errorField.$setTouched();
                    }
                });
            });
        }

        return {
            markFormAsTouched: markFormAsTouched
        }
    })
    .directive('formSubmitOnEnter', ['formValidationHelper', function (formValidationHelper) {
        return {
            scope: {
                submitAction: '&formSubmitOnEnter',
                form: '<'
            },
            link: function (scope, element, attrs) {
                element.on('keypress', function(event) {
                    if (event.which === 13) {
                        event.preventDefault();
                        scope.$apply(function () {
                            if (scope.form.$invalid) {
                                formValidationHelper.markFormAsTouched(scope.form);
                            } else {
                                scope.submitAction();
                            }
                        });
                    }
                });
            }
        };
    }])
    .directive('formSubmitButton', ['$timeout', 'formValidationHelper', function ($timeout, formValidationHelper) {
        return {
            scope: {
                submitAction: '&formSubmitButton',
                form: '<'
            },
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    $timeout(function () {
                        if (scope.form.$invalid) {
                            formValidationHelper.markFormAsTouched(scope.form);
                        } else {
                            scope.submitAction();
                        }
                    })
                })
            }
        };
    }]);
