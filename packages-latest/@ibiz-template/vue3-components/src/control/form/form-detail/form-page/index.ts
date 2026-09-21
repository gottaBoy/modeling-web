import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import FormPage from './form-page';
import { IBizFormPageItem } from './form-page-item/form-page.item';
import { FormPageProvider } from './form-page.provider';

export * from './form-page-item/form-page.item';

export const IBizFormPage = withInstall(FormPage, function (v: App) {
  v.component(FormPage.name, FormPage);
  v.component(IBizFormPageItem.name, IBizFormPageItem);
  // 表单分页
  registerFormDetailProvider('FORMPAGE', () => new FormPageProvider());
});

export default IBizFormPage;
