angular
    .module('sfcCommon')
    .filter('hasPermission', ['permissionService', function (permissionService) {
        return function (permissionName) {
            var hasPermission = permissionService.hasPermission(permissionName);
            return hasPermission;
        }
    }]);