'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var authWxmpQrcode = require('./auth-wxmp-qrcode.cjs');
var authWxmpQrcode_provider = require('./auth-wxmp-qrcode.provider.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizAuthWxmpQrcode = install.withInstall(
  authWxmpQrcode.AuthWxmpQrcode,
  function(v) {
    v.component(authWxmpQrcode.AuthWxmpQrcode.name, authWxmpQrcode.AuthWxmpQrcode);
    runtime.registerPanelItemProvider(
      "RAWITEM_AUTH_WXMP_QRCODE",
      () => new authWxmpQrcode_provider.AuthWxmpQrcodeProvider()
    );
  }
);

exports.IBizAuthWxmpQrcode = IBizAuthWxmpQrcode;
exports.default = IBizAuthWxmpQrcode;
