import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { AuthUserinfo } from './auth-userinfo';
import { AuthUserinfoProvider } from './auth-userinfo.provider';

export const IBizAuthUserinfo = withInstall(AuthUserinfo, function (v: App) {
  v.component(AuthUserinfo.name, AuthUserinfo);
  registerPanelItemProvider(
    'RAWITEM_AUTH_USERINFO',
    () => new AuthUserinfoProvider(),
  );
});

export default IBizAuthUserinfo;
