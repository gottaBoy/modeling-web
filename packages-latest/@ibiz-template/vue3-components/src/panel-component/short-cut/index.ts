import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { ShortCut } from './short-cut';
import { ShortCutProvider } from './short-cut.provider';

export const IBizShortCut = withInstall(ShortCut, function (v: App) {
  v.component(ShortCut.name, ShortCut);
  registerPanelItemProvider('RAWITEM_SHORTCUT', () => new ShortCutProvider());
});

export default IBizShortCut;
