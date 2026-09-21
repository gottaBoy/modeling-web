import { AuthWxmpQrcodeController } from './auth-wxmp-qrcode.controller.mjs';

"use strict";
class AuthWxmpQrcodeProvider {
  constructor() {
    this.component = "IBizAuthWxmpQrcode";
  }
  async createController(panelItem, panel, parent) {
    const c = new AuthWxmpQrcodeController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { AuthWxmpQrcodeProvider };
