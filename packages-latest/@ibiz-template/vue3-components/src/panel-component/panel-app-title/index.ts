import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import PanelAppTitle from './panel-app-title';
import { PanelAppTitleProvider } from './panel-app-title.provider';

export * from './panel-app-title.controller';

export const IBizPanelAppTitle = withInstall(PanelAppTitle, function (v: App) {
  v.component(PanelAppTitle.name, PanelAppTitle);
  registerPanelItemProvider(
    'RAWITEM_APP_APPTITLE',
    () => new PanelAppTitleProvider(),
  );
  registerPanelItemProvider(
    'CTRLPOS_APP_APPTITLE',
    () => new PanelAppTitleProvider(),
  );
});

export default IBizPanelAppTitle;
