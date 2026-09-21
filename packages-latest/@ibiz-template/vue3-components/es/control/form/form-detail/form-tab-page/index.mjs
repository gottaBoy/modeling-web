import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormTabPage } from './form-tab-page.mjs';
import { FormTabPageProvider } from './form-tab-page.provider.mjs';

"use strict";
const IBizFormTabPage = withInstall(FormTabPage, function(v) {
  v.component(FormTabPage.name, FormTabPage);
  registerFormDetailProvider("TABPAGE", () => new FormTabPageProvider());
});

export { IBizFormTabPage, IBizFormTabPage as default };
