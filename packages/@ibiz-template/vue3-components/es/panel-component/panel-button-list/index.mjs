import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { PanelButtonList } from './panel-button-list.mjs';
import { PanelButtonListProvider } from './panel-button-list.provider.mjs';
export { PanelButtonListController } from './panel-button-list.controller.mjs';

"use strict";
const IBizPanelButtonList = withInstall(
  PanelButtonList,
  function(v) {
    v.component(PanelButtonList.name, PanelButtonList);
    registerPanelItemProvider(
      "BUTTONLIST",
      () => new PanelButtonListProvider()
    );
  }
);

export { IBizPanelButtonList, IBizPanelButtonList as default };
