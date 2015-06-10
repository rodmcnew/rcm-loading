/*! rcm-loading 2015-06-10 */

angular.module("RcmLoading",[]).factory("rcmLoading",function(){return rcmLoading}).directive("rcmGlobalLoader",["rcmLoading",function(rcmLoading){var url={template:rcmLoading.getTemplateUrl("loading.html"),css:rcmLoading.getTemplateUrl("loading.css")},compile=function(tElm,tAttr){return function(scope,element,attrs){scope.safeApply=function(fn){var phase=this.$root.$$phase;"$apply"==phase||"$digest"==phase?this.$eval(fn):this.$apply(fn)},scope.cssUrl=url.css,scope.isLoading=!1,rcmLoading.onLoadingStart(function(loadingParams){scope.loadingPercent="",scope.loadingMessage=rcmLoading.getConfigValue("loadingMessage"),scope.isLoading=!0,scope.safeApply()},"rcmGlobalLoader"),rcmLoading.onLoadingChange(function(loadingParams){scope.loadingPercent="";var percent=loadingParams.tracker.getPercent();percent>0&&(scope.loadingPercent=" "+loadingParams.tracker.getPercent()+"%"),scope.loadingMessage=rcmLoading.getConfigValue("loadingMessage"),scope.isLoading=!0,scope.safeApply()},"rcmGlobalLoader"),rcmLoading.onLoadingComplete(function(loadingParams){scope.loadingPercent="",scope.loadingMessage=rcmLoading.getConfigValue("loadingCompleteMessage"),scope.isLoading=!1,scope.safeApply()},"rcmGlobalLoader")}};return{compile:compile,scope:[],templateUrl:url.template}}]);
//# sourceMappingURL=rcm-loading.map