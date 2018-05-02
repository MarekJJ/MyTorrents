angular
    .module('sfcDataTables')
    .directive('datatablesProcessingIndicator', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('processing.dt', function (e, settings, processing) {
                    if (processing) {
                        var processingIndicator = angular.element(settings.nTableWrapper).find('.dataTables_processing');
                        processingIndicator.css('color', 'gray')
                        processingIndicator.html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>');
                    }
                });
            }
        }
    });
