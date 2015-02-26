'use strict';
var AppConfig = require('../config');
AppConfig.registerModule('common', []);

require('./controllers');
require('./directives');
require('./filters');
require('./services');