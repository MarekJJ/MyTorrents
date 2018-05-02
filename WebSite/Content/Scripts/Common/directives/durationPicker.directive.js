angular
    .module('sfcCommon')
    .directive('durationPicker', ['$timeout', '$filter', '$translate', function ($timeout, $filter, $translate) {
        function Value(v) {
            this.value = v || 0;

            this.increment = function () {
                this.value++;
            };

            this.decrement = function () {
                if (this.value > 0) {
                    this.value--;
                }
            };
        }

        return {
            templateUrl: '/Content/Scripts/Common/templates/_durationPickerTemplate.html',
            scope: {
                durationValue: '='
            },
            link: function (scope, element, attrs) {

                var textInput = element.find('input[type=text]');

                scope.days = new Value();
                scope.hours = new Value();

                textInput.on('focus', function () {
                    scope.$apply(function () {
                        scope.isOpen = true;

                        $timeout(function () {
                            element.find('.popover-content input:first').focus();
                        }, 100);
                    });
                });

                element.find('.input-group-addon').on('click', function () {
                    textInput.focus();
                });

                scope.onKeyUp = function (event, value, isLast) {
                    if (event.keyCode === 38) {
                        value.increment();

                    } else if (event.keyCode === 40) {
                        value.decrement();
                    }
                };

                scope.closeOnTabPress = function (event) {
                    if (event.keyCode === 9) {
                        scope.isOpen = false;
                    }
                };

                scope.hide = function () {
                    scope.isOpen = false;
                };

                var durationValueFilter = $filter('durationValue');

                scope.$watchGroup(['days.value', 'hours.value'], function (newValues) {
                    var value = scope.days.value * 24 + scope.hours.value;

                    scope.textInputValue = durationValueFilter(value);
                    scope.durationValue = value;
                });

                scope.$watch('durationValue', function (newValue, oldValue) {
                    if (newValue === undefined || isNaN(newValue))
                        return;

                    scope.days.value = Math.floor(newValue / 24);
                    scope.hours.value = newValue % 24;
                });
            }
        };
    }]);