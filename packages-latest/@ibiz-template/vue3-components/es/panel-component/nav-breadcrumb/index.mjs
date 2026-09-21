import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { NavBreadcrumb } from './nav-breadcrumb.mjs';
import { NavBreadcrumbProvider } from './nav-breadcrumb.provider.mjs';
export { NavBreadcrumbController } from './nav-breadcrumb.controller.mjs';
export { NavBreadcrumbState } from './nav-breadcrumb.state.mjs';

"use strict";
const IBizNavBreadcrumb = withInstall(NavBreadcrumb, function(v) {
  v.component(NavBreadcrumb.name, NavBreadcrumb);
  registerPanelItemProvider(
    "RAWITEM_NAV_BREADCRUMB",
    () => new NavBreadcrumbProvider()
  );
});

export { IBizNavBreadcrumb, IBizNavBreadcrumb as default };
