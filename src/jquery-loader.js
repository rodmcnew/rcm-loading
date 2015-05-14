jQuery(document).ready(
    function () {

        var rcmLoadingService = rcmLoading.getServiceInstance();
        var url = {
            template: rcmLoadingService.getTemplateUrl('loading.html'),
            css: rcmLoadingService.getTemplateUrl('loading.css')
        };

        var loadingMessage = rcmLoadingService.getConfigValue(
            'loadingMessage',
            'Loading..'
        );

        var loadingCompleteMessage = rcmLoadingService.getConfigValue(
            'loadingCompleteMessage',
            'Complete'
        );

        jQuery.get(
            url.template,
            function (data) {

                var loaderElm = jQuery(data);

                // remove angular interference
                loaderElm.removeAttr('ng-show');

                loaderElm.find('.loading-message').html('');
                var cssElm = loaderElm.find("[type='text/css']");
                cssElm.attr('href', url.css);
                // remove angular interference
                cssElm.removeAttr('ng-href');

                loaderElm.hide();

                jQuery(document.body).append(loaderElm);

                rcmLoading.onLoadingStart(
                    function (loadingParams) {
                        loaderElm.find('.loading-message').html(loadingMessage);
                        loaderElm.show();
                    },
                    'rcmGlobalLoader'
                );

                rcmLoading.onLoadingChange(
                    function (loadingParams) {
                        loaderElm.find('.loading-message').html(loadingMessage + ' ' + loadingParams.tracker.getPercent() + '%');
                        loaderElm.show();
                    },
                    'rcmGlobalLoader'
                );

                rcmLoading.onLoadingComplete(
                    function (loadingParams) {
                        loaderElm.find('.loading-message').html(loadingCompleteMessage);
                        loaderElm.hide();
                    },
                    'rcmGlobalLoader'
                );
            }
        );


    }
);
