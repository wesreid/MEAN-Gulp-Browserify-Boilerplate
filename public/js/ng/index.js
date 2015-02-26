'use strict';

var _applicationConfig = require('./config')
    , _applicationDependencies = [
        'ui.router'
    ];
_applicationConfig.applicationModuleName = 'MyAppName';
_applicationConfig.applicationModuleVendorDependencies = _applicationConfig.applicationModuleVendorDependencies.concat(_applicationDependencies);


(function() {
    angular.element(document).ready(function() {
            //Start by defining the main module and adding any pre-defined dependencies
            var appModule = angular.module(_applicationConfig.applicationModuleName, _applicationConfig.applicationModuleVendorDependencies);

            // load modules needed for application
            require('./includes.ng-app-modules');


            appModule
                .config([
                    '$locationProvider'
                    , '$urlRouterProvider'
                    , '$stateProvider'
                    , '$sceDelegateProvider'
                    , '$httpProvider'
                    , '$logProvider'
                    , function ($locationProvider, $urlRouterProvider, $stateProvider, $sceDelegateProvider, $httpProvider, $logProvider) {

                        // default route
                        $urlRouterProvider.otherwise('/home');

                        // whitelist urls
                        $sceDelegateProvider.resourceUrlWhitelist(_config.whiteListUrls);
                        // The blacklist overrides the whitelist so the open redirect here is blocked.
                        $sceDelegateProvider.resourceUrlBlacklist(_config.blackListUrls);

                        // global http interceptor
                        $httpProvider.interceptors.push('$httpInterceptor');

                        if (window.APP_ENV === 'production' && window.location.href.indexOf('logs=true') < 0) {
                            $logProvider.debugEnabled(false);
                        }
                    }]
            )
                .run([function () {
                    // startup code
                }]
            );

            //Then define the init function for starting up the application
            angular.element(document).ready(function () {
                //Fixing facebook bug with redirect
                if (window.location.hash === '#_=_') {
                    window.location.hash = '#!';
                }

                //Then init the app
                angular.bootstrap(document, [_applicationConfig.applicationModuleName]);
            });
        }
    );
})();
