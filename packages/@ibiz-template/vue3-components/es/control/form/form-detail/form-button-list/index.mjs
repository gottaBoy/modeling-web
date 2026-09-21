import { withInstall } from '@ibiz-template/vue3-util';
import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { FormButtonListProvider } from './form-button-list.provider.mjs';
import { FormButtonList } from './form-button-list.mjs';

"use strict";
const IBizFormButtonList = withInstall(
  FormButtonList,
  function(v) {
    v.component(FormButtonList.name, FormButtonList);
    registerFormDetailProvider(
      "BUTTONLIST",
      () => new FormButtonListProvider()
    );
  }
);

export { IBizFormButtonList, IBizFormButtonList as default };
