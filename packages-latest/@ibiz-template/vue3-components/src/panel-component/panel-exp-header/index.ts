import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelExpHeader } from './panel-exp-header';
import { PanelExpHeaderProvider } from './panel-exp-header.provider';

export const IBizPanelExpHeader = withInstall(
  PanelExpHeader,
  function (v: App) {
    v.component(PanelExpHeader.name, PanelExpHeader);
    registerPanelItemProvider(
      'CONTAINER_Exp_Header',
      () => new PanelExpHeaderProvider(),
    );
  },
);

export default IBizPanelExpHeader;
