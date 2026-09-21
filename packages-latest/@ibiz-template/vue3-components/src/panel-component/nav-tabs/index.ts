import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { NavTabs } from './nav-tabs';
import { NavTabsProvider } from './nav-tabs.provider';

export * from './nav-tabs.controller';
export * from './nav-tabs.state';

export const IBizNavTabs = withInstall(NavTabs, function (v: App) {
  v.component(NavTabs.name, NavTabs);
  registerPanelItemProvider('RAWITEM_NAV_TABS', () => new NavTabsProvider());
});

export default IBizNavTabs;
