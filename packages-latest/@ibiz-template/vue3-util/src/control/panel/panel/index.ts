import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { App } from 'vue';
import { PanelControl } from './panel';
import { PanelProvider } from './panel.provider';
import { withInstall } from '../../../util';

export const IBizPanelControl = withInstall(PanelControl, function (v: App) {
  v.component(PanelControl.name!, PanelControl);
  registerControlProvider(ControlType.PANEL, () => new PanelProvider());
});

export default IBizPanelControl;
