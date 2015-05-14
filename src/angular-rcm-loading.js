/**
 * Angular JS module for creating UI for rcm-loading
 * @require:
 *  AngularJS
 */
angular.module('RcmLoading', [])

    .factory(
    'rcmLoadingService',
    function () {

        return rcmLoading.getServiceInstance();
    }
)
    .directive(
    'rcmGlobalLoader',
    [
        'rcmLoadingService',
        function (rcmLoadingService) {

            var url = {
                template: rcmLoadingService.getTemplateUrl('loading.html'),
                css: rcmLoadingService.getTemplateUrl('loading.css')
            };

            var compile = function (tElm, tAttr) {

                return function (scope, element, attrs) {

                    scope.safeApply = function (fn) {
                        var phase = this.$root.$$phase;
                        if (phase == '$apply' || phase == '$digest')
                            this.$eval(fn);
                        else
                            this.$apply(fn);
                    };

                    scope.cssUrl = url.css;

                    var loadingMessage = rcmLoadingService.getConfigValue(
                        'loadingMessage',
                        'Loading..'
                    );

                    var loadingCompleteMessage = rcmLoadingService.getConfigValue(
                        'loadingCompleteMessage',
                        'Complete'
                    );

                    scope.isLoading = false;

                    rcmLoadingService.events.on(
                        'rcmLoadingService.loadingStart',
                        function (loadingParams) {
                            scope.loadingPercent = '';
                            scope.loadingMessage = loadingMessage;
                            scope.isLoading = true;

                            scope.safeApply();
                        },
                        'rcmGlobalLoader',
                        true
                    );

                    rcmLoadingService.events.on(
                        'rcmLoadingService.loadingChange',
                        function (loadingParams) {
                            scope.loadingPercent = loadingParams.tracker.getPercent() + '%';
                            scope.loadingMessage = loadingMessage;
                            scope.isLoading = true;

                            scope.safeApply();
                        },
                        'rcmGlobalLoader',
                        true
                    );

                    rcmLoadingService.events.on(
                        'rcmLoadingService.loadingComplete',
                        function (loadingParams) {
                            scope.loadingPercent = '';
                            scope.loadingMessage = loadingCompleteMessage;
                            scope.isLoading = false;

                            scope.safeApply();
                        },
                        'rcmGlobalLoader',
                        true
                    );
                };


            };

            return {
                compile: compile,
                scope: [],
                templateUrl: url.template
            }
        }


    ]
);