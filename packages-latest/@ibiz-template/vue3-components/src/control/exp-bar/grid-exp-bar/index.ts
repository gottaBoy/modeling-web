import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { GridExpBarControl } from './grid-exp-bar';
import { GridExpBarProvider } from './grid-exp-bar.provider';

export const IBizGridExpBarControl = withInstall(
  GridExpBarControl,
  function (v: App) {
    v.component(GridExpBarControl.name, GridExpBarControl);
    registerControlProvider(
      ControlType.GRID_EXPBAR,
      () => new GridExpBarProvider(),
    );
  },
);

export default IBizGridExpBarControl;
