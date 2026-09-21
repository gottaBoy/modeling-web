import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { EditFormProvider } from './edit-form.provider.mjs';
import { EditFormControl } from './edit-form.mjs';

"use strict";
const IBizEditFormControl = withInstall(
  EditFormControl,
  function(v) {
    v.component(EditFormControl.name, EditFormControl);
    registerControlProvider(ControlType.FORM, () => new EditFormProvider());
  }
);

export { IBizEditFormControl, IBizEditFormControl as default };
