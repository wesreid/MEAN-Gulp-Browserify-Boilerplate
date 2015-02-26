/**
 * Created by wreid on 1/8/15.
 */
'use strict';
require('./development');


var _environment = window.APP_ENV || 'development';

module.exports = require('./'+_environment);