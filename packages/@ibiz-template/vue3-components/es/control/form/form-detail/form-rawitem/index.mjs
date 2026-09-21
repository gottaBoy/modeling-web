import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormRawItem } from './form-rawitem.mjs';
import { FormRawItemProvider } from './form-rawitem.provider.mjs';

"use strict";
const IBizFormRawItem = withInstall(FormRawItem, function(v) {
  v.component(FormRawItem.name, FormRawItem);
  registerFormDetailProvider("RAWITEM", () => new FormRawItemProvider());
});

export { IBizFormRawItem, IBizFormRawItem as default };
