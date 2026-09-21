import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { PanelCtrlPos } from './panel-ctrl-pos';
import { PanelCtrlPosProvider } from './panel-ctrl-pos.provider';
import { PanelCtrlPosController } from './panel-ctrl-pos.controller';

export { PanelCtrlPosController };
export const IBizPanelCtrlPos = withInstall(PanelCtrlPos, function (v: App) {
  v.component(PanelCtrlPos.name!, PanelCtrlPos);
  registerPanelItemProvider('CTRLPOS', () => new PanelCtrlPosProvider());
});

export default IBizPanelCtrlPos;
