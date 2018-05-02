angular
    .module('sfcConfirmation')
    .component('confirmationModalComponent', {
        templateUrl: '/Content/Scripts/Confirmation/templates/confirmationModalComponent.template.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function () {
            var $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.confirmationMessage = $ctrl.resolve.confirmationMessage;
                $ctrl.warningMessage = $ctrl.resolve.warningMessage;
            }
        }
    });