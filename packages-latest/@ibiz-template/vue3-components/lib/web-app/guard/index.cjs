'use strict';

var authGuard = require('./auth-guard/auth-guard.cjs');
var dynaAuthGuard = require('./auth-guard/dyna-auth-guard.cjs');

"use strict";

exports.AuthGuard = authGuard.AuthGuard;
exports.DynaAuthGuard = dynaAuthGuard.DynaAuthGuard;
