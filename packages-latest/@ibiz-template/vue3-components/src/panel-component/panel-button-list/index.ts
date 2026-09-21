import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { PanelButtonList } from './panel-button-list';
import { PanelButtonListProvider } from './panel-button-list.provider';

export * from './panel-button-list.controller';

export const IBizPanelButtonList = withInstall(
  PanelButtonList,
  function (v: App) {
    v.component(PanelButtonList.name, PanelButtonList);
    registerPanelItemProvider(
      'BUTTONLIST',
      () => new PanelButtonListProvider(),
    );
  },
);

export default IBizPanelButtonList;
