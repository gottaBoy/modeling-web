import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { AuthCaptcha } from './auth-captcha.mjs';
import { AuthCaptchaProvider } from './auth-captcha.provider.mjs';

"use strict";
const IBizAuthCaptcha = withInstall(AuthCaptcha, function(v) {
  v.component(AuthCaptcha.name, AuthCaptcha);
  registerPanelItemProvider(
    "RAWITEM_AUTH_CAPTCHA",
    () => new AuthCaptchaProvider()
  );
});

export { IBizAuthCaptcha, IBizAuthCaptcha as default };
