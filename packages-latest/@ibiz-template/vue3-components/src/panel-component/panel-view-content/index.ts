import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelViewContent } from './panel-view-content';
import { PanelViewContentProvider } from './panel-view-content.provider';

export const IBizPanelViewContent = withInstall(
  PanelViewContent,
  function (v: App) {
    v.component(PanelViewContent.name, PanelViewContent);
    registerPanelItemProvider(
      'CONTAINER_VIEWCONTENT',
      () => new PanelViewContentProvider(),
    );
  },
);

export default IBizPanelViewContent;
