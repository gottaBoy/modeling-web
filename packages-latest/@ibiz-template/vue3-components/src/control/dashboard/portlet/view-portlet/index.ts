import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ViewPortlet } from './view-portlet';
import { ViewPortletProvider } from './view-portlet.provider';

export * from './view-portlet';

export const IBizViewPortlet = withInstall(ViewPortlet, function (v: App) {
  v.component(ViewPortlet.name, ViewPortlet);
  // 门户视图
  registerPortletProvider('VIEW', () => new ViewPortletProvider());
});

export default IBizViewPortlet;
