angular
    .module('sfcCommon')
    .filter('formattedDate', ['GlobalConfiguration', function (GlobalConfiguration) {
        return function (inputValue) {
            return inputValue ? moment(inputValue).format(GlobalConfiguration.dateFormat) : '';
        };
    }]);
