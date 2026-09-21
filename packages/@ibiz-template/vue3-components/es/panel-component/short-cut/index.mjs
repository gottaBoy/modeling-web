import { withInstall } from '@ibiz-template/vue3-util';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { ShortCut } from './short-cut.mjs';
import { ShortCutProvider } from './short-cut.provider.mjs';

"use strict";
const IBizShortCut = withInstall(ShortCut, function(v) {
  v.component(ShortCut.name, ShortCut);
  registerPanelItemProvider("RAWITEM_SHORTCUT", () => new ShortCutProvider());
});

export { IBizShortCut, IBizShortCut as default };
