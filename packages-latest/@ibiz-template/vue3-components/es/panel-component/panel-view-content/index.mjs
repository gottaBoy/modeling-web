import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelViewContent } from './panel-view-content.mjs';
import { PanelViewContentProvider } from './panel-view-content.provider.mjs';

"use strict";
const IBizPanelViewContent = withInstall(
  PanelViewContent,
  function(v) {
    v.component(PanelViewContent.name, PanelViewContent);
    registerPanelItemProvider(
      "CONTAINER_VIEWCONTENT",
      () => new PanelViewContentProvider()
    );
  }
);

export { IBizPanelViewContent, IBizPanelViewContent as default };
