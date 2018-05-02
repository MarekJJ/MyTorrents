angular
    .module('sfcCommon')
    .factory('toastrWrapper', ['toastr', '$translate', function (toastr, $translate) {

        function prepareValidationErrorList(validationData) {
            var list = '<ul>';
            angular.forEach(validationData, function (value, key) {
                if (angular.isArray(value) && value.length > 0) {
                    angular.forEach(value, function (v) {
                        list += '<li>' + v + '</li>';
                    })
                }
            });

            list += '</ul>';
            return list;
        }

        return {
            showNotification: function (notificationType, message) {
                var timeout = notificationType !== 'error' ? 1500 : 0;
                var options = { closeButton: true, extendedTimeOut: 1000, timeOut: timeout };
                toastr[notificationType](message, options);
            },

            showError: function(errorMessage) {
                toastr.error(errorMessage, { closeButton: true, extendedTimeOut: 1000, timeOut: 0 });
            },

            showValidationError: function (messageKey, validationData) {
                var list = prepareValidationErrorList(validationData);
                $translate(messageKey).then(function (errorMessage) {
                    toastr.error(list, errorMessage, { closeButton: true, extendedTimeOut: 1000, timeOut: 0, allowHtml: true });
                });
            },

            showTranslatedNotification: function (notificationType, messageKey, interpolationData) {
                var that = this;
                $translate(messageKey, interpolationData).then(function (errorMessage) {
                    that.showNotification(notificationType, errorMessage);
                });
            },

            showTranslatedWarning: function (messageKey, interpolationData) {
                this.showTranslatedNotification('warning', messageKey, interpolationData);
            },

            showTranslatedError: function (messageKey, interpolationData) {
                this.showTranslatedNotification('error', messageKey, interpolationData);
            },

            showTranslatedSuccess: function (messageKey, interpolationData) {
                this.showTranslatedNotification('success', messageKey, interpolationData);
            },

            showTranslatedInfo: function (messageKey, interpolationData) {
                this.showTranslatedNotification('info', messageKey, interpolationData);
            }
        }
    }]);