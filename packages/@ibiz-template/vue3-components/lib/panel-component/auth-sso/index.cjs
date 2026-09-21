'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var authSso = require('./auth-sso.cjs');
var authSso_provider = require('./auth-sso.provider.cjs');

"use strict";
const IBizAuthSso = vue3Util.withInstall(authSso.AuthSso, function(v) {
  v.component(authSso.AuthSso.name, authSso.AuthSso);
  runtime.registerPanelItemProvider("RAWITEM_AUTH_SSO", () => new authSso_provider.AuthSsoProvider());
});

exports.IBizAuthSso = IBizAuthSso;
exports.default = IBizAuthSso;
