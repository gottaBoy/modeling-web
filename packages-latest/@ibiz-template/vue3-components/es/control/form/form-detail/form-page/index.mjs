import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormPage } from './form-page.mjs';
import { IBizFormPageItem } from './form-page-item/form-page.item.mjs';
import { FormPageProvider } from './form-page.provider.mjs';

"use strict";
const IBizFormPage = withInstall(FormPage, function(v) {
  v.component(FormPage.name, FormPage);
  v.component(IBizFormPageItem.name, IBizFormPageItem);
  registerFormDetailProvider("FORMPAGE", () => new FormPageProvider());
});

export { IBizFormPage, IBizFormPageItem, IBizFormPage as default };
