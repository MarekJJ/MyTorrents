angular
    .module('sfcCommon')
    .factory('progressIndicatorService', ['ngProgressFactory', function (ngProgressFactory) {

        var requestId = 1;
        var progressbar = ngProgressFactory.createInstance();

        progressbar.setHeight('1px');
        progressbar.setColor('#1aa5bb');

        function getNextActionId() {
            return requestId++;
        }

        var runningActions = {};

        return {
            start: function () {
                var id = getNextActionId();
                if (_.isEmpty(runningActions)) {
                    progressbar.start();
                }
                runningActions[id] = true;
                return id;
            },
            stop: function (id) {
                delete runningActions[id];
                if (_.isEmpty(runningActions)) {
                    progressbar.complete();
                }
            }
        };
    }]);