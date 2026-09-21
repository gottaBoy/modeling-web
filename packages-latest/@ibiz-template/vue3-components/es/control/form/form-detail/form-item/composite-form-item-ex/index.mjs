import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { CompositeFormItemExProvider } from './composite-form-item-ex.provider.mjs';
import { CompositeFormItemEx } from './composite-form-item-ex.mjs';

"use strict";
var CompositeFormItemEX = {
  install: (v) => {
    v.component(CompositeFormItemEx.name, CompositeFormItemEx);
    registerFormDetailProvider(
      "FORM_USERCONTROL_COMPOSITE_FORM_ITEM_EX",
      () => new CompositeFormItemExProvider()
    );
  }
};

export { CompositeFormItemEX as default };
