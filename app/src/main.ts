import { IApiAppHubService } from '@ibiz-template/runtime';
import { runApp } from '@ibiz-template/vue3-components';
import { AppHooks } from '@ibiz-template/vue3-util';
import VueTextFormat from 'vue-text-format';
import gridLayout from 'vue-grid-layout';
import UserRegister from './user-register';

AppHooks.appResorceInited.tap((ctx: IApiAppHubService) => {
  ctx.microAppConfigCenter.registerMicroApps([
    {
      name: 'ibizplm__plmweb',
      entry: '/modeldesign/',
      baseUrl: 'ibizplm',
      pluginBaseUrl: './plugins',
    },
  ]);
});

runApp([VueTextFormat, gridLayout, UserRegister]);
