'use strict';

var _config = require('../../../lib/config')
    , _internal = null;

_internal = {
    init: function () {

        var definition = [
            '$http'
            , '$log'
            , '$q'
            , function ($http, $log, $q) {

                var _publicInterface = {

                };

                return _publicInterface;

            }];

        angular.module('common').factory('restClientService', definition);
        return definition;
    }
};

module.exports = _internal.init();
