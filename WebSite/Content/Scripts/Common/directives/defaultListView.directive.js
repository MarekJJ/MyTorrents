angular
    .module('sfcCommon')
    .directive('uniqueAsyncValidator', ['$q', '$http', '$state', function ($q, $http, $state) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                ngModel.$asyncValidators.uniqueAsyncValidator = function (modelValue) {

                    var modelId = scope.$eval(attributes.modelId);
                    var url = attributes.uniqueAsyncValidator;

                    return $http.post(url, { id: modelId, value: modelValue })
                         .then(function (response) {
                             if (response.data === true) {
                                 return $q.resolve();
                             } else {
                                 return $q.reject();
                             }
                         });
                };
            }
        };
    }])
    .component('defaultListView', {
        bindings: {
            title: '@',
            addButton: '@',
            editButton: '@',
            previewButton: '@',
            removeButton: '@',
            options: '='
        },
        templateUrl: '/Content/Scripts/Common/templates/_defaultListViewTemplate.html',
        controller: ['DTOptionsBuilder', 'DTColumnBuilder', '$state', 'genericDataTableAjaxProvider', 'dataTableHelper', 'permissionService',
         function (DTOptionsBuilder, DTColumnBuilder, $state, genericDataTableAjaxProvider, dataTableHelper, permissionService) {
             var vm = this;

             vm.dataTableInstance = {};
             vm.table = dataTableHelper.prepareModelForTable();

             var modelId = vm.options.modelId || 'id';
             var titleHtml = '<input ng-model="$ctrl.table.selectAll" ng-click="$ctrl.table.toggleAll()" type="checkbox" icheck  />';

             vm.dtOptions = DTOptionsBuilder.newOptions()
                 .withOption('ajax', genericDataTableAjaxProvider(vm.options.tableDataUrl))
                 .withDataProp('data')
                 .withOption('paging', true)
                 .withOption('processing', true)
                 .withOption('serverSide', true)
                 .withOption('createdRow', function (row, data, index) {
                     angular.element(row).attr('ng-class', '{"selected" : $ctrl.table.selected[\'' + data[modelId] + '\']}');
                     angular.element(row).attr('ng-click', '$ctrl.table.toggleOne(\'' + data[modelId] + '\')');
                     angular.element(row).attr('ng-dblclick', '$ctrl.goToDetails(\'' + data[modelId] + '\')');
                 })
                 .withPaginationType('full_numbers')
                 .withBootstrap();

             function getSelectColumn(modelId) {
                 return DTColumnBuilder
                     .newColumn(modelId)
                     .withTitle(titleHtml)
                     .notSortable()
                     .withClass('select-checkbox')
                     .renderWith(function (data, type, full, meta) {
                         var key = full[modelId];
                         vm.table.selected[key] = false;
                         return '<input ng-model="$ctrl.table.selected[\'' + key + '\']" ng-click="$ctrl.table.checkIfAllSelected()" type="checkbox" icheck />';
                     });
             }

             vm.options.columns.splice(0, 0, getSelectColumn(modelId));
             vm.dtColumns = vm.options.columns;

             vm.goToAddItemView = function () {
                 $state.go('add');
             };

             vm.goToPreviewView = function (id) {
                 var selectedItemId = id || vm.table.getSelectedItemIds()[0];
                 $state.go('preview', { id: selectedItemId });
             };

             vm.goToEditView = function (id) {
                 var selectedItemId = id || vm.table.getSelectedItemIds()[0];
                 $state.go('edit', { id: selectedItemId });
             };

             vm.goToDetails = function (id) {
                 if (permissionService.hasPermission(vm.options.permissions['edit'])) {
                     vm.goToEditView(id);
                 }
                 else if (permissionService.hasPermission(vm.options.permissions['view'])) {
                     vm.goToPreviewView(id);
                 }
             };

             vm.removeSelectedItems = function () {
                 var itemsToRemove = vm.table.getSelectedItemIds();
                 vm.options.removeItems(itemsToRemove).then(function () {
                     vm.dataTableInstance.reloadData();
                 });
             };
         }]
    });