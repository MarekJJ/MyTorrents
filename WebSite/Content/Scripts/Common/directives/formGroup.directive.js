angular
    .module('sfcCommon')
    .directive('formGroup', [function () {
        return {
            restrict: 'E',
            template: ' <div class="form-group"><label class="col-sm-3 col-xs-12 control-label">{{ label }}<span ng-if="isRequired" class="required-field-marker">*</span></label><div class="col-sm-8 col-lg-6 col-xs-12"><ng-transclude /></div></div>',
            transclude: true,
            scope: {
                label: '@',
                isRequired: '<'
            }
        };
    }]);
