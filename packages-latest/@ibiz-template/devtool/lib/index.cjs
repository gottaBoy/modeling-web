'use strict';

require('./style/index.css');
var install = require('./install.cjs');

"use strict";

exports.install = install.install;
exports.listenOpenDevTool = install.listenOpenDevTool;
exports.updateDevToolConfig = install.updateDevToolConfig;
