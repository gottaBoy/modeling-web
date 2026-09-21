import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { DRBarControl } from './drbar.mjs';
import { DRBarProvider } from './drbar.provider.mjs';
export { DRBarController } from './drbar.controller.mjs';

"use strict";
const IBizDRBarControl = withInstall(DRBarControl, function(v) {
  v.component(DRBarControl.name, DRBarControl);
  registerControlProvider(ControlType.DRBAR, () => new DRBarProvider());
});

export { IBizDRBarControl, IBizDRBarControl as default };
