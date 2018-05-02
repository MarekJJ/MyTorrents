angular
    .module('sfcCommon')
    .provider('DefaultModuleState', ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        this.initialize = function (options) {

            $stateProvider.state({
                name: 'list',
                url: '/',
                templateUrl: options.templatesPath + 'list.html',
                controller: 'List' + options.entityName + 'Controller as $ctrl',
            });

            $stateProvider.state({
                name: 'add',
                url: '/add',
                templateUrl: options.templatesPath + 'addOrUpdate.html',
                controller: 'AddOrUpdate' + options.entityName + 'Controller as $ctrl',
                permission: options.permissionRoot + 'Add'
            });

            $stateProvider.state({
                name: 'edit',
                url: '/edit/{id}',
                templateUrl: options.templatesPath + 'addOrUpdate.html',
                controller: 'AddOrUpdate' + options.entityName + 'Controller as $ctrl',
                permission: options.permissionRoot + 'Edit',
                params: { 'id': '' }
            });

            $stateProvider.state({
                name: 'preview',
                url: '/preview/{id}',
                templateUrl: options.templatesPath + 'preview.html',
                controller: 'Preview' + options.entityName + 'Controller as $ctrl',
                permission: options.permissionRoot + (options.previewPermission || 'View'),
                params: { 'id': '' }
            });

            $urlRouterProvider.otherwise('/');
        };

        this.$get = function () {
            return {
                initialize: this.initialize
            }
        };
    }]);