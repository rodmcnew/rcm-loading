angular.element(document).ready(
    function () {

        var element = jQuery('<div data-rcm-global-loader></div>');
        jQuery('body').prepend(element);

        var content = element.contents();

        angular.element(element).injector().invoke(
            function ($compile) {
                var scope = angular.element(element).scope();
                $compile(element)(scope);
                scope.$apply();
            }
        );
    }
);
