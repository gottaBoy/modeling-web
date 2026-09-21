import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import FormTabPage from './form-tab-page';
import { FormTabPageProvider } from './form-tab-page.provider';

export const IBizFormTabPage = withInstall(FormTabPage, function (v: App) {
  v.component(FormTabPage.name, FormTabPage);
  // 表单关系界面
  registerFormDetailProvider('TABPAGE', () => new FormTabPageProvider());
});

export default IBizFormTabPage;
