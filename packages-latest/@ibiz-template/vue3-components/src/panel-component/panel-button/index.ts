import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import PanelButton from './panel-button';
import { PanelButtonProvider } from './panel-button.provider';

export * from './panel-button.controller';

export const IBizPanelButton = withInstall(PanelButton, function (v: App) {
  v.component(PanelButton.name, PanelButton);
  registerPanelItemProvider('BUTTON', () => new PanelButtonProvider());
});

export default IBizPanelButton;
