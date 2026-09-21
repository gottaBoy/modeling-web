import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { PanelContainerTabs } from './panel-container-tabs';
import { PanelContainerTabsProvider } from './panel-container-tabs.provider';

export const IBizPanelContainerTabs = withInstall(
  PanelContainerTabs,
  function (v: App) {
    v.component(PanelContainerTabs.name!, PanelContainerTabs);
    registerPanelItemProvider(
      'CONTAINER_TABS',
      () => new PanelContainerTabsProvider(),
    );
  },
);

export default IBizPanelContainerTabs;
