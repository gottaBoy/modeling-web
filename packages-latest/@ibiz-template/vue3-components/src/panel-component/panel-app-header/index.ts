import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelAppHeader } from './panel-app-header';
import { PanelAppHeaderProvider } from './panel-app-header.provider';

export const IBizPanelAppHeader = withInstall(
  PanelAppHeader,
  function (v: App) {
    v.component(PanelAppHeader.name, PanelAppHeader);
    registerPanelItemProvider(
      'CONTAINER_AppHeader',
      () => new PanelAppHeaderProvider(),
    );
  },
);

export default IBizPanelAppHeader;
