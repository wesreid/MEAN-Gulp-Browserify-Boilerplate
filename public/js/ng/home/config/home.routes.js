'use strict';

var _basePath = 'js/ng/home/views/'
    , _internal = {
        init: function () {
            var definition = [
                '$stateProvider'
                , function ($stateProvider) {
                    $stateProvider
                        .state('home'
                        , {
                            url: '^/home'
                            , controller: 'HomeController'
                            , templateUrl: _basePath + 'home.html'
                        });
                }];

            // Setting up route
            angular.module('home').config(definition);
            return definition;
        }

    };

module.exports = _internal.init();
