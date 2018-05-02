angular
    .module('sfcCommon')
    .factory('genericRemoveService', ['$http', '$translate', 'confirmationService', function ($http, $translate, confirmationService) {
        return function (removeActionUrl, confirmationMessageKey) {

            function confirmAndRemove(itemIds, warningMessageKey) {
                if (angular.isNumber(itemIds)) {
                    itemIds = [itemIds];
                }

                var confirmationMesssagePromise = $translate(confirmationMessageKey, { COUNT: itemIds.length }, 'messageformat');
                var warningMessagePromise = warningMessageKey ? $translate(warningMessageKey) : null;

                var showConfirmationPromise = warningMessagePromise
                    ? confirmationService.showConfirmationWithWarning(confirmationMesssagePromise, warningMessagePromise)
                    : confirmationService.showConfirmation(confirmationMesssagePromise);

                return showConfirmationPromise.result.then(function () {
                    return $http.post(removeActionUrl, { itemIds: itemIds });
                });
            }

            return {
                remove: function (itemIds) {
                    return confirmAndRemove(itemIds);
                },

                removeWithWarning: function (itemIds, warningMessageKey) {
                    return confirmAndRemove(itemIds, warningMessageKey);
                }
            };
        };
    }]);