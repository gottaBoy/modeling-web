'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var authCaptcha = require('./auth-captcha.cjs');
var authCaptcha_provider = require('./auth-captcha.provider.cjs');

"use strict";
const IBizAuthCaptcha = vue3Util.withInstall(authCaptcha.AuthCaptcha, function(v) {
  v.component(authCaptcha.AuthCaptcha.name, authCaptcha.AuthCaptcha);
  runtime.registerPanelItemProvider(
    "RAWITEM_AUTH_CAPTCHA",
    () => new authCaptcha_provider.AuthCaptchaProvider()
  );
});

exports.IBizAuthCaptcha = IBizAuthCaptcha;
exports.default = IBizAuthCaptcha;
