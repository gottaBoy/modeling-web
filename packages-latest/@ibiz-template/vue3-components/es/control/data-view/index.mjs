import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { DataViewControl } from './data-view.mjs';
import { DataViewControlProvider } from './data-view.provider.mjs';

"use strict";
const IBizDataViewControl = withInstall(
  DataViewControl,
  function(v) {
    v.component(DataViewControl.name, DataViewControl);
    registerControlProvider(
      ControlType.DATAVIEW,
      () => new DataViewControlProvider()
    );
  }
);

export { DataViewControlProvider, IBizDataViewControl, IBizDataViewControl as default };
