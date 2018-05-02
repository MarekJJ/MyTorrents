angular
    .module('sfcLayout')
    .directive('sidebarMenu', function () {
        return {
            restrict: 'EA',
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude) {
                element.append(transclude());
                element.find('a').on('click', function () {
                    var listItem = $(this).parent();

                    if (listItem.is('.active')) {
                        listItem.removeClass('active active-sm');
                        listItem.find('ul:first').slideUp();
                    } else {
                        // prevent closing menu if we are on child menu
                        if (!listItem.parent().is('.child_menu')) {
                            element.find('li').removeClass('active active-sm');
                            element.find('li ul').slideUp();
                        }

                        listItem.addClass('active');

                        listItem.find('ul:first').slideDown();
                    }
                });
            }
        };
    });