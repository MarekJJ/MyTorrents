angular
    .module('sfcCommon')
    .directive('viewHeader', [function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/Content/Scripts/Common/templates/_viewHeaderTemplate.html',
            scope: {
                title: '@',
                subtitle: '@'
            }
        };
    }]);