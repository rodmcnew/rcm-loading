/**
 * RcmLoadingService Exposes loading
 * @require:
 *  RcmEventManager
 * @param config
 * @param rcmLoading
 * @constructor
 */
var RcmLoadingService = function(config) {

    var self = this;

    self.config = config;

    self.rcmLoading = null; //;

    self.event = new RcmEventManager();

    var onLoadingStart = function(loadingParams){
        self.event.trigger('rcmLoadingService.loadingStart', loadingParams);
    };
    var onLoadingChange = function(loadingParams){
        self.event.trigger('rcmLoadingService.loadingChange', loadingParams);
    };
    var onLoadingComplete = function(loadingParams){
        self.event.trigger('rcmLoadingService.loadingComplete', loadingParams);
    };

    self.init = function(){
        self.rcmLoading = new RcmLoading(
            onLoadingStart,
            onLoadingChange,
            onLoadingComplete
        )
    };

    self.getRcmLoading = function() {

        return self.rcmLoading;
    };

    self.getConfigValue = function(key, defaultValue){

        if(typeof self.config[key] !== 'undefined'){
            return self.config[key]
        }

        return defaultValue;
    };

    self.init();
};

var rcmLoadingService = new RcmLoadingService(rcmLoadingConfig);