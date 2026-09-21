import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { AuthWxmpQrcode } from './auth-wxmp-qrcode';
import { AuthWxmpQrcodeProvider } from './auth-wxmp-qrcode.provider';

export const IBizAuthWxmpQrcode = withInstall(
  AuthWxmpQrcode,
  function (v: App) {
    v.component(AuthWxmpQrcode.name!, AuthWxmpQrcode);
    registerPanelItemProvider(
      'RAWITEM_AUTH_WXMP_QRCODE',
      () => new AuthWxmpQrcodeProvider(),
    );
  },
);

export default IBizAuthWxmpQrcode;
