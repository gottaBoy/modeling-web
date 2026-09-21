import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { FilterPortlet } from './filter-portlet';
import { FilterPortletProvider } from './filter-portlet.provider';
import { IBizFilterPortletDesign } from './filter-portlet-design/filter-portlet-design';

export * from './filter-portlet';

export const IBizFilterPortlet = withInstall(FilterPortlet, function (v: App) {
  v.component(FilterPortlet.name!, FilterPortlet);
  v.component(IBizFilterPortletDesign.name!, IBizFilterPortletDesign);
  registerPortletProvider('FILTER', () => new FilterPortletProvider());
});

export default IBizFilterPortlet;
