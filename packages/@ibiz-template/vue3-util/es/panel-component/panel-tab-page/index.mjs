import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { PanelTabPage } from './panel-tab-page.mjs';
import { PanelTabPageProvider } from './panel-tab-page.provider.mjs';
import '../../util/index.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelTabPage = withInstall(PanelTabPage, function(v) {
  v.component(PanelTabPage.name, PanelTabPage);
  registerPanelItemProvider("TABPAGE", () => new PanelTabPageProvider());
});

export { IBizPanelTabPage, IBizPanelTabPage as default };
