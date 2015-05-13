/*! rcm-loading 2015-05-13 */

angular.element(document).ready(function(){var element=jQuery("<div data-rcm-global-loader></div>");jQuery("body").prepend(element);element.contents();angular.element(element).injector().invoke(function($compile){var scope=angular.element(element).scope();$compile(element)(scope),scope.$apply()})});
//# sourceMappingURL=rcm-loading.map