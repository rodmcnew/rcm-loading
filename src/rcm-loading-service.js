/**
 * RcmLoadingService Exposes loading
 * @require:
 *  RcmEventManager
 * @param config
 * @param rcmLoading
 * @constructor
 */
rcmLoading.Service = function(config) {

    var self = this;

    self.config = {};

    self.tracker = null; //;

    self.events = new RcmEventManager();

    var onLoadingStart = function(loadingParams){
        self.events.trigger('rcmLoadingService.loadingStart', loadingParams);
    };
    var onLoadingChange = function(loadingParams){
        self.events.trigger('rcmLoadingService.loadingChange', loadingParams);
    };
    var onLoadingComplete = function(loadingParams){
        self.events.trigger('rcmLoadingService.loadingComplete', loadingParams);
    };

    /**
     * init
     * @param config
     */
    self.init = function(config){

        self.config = config;

        self.tracker = new rcmLoading.Tracker(
            onLoadingStart,
            onLoadingChange,
            onLoadingComplete
        )
    };

    /**
     * loading - Set or change loading status
     * @param name unique namespace for this loading event
     * @param amount Loading amount between 0 and 1
     * @param {object} options optional
     */
    self.setLoading = function (name, amount, options) {

        self.tracker.setLoading(name, amount, options);
    };

    /**
     * getTracker
     * @returns {null|*}
     */
    self.getTracker = function() {

        return self.tracker;
    };

    /**
     * getConfigValue
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    self.getConfigValue = function(key, defaultValue){

        if(typeof self.config[key] !== 'undefined'){
            return self.config[key]
        }

        return defaultValue;
    };

    self.init(config);
};