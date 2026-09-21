import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { DataViewExpBarControl } from './data-view-view-exp-bar';
import { DataViewExpBarProvider } from './data-view-exp-bar.provider';

export const IBizDataViewExpBarControl = withInstall(
  DataViewExpBarControl,
  function (v: App) {
    v.component(DataViewExpBarControl.name, DataViewExpBarControl);
    registerControlProvider(
      ControlType.DATA_VIEW_EXPBAR,
      () => new DataViewExpBarProvider(),
    );
  },
);

export default IBizDataViewExpBarControl;
