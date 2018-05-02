angular
    .module('sfcLayout')
    .directive('menuToggle', function () {
        return {
            restrict: 'EA',
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude) {
                var bodyElement = $('body');
                var sidebarMenuElement = $('#sidebarMenu');

                element.append(transclude());
                element.on('click', function () {
                    if (bodyElement.hasClass('nav-md')) {
                        sidebarMenuElement.find('li.active ul').hide();
                        sidebarMenuElement.find('li.active').addClass('active-sm').removeClass('active');
                    } else {
                        sidebarMenuElement.find('li.active-sm > ul').show();
                        sidebarMenuElement.find('li.active-sm').addClass('active').removeClass('active-sm');
                    }

                    bodyElement.toggleClass('nav-md nav-sm');
                });
            }
        };
    });