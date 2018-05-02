angular
    .module('sfcConfirmation')
    .factory('confirmationService', ['$uibModal', '$translate', function ($uibModal, $translate) {

        function showConfirmationModal(confirmationMessage, warningMessage) {
            return $uibModal.open({
                component: 'confirmationModalComponent',
                resolve: {
                    confirmationMessage: function () {
                        return confirmationMessage;
                    },
                    warningMessage: function () {
                        return warningMessage;
                    }
                }
            })
        }

        return {
            showConfirmation: function (confirmationMessage) {
                return showConfirmationModal(confirmationMessage);
            },

            showConfirmationWithWarning: function(confirmationMessage, warningMessage) {
                return showConfirmationModal(confirmationMessage, warningMessage);
            },

            showTranslatedConfirmation: function (confirmationMessageKey) {
                return showConfirmationModal($translate(confirmationMessageKey));
            }
        }
    }]);