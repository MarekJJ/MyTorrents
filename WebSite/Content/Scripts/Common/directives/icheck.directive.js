angular
    .module('sfcCommon')
    .directive('readonlyCheckbox', function () {
        return {
            template: '<div class="icheckbox_flat-blue disabled"></div>',
            link: function (scope, element, attr) {
                var isChecked = attr.checked === 'true';
                element.children().toggleClass('checked', isChecked);
            }
        }
    })
    .directive('icheck', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            priority: 100,
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                $timeout(function () {
                    var value = attr.value;

                    function update(checked) {
                        if (attr.type === 'radio') {
                            ngModel.$setViewValue(value);
                        } else {
                            ngModel.$setViewValue(checked);
                        }
                    }

                    element.iCheck({
                        checkboxClass: attr.checkboxClass || 'icheckbox_flat-blue',
                        radioClass: attr.radioClass || 'iradio_flat-blue'
                    }).on('ifChanged', function (e) {
                        $timeout(function () {
                            scope.$apply(function () {
                                update(e.target.checked);
                            });
                            scope.$apply(attr.ngClick);
                        });
                    });

                    scope.$watch(attr.ngChecked, function (checked) {
                        if (typeof checked === 'undefined') checked = !!ngModel.$viewValue;
                        update(checked)
                    }, true);

                    scope.$watch(attr.ngModel, function (model) {
                        element.iCheck('update');
                    }, true);

                    scope.$watch(attr.ngDisabled, function (disabled) {
                        element.iCheck('update');
                    });

                    scope.$watch(function () {
                        return ngModel.$touched && ngModel.$invalid;
                    }, function (invalid) {
                        element.parent().toggleClass('invalid', invalid);
                    })

                    scope.$on('$destroy', function () {
                        element.iCheck('destroy');
                    });
                })
            }
        }
    }]);
