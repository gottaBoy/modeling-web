import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { AuthUserinfo } from './auth-userinfo.mjs';
import { AuthUserinfoProvider } from './auth-userinfo.provider.mjs';

"use strict";
const IBizAuthUserinfo = withInstall(AuthUserinfo, function(v) {
  v.component(AuthUserinfo.name, AuthUserinfo);
  registerPanelItemProvider(
    "RAWITEM_AUTH_USERINFO",
    () => new AuthUserinfoProvider()
  );
});

export { IBizAuthUserinfo, IBizAuthUserinfo as default };
