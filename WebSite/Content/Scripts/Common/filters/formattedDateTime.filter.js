angular
    .module('sfcCommon')
    .filter('formattedDateTime', ['GlobalConfiguration', function (GlobalConfiguration) {
        return function (inputValue) {
            return inputValue ? moment(inputValue).format(GlobalConfiguration.dateTimeFormat) : '';
        };
    }]);
