angular
    .module('sfcCommon')
    .factory('permissionService', function () {
        var permissionList = [];
        return {
            setPermissions: function (permissions) {
                permissionList = permissions;
            },
            hasPermission: function (permission) {
                return _.contains(permissionList, permission);
            }
        }
    });