import { IApiAppHubService } from '@ibiz-template/runtime';
import { runApp } from '@ibiz-template/vue3-components';
import { AppHooks } from '@ibiz-template/vue3-util';
import VueTextFormat from 'vue-text-format';
import gridLayout from 'vue-grid-layout';
import UserRegister from './user-register';

const nativeModelApp = (
  window as typeof window & { Environment?: { nativeModelApp?: string } }
).Environment?.nativeModelApp;
const nativeAppCode =
  nativeModelApp === 'Central' || nativeModelApp === 'ModelDesign'
    ? nativeModelApp.toLowerCase()
    : undefined;

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

runApp([VueTextFormat, gridLayout, UserRegister]);
