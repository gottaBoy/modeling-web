'use strict';

require('./guard/index.cjs');
var main = require('./main.cjs');
var index = require('./router/index.cjs');
var authGuard = require('./guard/auth-guard/auth-guard.cjs');

"use strict";

exports.runApp = main.runApp;
exports.AppRouter = index.AppRouter;
exports.AuthGuard = authGuard.AuthGuard;
