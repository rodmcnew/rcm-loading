/**
 * rcmLoading Module
 * @type {{defaultConfig: {}, serviceInstance: {}, getServiceInstance: Function}}
 */
var rcmLoading = {
    /**
     *
     */
    defaultConfig: {},

    /**
     *
     */
    serviceInstance: null,

    /**
     * getServiceInstance
     * @param instanceId
     * @param config
     * @returns {*}
     */
    getServiceInstance: function (config) {

        if (rcmLoading.serviceInstance) {
            return rcmLoading.serviceInstance;
        }

        if (!config) {
            config = rcmLoading.defaultConfig;
        }

        rcmLoading.serviceInstance = new rcmLoading.Service(config);

        return rcmLoading.serviceInstance;
    },

    /**
     * isLoading
     * @returns {boolean}
     */
    isLoading: function (name) {

        var service = rcmLoading.getServiceInstance();

        return service.tracker.isLoading(name);
    },

    /**
     * setLoading
     * @param name
     * @param amount
     * @param options
     */
    setLoading: function(name, amount, options) {

        var service = rcmLoading.getServiceInstance();

        service.tracker.setLoading(name, amount, options);
    },

    /**
     * onLoadingStart
     * Register listener, must provide unique id
     * @param method
     * @param id
     */
    onLoadingStart: function(method, id) {

        var service = rcmLoading.getServiceInstance();

        service.events.on('rcmLoadingService.loadingStart', method, id, true);
    },

    /**
     * onLoadingChange
     * Register listener, must provide unique id
     * @param method
     * @param id
     */
    onLoadingChange: function(method, id) {

        var service = rcmLoading.getServiceInstance();

        service.events.on('rcmLoadingService.loadingChange', method, id, true);
    },

    /**
     * onLoadingComplete
     * Register listener, must provide unique id
     * @param method
     * @param id
     */
    onLoadingComplete: function(method, id) {

        var service = rcmLoading.getServiceInstance();

        service.events.on('rcmLoadingService.loadingComplete', method, id, true);
    }
};
