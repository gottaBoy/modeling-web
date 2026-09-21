import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { DRTabControl } from './drtab.mjs';
import { DRTabProvider } from './drtab.provider.mjs';
export { DRTabController } from './drtab.controller.mjs';

"use strict";
const IBizDRTabControl = withInstall(DRTabControl, function(v) {
  v.component(DRTabControl.name, DRTabControl);
  registerControlProvider(ControlType.DRTAB, () => new DRTabProvider());
});

export { IBizDRTabControl, IBizDRTabControl as default };
