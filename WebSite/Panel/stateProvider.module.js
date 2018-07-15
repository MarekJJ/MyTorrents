myAppModule
        .config(['DefaultModuleStateProvider', '$stateProvider', function ($stateProvider, DefaultModuleStateProvider) {
debugger
        $stateProvider.state({
            name: 'list',
            url: '/list/',
            //params: { 'id': '' },
            templateUrl: '/Panel/List/templates/list.html',
            controller: 'list as $ctrl',
            clearHistory: true
        });

        //$stateProvider.state({
        //    name: 'myActivities',
        //    url: '/myActivities/',
        //    params: { 'id': '' },
        //    templateUrl: '/Panel/Machines/templates/machinesList.html',
        //    controller: 'MachinesListController as $ctrl',
        //    clearHistory: true
        //});





       // $urlRouterProvider.otherwise('/myActivities/');

    }])