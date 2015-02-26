/**
 * Created by wreid on 2/10/15.
 */

'use strict';

var _AppConfig = require('../../config')
    , _internal = null;

_internal = {
    init: function () {

        var definition = [
            '$q'
            , '$rootScope'
            , function ($q, $rootScope) {

                var _publicInterface = {
                    'request': function (config) {
                        $rootScope.loading = 1;
                        // Successful request method
                        return config; // or $q.when(config);
                    },
                    'response': function (response) {
                        $rootScope.loading = 0;
                        // successful response
                        return response; // or $q.when(config);
                    },
                    'requestError': function (rejection) {
                        $rootScope.loading = 0;
                        // an error happened on the request
                        // if we can recover from the error
                        // we can return a new request
                        // or promise
                        return rejection; // or new promise
                        // Otherwise, we can reject the next
                        // by returning a rejection
                        // return $q.reject(rejection);
                    },
                    'responseError': function (rejection) {
                        $rootScope.loading = 0;
                        // an error happened on the request
                        // if we can recover from the error
                        // we can return a new response
                        // or promise
                        return rejection; // or new promise
                        // Otherwise, we can reject the next
                        // by returning a rejection
                        // return $q.reject(rejection);
                    }
                };

                return _publicInterface;

            }];

        angular.module(_AppConfig.applicationModuleName).factory('$httpInterceptor', definition);
        return definition;
    }
};

module.exports = _internal.init();
