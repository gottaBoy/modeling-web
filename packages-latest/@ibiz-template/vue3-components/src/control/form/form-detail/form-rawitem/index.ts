import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import FormRawItem from './form-rawitem';
import { FormRawItemProvider } from './form-rawitem.provider';

export const IBizFormRawItem = withInstall(FormRawItem, function (v: App) {
  v.component(FormRawItem.name, FormRawItem);
  // 表单直接内容
  registerFormDetailProvider('RAWITEM', () => new FormRawItemProvider());
});

export default IBizFormRawItem;
