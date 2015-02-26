'use strict';


// Init module configuration options
var applicationModuleName = 'MyNgApp';
var applicationModuleVendorDependencies = [];

// Add a new vertical module
var registerModule = function(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(module.exports.applicationModuleName).requires.push(moduleName);
};

module.exports = {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
};