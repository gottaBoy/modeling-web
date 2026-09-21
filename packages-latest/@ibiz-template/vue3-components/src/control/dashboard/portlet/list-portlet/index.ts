import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ListPortlet } from './list-portlet';
import { ListPortletProvider } from './list-portlet.provider';

export * from './list-portlet';

export const IBizListPortlet = withInstall(ListPortlet, function (v: App) {
  v.component(ListPortlet.name, ListPortlet);
  registerPortletProvider('LIST', () => new ListPortletProvider());
});

export default IBizListPortlet;
