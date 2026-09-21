import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { NavTabs } from './nav-tabs.mjs';
import { NavTabsProvider } from './nav-tabs.provider.mjs';
export { NavTabsController } from './nav-tabs.controller.mjs';
export { NavTabsState } from './nav-tabs.state.mjs';

"use strict";
const IBizNavTabs = withInstall(NavTabs, function(v) {
  v.component(NavTabs.name, NavTabs);
  registerPanelItemProvider("RAWITEM_NAV_TABS", () => new NavTabsProvider());
});

export { IBizNavTabs, IBizNavTabs as default };
