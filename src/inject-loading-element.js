/**
 * Include this file or code to:
 * Add the angular directive element for the global loader to the DOM
 */
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
