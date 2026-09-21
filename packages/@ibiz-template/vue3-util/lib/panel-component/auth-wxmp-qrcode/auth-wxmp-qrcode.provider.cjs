'use strict';

var authWxmpQrcode_controller = require('./auth-wxmp-qrcode.controller.cjs');

"use strict";
class AuthWxmpQrcodeProvider {
  constructor() {
    this.component = "IBizAuthWxmpQrcode";
  }
  async createController(panelItem, panel, parent) {
    const c = new authWxmpQrcode_controller.AuthWxmpQrcodeController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.AuthWxmpQrcodeProvider = AuthWxmpQrcodeProvider;
