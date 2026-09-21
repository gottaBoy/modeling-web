import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { FormButtonListProvider } from './form-button-list.provider';
import FormButtonList from './form-button-list';

export const IBizFormButtonList = withInstall(
  FormButtonList,
  function (v: App) {
    v.component(FormButtonList.name, FormButtonList);
    registerFormDetailProvider(
      'BUTTONLIST',
      () => new FormButtonListProvider(),
    );
  },
);

export default IBizFormButtonList;
