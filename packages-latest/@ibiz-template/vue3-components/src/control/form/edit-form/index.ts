import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { EditFormProvider } from './edit-form.provider';
import { EditFormControl } from './edit-form';

export const IBizEditFormControl: ReturnType<typeof withInstall> = withInstall(
  EditFormControl,
  function (v: App) {
    v.component(EditFormControl.name!, EditFormControl);
    registerControlProvider(ControlType.FORM, () => new EditFormProvider());
  },
);

export default IBizEditFormControl;
