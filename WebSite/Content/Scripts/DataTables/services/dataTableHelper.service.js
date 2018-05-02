angular
    .module('sfcDataTables')
    .factory('dataTableHelper', function () {

        function toggleAll() {
            var that = this;

            _.each(_.keys(this.selected), function (id) {
                that.selected[id] = that.selectAll;
            });
        }

        function toggleOne(id) {
            this.selected[id] = !this.selected[id];
            this.checkIfAllSelected();
        }

        function checkIfAllSelected() {
            this.selectAll = this.allRowSelected();
        }

        function isAnyRowSelected() {
            return _.some(_.values(this.selected));
        }

        function allRowSelected() {
            return _.all(_.values(this.selected));
        }

        function onlyOneSelected() {
            var selectedItems = this.getSelectedItemIds();
            return selectedItems.length === 1;
        }

        function getSelectedItemIds() {
            var that = this;
            var selectedItemIds = [];

            _.each(_.keys(this.selected), function (id) {
                if (that.selected[id] === true) {
                    selectedItemIds.push(id);
                }
            });

            return selectedItemIds;
        }

        function unselectAll() {
            this.selectAll = false;
            this.toggleAll();
        }

        function clear() {
            this.selected = {};
            this.selectAll = false;
            this.toggleAll();
        }

        function prepareModelForTable() {
            return {
                selected: {},
                selectAll: false,
                toggleAll: toggleAll,
                toggleOne: _.throttle(toggleOne, 300),
                checkIfAllSelected: checkIfAllSelected,
                isAnyRowSelected: isAnyRowSelected,
                allRowSelected: allRowSelected,
                onlyOneSelected: onlyOneSelected,
                getSelectedItemIds: getSelectedItemIds,
                clear: clear
            };
        }

        return {
            prepareModelForTable: prepareModelForTable
        };
    });
