/**
 * Created by wreid on 12/28/14.
 */
'use strict';

var _fs = require('fs')
    , _path = require('path');

exports.getIncludePaths = function (path, list, level) {
    var list = list || []
        , level = level || 1
        , files = _fs.readdirSync(path || './');
    files
        .map(function (file) {
            return _path.normalize(path + '/' + file);
        })
        .filter(function (file) {
            return _fs.statSync(file).isDirectory();
        })
        .forEach(function (file) {
            if (/scss\/?$/.test(file)) {
                list.push(file);
            }
            else {
                exports.getIncludePaths(file,list, level+1);
            }
        });
    return list;
}