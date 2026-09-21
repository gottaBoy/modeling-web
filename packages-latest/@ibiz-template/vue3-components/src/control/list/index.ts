import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ListControl } from './list';
import { ListProvider } from './list.provider';

export const IBizListControl = withInstall(ListControl, function (v: App) {
  v.component(ListControl.name, ListControl);
  registerControlProvider(ControlType.LIST, () => new ListProvider());
});

export default IBizListControl;
