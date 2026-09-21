import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { AuthCaptcha } from './auth-captcha';
import { AuthCaptchaProvider } from './auth-captcha.provider';

export const IBizAuthCaptcha = withInstall(AuthCaptcha, function (v: App) {
  v.component(AuthCaptcha.name, AuthCaptcha);
  registerPanelItemProvider(
    'RAWITEM_AUTH_CAPTCHA',
    () => new AuthCaptchaProvider(),
  );
});

export default IBizAuthCaptcha;
