import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { AuthWxmpQrcode } from './auth-wxmp-qrcode.mjs';
import { AuthWxmpQrcodeProvider } from './auth-wxmp-qrcode.provider.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizAuthWxmpQrcode = withInstall(
  AuthWxmpQrcode,
  function(v) {
    v.component(AuthWxmpQrcode.name, AuthWxmpQrcode);
    registerPanelItemProvider(
      "RAWITEM_AUTH_WXMP_QRCODE",
      () => new AuthWxmpQrcodeProvider()
    );
  }
);

export { IBizAuthWxmpQrcode, IBizAuthWxmpQrcode as default };
