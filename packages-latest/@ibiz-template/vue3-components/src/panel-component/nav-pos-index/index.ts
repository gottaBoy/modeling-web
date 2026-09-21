import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { NavPosIndex } from './nav-pos-index';
import { NavPosIndexProvider } from './nav-pos-index.provider';
import { NavPosIndexState } from './nav-pos-index.state';
import { NavPosIndexController } from './nav-pos-index.controller';

export { NavPosIndexState, NavPosIndexController };

export const IBizNavPosIndex = withInstall(NavPosIndex, function (v: App) {
  v.component(NavPosIndex.name, NavPosIndex);
  registerPanelItemProvider(
    'RAWITEM_NAV_POS_INDEX',
    () => new NavPosIndexProvider(),
  );
});

export default IBizNavPosIndex;
