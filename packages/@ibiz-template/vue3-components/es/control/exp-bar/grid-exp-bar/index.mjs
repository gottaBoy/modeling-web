import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { GridExpBarControl } from './grid-exp-bar.mjs';
import { GridExpBarProvider } from './grid-exp-bar.provider.mjs';

"use strict";
const IBizGridExpBarControl = withInstall(
  GridExpBarControl,
  function(v) {
    v.component(GridExpBarControl.name, GridExpBarControl);
    registerControlProvider(
      ControlType.GRID_EXPBAR,
      () => new GridExpBarProvider()
    );
  }
);

export { IBizGridExpBarControl, IBizGridExpBarControl as default };
