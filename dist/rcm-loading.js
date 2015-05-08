/**
 * RcmLoading - Aggregates loading events and tracks loading progress
 * @param onLoadingStart
 * @param onLoadingChange
 * @param onLoadingComplete
 * @constructor
 */
var RcmLoading = function (
    onLoadingStart,
    onLoadingChange,
    onLoadingComplete
) {

    var self = this;

    self.loadingAggregate = {};

    self.loadingAmount = 1;

    /**
     * getPercent
     * @returns {number}
     */
    self.getPercent = function () {
        return Math.round((self.loadingAmount * 100))
    };

    /**
     * isLoading
     * @returns {boolean}
     */
    self.isLoading = function () {
        return (self.loadingAmount < 1);
    };

    /**
     * loading - Set or change loading status
     * @param name unique namespace for this loading event
     * @param amount Loading amount between 0 and 1
     * @param {object} options optional
     */
    self.setLoading = function (name, amount, options) {

        if (self.has(name)) {
            self.loadingAggregate[name].amount = amount;
        } else {
            self.add(name, amount, options);
        }

        self.calc();
    };

    /**
     * has
     * @param name
     * @returns {bool}
     */
    self.has = function (name) {

        return (typeof self.loadingAggregate[name] === 'object');
    };

    /**
     * add
     * @param name
     * @param amount
     * @param options
     */
    self.add = function (name, amount, options) {

        var params = new RcmLoadingParams(options);
        params.name = name;
        params.amount = amount;
        self.loadingAggregate[name] = params;
    };

    /**
     * remove
     * @param name
     */
    self.remove = function (name) {

        self.loadingAggregate[name] = undefined;

        try {
            delete self.loadingAggregate[name];
        } catch (exception) {
            //
        }
    };

    /**
     * calc
     */
    self.calc = function () {

        if (self.loadingAmount >= 1) {
            self.onLoadingStart();
        }

        var currentLoadingAmount = self.loadingAmount;
        var currentLoading = {};
        var completeLoading = {};
        var total = 0;
        var count = 0;

        for (var index in self.loadingAggregate) {

            if (!self.has(index)) {
                continue;
            }

            count++;

            total = total + self.loadingAggregate[index].amount;

            currentLoading[index] = self.loadingAggregate[index];

            self.loadingAggregate[index].onChange(
                self.loadingAggregate[index]
            );

            if (self.loadingAggregate[index].amount >= 1) {

                completeLoading[index] = self.loadingAggregate[index];
                self.loadingAggregate[index].onComplete(
                    self.loadingAggregate[index]
                );
            }
        }

        if (count > 0) {
            self.loadingAmount = total / count;
        } else {
            self.loadingAmount = 1;
        }

        if (currentLoadingAmount !== self.loadingAmount) {
            self.onLoadingChange(currentLoading, completeLoading);
        }

        if (self.loadingAmount >= 1) {
            self.onLoadingComplete(completeLoading);
        }
    };

    /**
     * onLoadingStart
     */
    self.onLoadingStart = function () {

        if (typeof onLoadingStart === 'function') {

            onLoadingStart({rcmLoading: self});
        }
    };

    /**
     * onLoadingChange
     * @param currentLoading
     * @param completeLoading
     */
    self.onLoadingChange = function (currentLoading, completeLoading) {

        if (typeof onLoadingChange === 'function') {
            onLoadingChange(
                {
                    rcmLoading: self,
                    currentLoading: currentLoading,
                    completeLoading: completeLoading
                }
            );
        }
    };

    /**
     * onLoadingComplete
     */
    self.onLoadingComplete = function (completeLoading) {

        if (typeof onLoadingComplete === 'function') {
            onLoadingComplete(
                {
                    rcmLoading: self,
                    completeLoading: completeLoading
                }
            );
        }

        self.loadingAggregate = {};
    };

    /**
     * RcmLoadingParams Standard class for loading params
     * @param options
     * @constructor
     */
    var RcmLoadingParams = function (options) {

        var self = this;
        self.name = null;
        self.amount = 0;
        self.onChange = function (params) {
        };
        self.onComplete = function (params) {
        };

        /**
         * init
         * @param options
         */
        self.init = function (options) {
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
};
