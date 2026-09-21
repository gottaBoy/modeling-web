import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { PanelTabPage } from './panel-tab-page';
import { PanelTabPageProvider } from './panel-tab-page.provider';
import { withInstall } from '../../util';

export const IBizPanelTabPage = withInstall(PanelTabPage, function (v: App) {
  v.component(PanelTabPage.name!, PanelTabPage);
  registerPanelItemProvider('TABPAGE', () => new PanelTabPageProvider());
});

export default IBizPanelTabPage;
