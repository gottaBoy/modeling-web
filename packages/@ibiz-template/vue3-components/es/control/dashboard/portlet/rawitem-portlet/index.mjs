import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { RawItemPortlet } from './rawitem-portlet.mjs';
import { RawItemPortletProvider } from './rawitem-portlet.provider.mjs';

"use strict";
const IBizRawItemPortlet = withInstall(
  RawItemPortlet,
  function(v) {
    v.component(RawItemPortlet.name, RawItemPortlet);
    registerPortletProvider("RAWITEM", () => new RawItemPortletProvider());
  }
);

export { IBizRawItemPortlet, RawItemPortlet, IBizRawItemPortlet as default };
