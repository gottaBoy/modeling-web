import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import FormDRUIPart from './form-druipart';
import { FormDRUIPartProvider } from './form-druipart.provider';

export const IBizFormDRUIPart = withInstall(FormDRUIPart, function (v: App) {
  v.component(FormDRUIPart.name, FormDRUIPart);
  // 表单关系界面
  registerFormDetailProvider('DRUIPART', () => new FormDRUIPartProvider());
});

export default IBizFormDRUIPart;
