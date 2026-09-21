import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '../../util';
import { NavPos } from './nav-pos';
import { NavPosProvider } from './nav-pos.provider';
import { NavPosState } from './nav-pos.state';
import { NavPosController } from './nav-pos.controller';

export { NavPosState, NavPosController };

export const IBizNavPos = withInstall(NavPos, function (v: App) {
  v.component(NavPos.name!, NavPos);
  registerPanelItemProvider('RAWITEM_NAV_POS', () => new NavPosProvider());
});

export default IBizNavPos;
