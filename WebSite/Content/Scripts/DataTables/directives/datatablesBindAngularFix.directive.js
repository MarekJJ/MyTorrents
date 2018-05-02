angular
    .module('sfcDataTables')
    .directive('datatablesBindAngularFix', ['$compile', '$timeout', function ($compile, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {

                var childScope = null;

                function onPreDraw() {
                    if (childScope !== null) {
                        childScope.$destroy();
                        childScope = null;
                        if (attr.preDrawCallback) {
                            $timeout(function () {
                                scope.$apply(attr.preDrawCallback);
                            });

                        }
                    }
                }

                function onDraw() {
                    childScope = scope.$new();

                    $compile(element.find('thead'))(childScope);
                    $compile(element.find('tbody'))(childScope);
                }

                element
                    .on('preDraw.dt', onPreDraw)
                    .on('draw.dt', onDraw);
            }
        }
    }]);
