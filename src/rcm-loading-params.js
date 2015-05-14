/**
 * rcmLoading.Params Standard class for loading params
 * @param options
 * @constructor
 */
rcmLoading.Params = function (options) {

    var self = this;
    self.name = null;
    self.amount = 0;
    self.options = null;

    self.onChange = function (params) {
    };
    self.onComplete = function (params) {
    };

    /**
     * init
     * @param options
     */
    self.init = function (options) {
        self.setOptions(options);
    };

    /**
     * setOptions
     * @param options
     */
    self.setOptions = function (options) {

        if (typeof options.name === 'string') {
            self.name = options.name;
        }
        if (typeof options.amount === 'number') {
            self.amount = options.amount;
        }
        if (typeof options.onChange === 'function') {
            self.onChange = options.onChange;
        }
        if (typeof options.onComplete === 'function') {
            self.onComplete = options.onComplete;
        }
        if (typeof options.message === 'string') {
            self.message = options.string;
        }

        self.options = options;
    };

    /**
     * getPercent
     * @returns {number}
     */
    self.getPercent = function () {
        return Math.round((self.amount * 100))
    };

    /**
     * isLoading
     * @returns {boolean}
     */
    self.isLoading = function () {
        return (self.amount < 1);
    };

    /**
     * init call
     */
    self.init(options);
};
