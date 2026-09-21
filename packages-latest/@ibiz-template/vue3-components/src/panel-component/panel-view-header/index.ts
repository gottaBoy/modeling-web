import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelViewHeader } from './panel-view-header';
import { PanelViewHeaderProvider } from './panel-view-header.provider';

export const IBizPanelViewHeader = withInstall(
  PanelViewHeader,
  function (v: App) {
    v.component(PanelViewHeader.name, PanelViewHeader);
    registerPanelItemProvider(
      'CONTAINER_ViewHeader',
      () => new PanelViewHeaderProvider(),
    );
  },
);

export default IBizPanelViewHeader;
