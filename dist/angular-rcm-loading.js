/**
 * Angular JS module for creating UI for rcm-loading
 * @require:
 *  AngularJS
 */
angular.module('RcmLoading', [])

    .factory(
    'rcmLoadingService',
    function () {

        return rcmLoadingService;
    }
)
    .directive(
    'rcmGlobalLoader',
    [
        'rcmLoadingService',
        function (rcmLoadingService) {

            var baseUrl = rcmLoadingService.getConfigValue('baseUrl', '.');
            var template = rcmLoadingService.getConfigValue('template', 'default');
            var templateFolder = rcmLoadingService.getConfigValue('templateFolder', '/template');

            var templateUrl = null;

            var cssUrl = null;

            var buildUrls = function(template){
                templateUrl = baseUrl + templateFolder + '/' + template + '/loading.html';
                cssUrl = baseUrl + templateFolder + '/' + template + '/loading.css';
            };

            buildUrls(template);

            var link = function (scope, element, attrs) {

                /** validate me */
                if(attrs.template){
                    template = attrs.template;
                    buildUrls(template);
                }

                scope.safeApply = function(fn) {
                    var phase = this.$root.$$phase;
                    if(phase == '$apply' || phase == '$digest')
                        this.$eval(fn);
                    else
                        this.$apply(fn);
                };

                scope.cssUrl = cssUrl;

                var loadingMessage = rcmLoadingService.getConfigValue(
                    'loadingMessage',
                    'Loading..'
                );

                var loadingCompleteMessage = rcmLoadingService.getConfigValue(
                    'loadingCompleteMessage',
                    'Complete'
                );

                scope.isLoading = false;

                rcmLoadingService.event.on(
                    'rcmLoadingService.loadingStart',
                    function(loadingParams){
                        scope.loadingPercent = loadingParams.rcmLoading.getPercent();
                        scope.loadingMessage = loadingMessage;
                        scope.isLoading = true;

                        scope.safeApply();
                    },
                    'rcmGlobalLoader',
                    true
                );

                rcmLoadingService.event.on(
                    'rcmLoadingService.loadingChange',
                    function(loadingParams){
                        scope.loadingPercent = loadingParams.rcmLoading.getPercent();
                        scope.loadingMessage = loadingMessage;
                        scope.isLoading = true;

                        scope.safeApply();
                    },
                    'rcmGlobalLoader',
                    true
                );

                rcmLoadingService.event.on(
                    'rcmLoadingService.loadingComplete',
                    function(loadingParams){
                        scope.loadingPercent = loadingParams.rcmLoading.getPercent();
                        scope.loadingMessage = loadingCompleteMessage;
                        scope.isLoading = false;

                        scope.safeApply();
                    },
                    'rcmGlobalLoader',
                    true
                );
            };

            return {
                link: link,
                scope: [],
                templateUrl: templateUrl
            }
        }


    ]
);