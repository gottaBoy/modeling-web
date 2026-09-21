import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormItem } from './form-item.mjs';
import { IBizFormItemContainer } from './form-item-container/form-item-container.mjs';
import { FormItemProvider } from './form-item.provider.mjs';

"use strict";
const IBizFormItem = withInstall(FormItem, function(v) {
  v.component(FormItem.name, FormItem);
  v.component(IBizFormItemContainer.name, IBizFormItemContainer);
  registerFormDetailProvider("FORMITEM", () => new FormItemProvider());
});

export { IBizFormItem, IBizFormItemContainer, IBizFormItem as default };
