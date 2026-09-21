import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { NavBreadcrumb } from './nav-breadcrumb';
import { NavBreadcrumbProvider } from './nav-breadcrumb.provider';

export * from './nav-breadcrumb.controller';
export * from './nav-breadcrumb.state';

export const IBizNavBreadcrumb = withInstall(NavBreadcrumb, function (v: App) {
  v.component(NavBreadcrumb.name, NavBreadcrumb);
  registerPanelItemProvider(
    'RAWITEM_NAV_BREADCRUMB',
    () => new NavBreadcrumbProvider(),
  );
});

export default IBizNavBreadcrumb;
