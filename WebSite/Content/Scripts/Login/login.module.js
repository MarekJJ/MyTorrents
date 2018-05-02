angular
    .module('sfcLogin', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state({
            name: 'username',
            url: '/',
            templateUrl: '/StaticViews/Auth/_loginView.html',
            controller: 'LoginController as $ctrl',
            params: { 'username': '' }
        });

        $urlRouterProvider.otherwise('/');
    }]);