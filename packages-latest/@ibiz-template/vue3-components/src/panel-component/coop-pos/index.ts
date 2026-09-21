import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { CoopPos } from './coop-pos';
import { CoopPosProvider } from './coop-pos.provider';
import { CoopPosState } from './coop-pos.state';
import { CoopPosController } from './coop-pos.controller';

export { CoopPosState, CoopPosController };

export const IBizCoopPos = withInstall(CoopPos, function (v: App) {
  v.component(CoopPos.name, CoopPos);
  registerPanelItemProvider('RAWITEM_COOP_POS', () => new CoopPosProvider());
});

export default IBizCoopPos;
