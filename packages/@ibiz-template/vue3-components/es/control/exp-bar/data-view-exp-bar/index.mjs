import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { DataViewExpBarControl } from './data-view-view-exp-bar.mjs';
import { DataViewExpBarProvider } from './data-view-exp-bar.provider.mjs';

"use strict";
const IBizDataViewExpBarControl = withInstall(
  DataViewExpBarControl,
  function(v) {
    v.component(DataViewExpBarControl.name, DataViewExpBarControl);
    registerControlProvider(
      ControlType.DATA_VIEW_EXPBAR,
      () => new DataViewExpBarProvider()
    );
  }
);

export { IBizDataViewExpBarControl, IBizDataViewExpBarControl as default };
