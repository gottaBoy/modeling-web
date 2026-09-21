import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import FormButton from './form-button';
import { FormButtonProvider } from './form-button.provider';

export const IBizFormButton = withInstall(FormButton, function (v: App) {
  v.component(FormButton.name, FormButton);
  // 表单按钮
  registerFormDetailProvider('BUTTON', () => new FormButtonProvider());
});

export default IBizFormButton;
