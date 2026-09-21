import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { DataViewControl } from './data-view';
import { DataViewControlProvider } from './data-view.provider';

export * from './data-view.provider';

export const IBizDataViewControl = withInstall(
  DataViewControl,
  function (v: App) {
    v.component(DataViewControl.name, DataViewControl);
    registerControlProvider(
      ControlType.DATAVIEW,
      () => new DataViewControlProvider(),
    );
  },
);

export default IBizDataViewControl;
