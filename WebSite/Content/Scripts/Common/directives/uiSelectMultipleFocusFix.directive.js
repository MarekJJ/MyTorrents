angular
    .module('sfcCommon')
    .directive('uiSelectMultipleFocusFix', function () {
        return {
            restrict: 'A',
            require: 'uiSelect',
            link: function (scope, element, attr, uiSelect) {
                var searchInput = uiSelect.searchInput;

                searchInput.on('focus', function () {
                    element.addClass('focus');
                });

                searchInput.on('blur', function () {
                    element.removeClass('focus');
                });

                scope.$on('$destroy', function () {
                    searchInput.off('focus');
                    searchInput.off('blur');
                });
            }
        };
    });