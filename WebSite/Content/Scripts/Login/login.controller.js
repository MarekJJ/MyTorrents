angular
    .module('sfcLogin')
    .controller('LoginController', ['$http', '$window', '$translate', '$stateParams', 'progressIndicatorService',
     function ($http, $window, $translate, $stateParams, progressIndicatorService) {
        var vm = this;
        vm.model = {};
        vm.model.username = $stateParams.username;
        vm.validationMessage = null;

        function setValidationMessage(messageKey) {
            $translate(messageKey).then(function (msg) {
                vm.validationMessage = msg;
            });
        }

        vm.signIn = function () {
            var actionId = progressIndicatorService.start();
            $http.post('/Auth/Log/', vm.model)
                 .then(function (response) {
                     var status = response.data.status;
                     vm.validationMessage = '';
                     if (status !== 'Success') {
                         progressIndicatorService.stop(actionId);
                     }

                     switch (status) {
                         case 'Success':
                             $window.location.href = response.data.redirectUrl;
                             break;
                         case 'NoUser':
                         case 'WrongPassword':
                             setValidationMessage('login.invalidLoginOrPassword');
                             break;
                         case 'Inactive':
                             setValidationMessage('login.inactiveUser');
                             break;
                         case 'OldPortal':
                             setValidationMessage('login.oldPortal');
                             break;
                         default:
                             break;
                     }
                 });
        };
     }])
    .directive('compareTo', function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue === scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    });