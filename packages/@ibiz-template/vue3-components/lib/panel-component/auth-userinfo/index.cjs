'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var authUserinfo = require('./auth-userinfo.cjs');
var authUserinfo_provider = require('./auth-userinfo.provider.cjs');

"use strict";
const IBizAuthUserinfo = vue3Util.withInstall(authUserinfo.AuthUserinfo, function(v) {
  v.component(authUserinfo.AuthUserinfo.name, authUserinfo.AuthUserinfo);
  runtime.registerPanelItemProvider(
    "RAWITEM_AUTH_USERINFO",
    () => new authUserinfo_provider.AuthUserinfoProvider()
  );
});

exports.IBizAuthUserinfo = IBizAuthUserinfo;
exports.default = IBizAuthUserinfo;
