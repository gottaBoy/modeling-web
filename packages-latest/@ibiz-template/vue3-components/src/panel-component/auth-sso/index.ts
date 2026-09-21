import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { AuthSso } from './auth-sso';
import { AuthSsoProvider } from './auth-sso.provider';

export const IBizAuthSso = withInstall(AuthSso, function (v: App) {
  v.component(AuthSso.name!, AuthSso);
  registerPanelItemProvider('RAWITEM_AUTH_SSO', () => new AuthSsoProvider());
});

export default IBizAuthSso;
