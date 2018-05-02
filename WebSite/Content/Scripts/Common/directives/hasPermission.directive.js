angular
    .module('sfcCommon')
    .directive('hasPermission', ['permissionService', function (permissionService) {
        return {
            link: function (scope, element, attrs) {
                if (!_.isString(attrs.hasPermission)) {
                    throw 'hasPermission value must be a string'
                }

                var permissionName = attrs.hasPermission.trim();
                var notPermissionFlag = permissionName[0] === '!';
                if (notPermissionFlag) {
                    permissionName = permissionName.slice(1).trim();
                }

                var hasPermission = permissionService.hasPermission(permissionName);
                if (hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag) {
                    element.show();
                }
                else {
                    element.hide();
                }
            }
        }
    }]);