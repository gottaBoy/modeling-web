import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ActionBarPortlet } from './actionbar-portlet.mjs';
import { ActionBarPortletProvider } from './actionbar-portlet.provider.mjs';

"use strict";
const IBizActionBarPortlet = withInstall(
  ActionBarPortlet,
  function(v) {
    v.component(ActionBarPortlet.name, ActionBarPortlet);
    registerPortletProvider("ACTIONBAR", () => new ActionBarPortletProvider());
  }
);

export { ActionBarPortlet, IBizActionBarPortlet, IBizActionBarPortlet as default };
