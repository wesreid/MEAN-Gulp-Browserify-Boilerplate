'use strict';

(function () {
    var definition = [
        '$scope'
        , '$log'
        , function ($scope, $log){

            $log.info('home controller loaded');

        }];

    angular.module('home').controller('HomeController', definition);
    return definition;
})();
