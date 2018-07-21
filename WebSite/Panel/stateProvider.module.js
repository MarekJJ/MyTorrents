




angular
  .module('torApp', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            console.log('!!!!!!!!!!!!!!!!!');
            $stateProvider.state("home", {
                url: '/home',
                template: "<h1>HELLO!</h1>"
            })
            $urlRouterProvider.otherwise('/home');
        }]);
//console.log('blbl', angular.module)


