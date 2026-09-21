'use strict';

require('./guard/index.cjs');
var main = require('./main.cjs');
var index = require('./router/index.cjs');
require('./util/index.cjs');
var authGuard = require('./guard/auth-guard/auth-guard.cjs');
var appFuncBlockProvider = require('./util/app-func-block-provider/app-func-block-provider.cjs');

"use strict";

exports.runApp = main.runApp;
exports.AppRouter = index.AppRouter;
exports.AuthGuard = authGuard.AuthGuard;
exports.AppFuncBlockProvider = appFuncBlockProvider.AppFuncBlockProvider;
