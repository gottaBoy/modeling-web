import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormDRUIPart } from './form-druipart.mjs';
import { FormDRUIPartProvider } from './form-druipart.provider.mjs';

"use strict";
const IBizFormDRUIPart = withInstall(FormDRUIPart, function(v) {
  v.component(FormDRUIPart.name, FormDRUIPart);
  registerFormDetailProvider("DRUIPART", () => new FormDRUIPartProvider());
});

export { IBizFormDRUIPart, IBizFormDRUIPart as default };
