'use strict';

(function () {
    var definition = [
        '$scope'
        , '$log'
        , function ($scope, $log) {
            $log.info('appController loaded.');
        }];

    angular.module('common').controller('AppController', definition);
    return definition;
})();
