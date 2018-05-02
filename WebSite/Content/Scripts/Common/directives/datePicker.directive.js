angular
    .module('sfcCommon')
     .directive('datePicker', ['CurrentLanguage', 'GlobalConfiguration', function (CurrentLanguage, GlobalConfiguration) {
         return {
             templateUrl: '/Content/Scripts/Common/templates/_datePickerTemplate.html',
             require: '^^form',
             scope: {
                 name: '@',
                 model: '=',
                 field: '@',
                 required: '=',
                 type: '@',
                 disabled: "="
             },
             link: function (scope, element, attrs, formCtrl) {
                 scope.formCtrl = formCtrl;

                 scope.dateFieldOptions = {
                     allowInputToggle: true,
                     locale: CurrentLanguage,
                     format: scope.type === 'dateTime' ? GlobalConfiguration.dateTimeFormat : GlobalConfiguration.dateFormat
                 };

                 scope.show = true;
             }
         }
     }]);