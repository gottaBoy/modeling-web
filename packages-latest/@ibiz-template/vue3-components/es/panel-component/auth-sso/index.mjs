import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { AuthSso } from './auth-sso.mjs';
import { AuthSsoProvider } from './auth-sso.provider.mjs';

"use strict";
const IBizAuthSso = withInstall(AuthSso, function(v) {
  v.component(AuthSso.name, AuthSso);
  registerPanelItemProvider("RAWITEM_AUTH_SSO", () => new AuthSsoProvider());
});

export { IBizAuthSso, IBizAuthSso as default };
