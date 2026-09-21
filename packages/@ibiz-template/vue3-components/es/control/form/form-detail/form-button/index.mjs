import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormButton } from './form-button.mjs';
import { FormButtonProvider } from './form-button.provider.mjs';

"use strict";
const IBizFormButton = withInstall(FormButton, function(v) {
  v.component(FormButton.name, FormButton);
  registerFormDetailProvider("BUTTON", () => new FormButtonProvider());
});

export { IBizFormButton, IBizFormButton as default };
