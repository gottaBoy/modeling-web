import { IApiAppHubService } from '@ibiz-template/runtime';
import { runApp } from '@ibiz-template/vue3-components';
import { AppHooks } from '@ibiz-template/vue3-util';
import VueTextFormat from 'vue-text-format';
import gridLayout from 'vue-grid-layout';
import UserRegister from './user-register';
import { resolveNativeModelingRoot } from './native-modeling-root';
import { nativeCentralStartupUrl } from './native-development-center';

const nativeEnvironment = (
  window as typeof window & {
    Environment?: {
      nativeModelApp?: string;
      nativeModelingSystemId?: string;
      nativeDevelopmentCenterId?: string;
      enableMqtt?: unknown;
    };
  }
).Environment;
const nativeModelApp = nativeEnvironment?.nativeModelApp;
const nativeAppCode =
  nativeModelApp === 'Central' || nativeModelApp === 'ModelDesign'
    ? nativeModelApp.toLowerCase()
    : undefined;
const nativeMqttOverride = nativeAppCode ? nativeEnvironment?.enableMqtt : undefined;
if (nativeMqttOverride !== undefined && typeof nativeMqttOverride !== 'boolean') {
  throw new Error('Invalid native enableMqtt: an explicit boolean is required');
}

if (nativeModelApp === 'ModelDesign' && !window.location.hash) {
  const systemId = resolveNativeModelingRoot(nativeEnvironment?.nativeModelingSystemId);
  const rootUrl = new URL(window.location.href);
  rootUrl.hash = `/psdevslnsys=${systemId}/modelingindex/-`;
  window.location.replace(rootUrl.href);
}

if (nativeModelApp === 'Central' && !window.location.hash) {
  const centralUrl = nativeCentralStartupUrl(
    window.location.href,
    nativeEnvironment?.nativeDevelopmentCenterId,
  );
  if (centralUrl) window.location.replace(centralUrl);
}

AppHooks.appResorceInited.tap((ctx: IApiAppHubService) => {
  ctx.microAppConfigCenter.registerMicroApps([
    {
      name: nativeAppCode
        ? `ibizmodeling__${nativeAppCode}`
        : 'ibizplm__plmweb',
      entry: nativeAppCode ? `/${nativeAppCode}/` : '/modeldesign/',
      baseUrl: nativeAppCode ? 'ibizmodeling' : 'ibizplm',
      pluginBaseUrl: './plugins',
    },
  ]);
});

runApp([VueTextFormat, gridLayout, UserRegister], {
  environmentOverrides: nativeMqttOverride !== undefined
    ? { enableMqtt: nativeMqttOverride }
    : undefined,
});
