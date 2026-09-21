import { registerPortletProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { HtmlPortlet } from './html-portlet.mjs';
import { HtmlPortletProvider } from './html-portlet.provider.mjs';

"use strict";
const IBizHtmlPortlet = withInstall(HtmlPortlet, function(v) {
  v.component(HtmlPortlet.name, HtmlPortlet);
  registerPortletProvider("HTML", () => new HtmlPortletProvider());
});

export { HtmlPortlet, IBizHtmlPortlet, IBizHtmlPortlet as default };
