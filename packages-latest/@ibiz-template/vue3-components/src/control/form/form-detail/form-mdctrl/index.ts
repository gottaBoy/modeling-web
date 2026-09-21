import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import FormMDCtrl from './form-mdctrl';
import { FormMDCtrlForm } from './form-mdctrl-form/form-mdctrl-form';
import { FormMDCtrlMD } from './form-mdctrl-md/form-mdctrl-md';
import { FormMDCtrlRepeater } from './form-mdctrl-repeater/form-mdctrl-repeater';
import { FormMDCtrlProvider } from './form-mdctrl.provider';
import { MDCtrlContainer } from './mdctrl-container/mdctrl-container';
import { MDCtrlContainer2 } from './mdctrl-container2/mdctrl-container2';

export const IBizFormMDCtrl = withInstall(FormMDCtrl, function (v: App) {
  v.component(FormMDCtrl.name, FormMDCtrl);
  v.component(FormMDCtrlForm.name, FormMDCtrlForm);
  v.component(FormMDCtrlMD.name, FormMDCtrlMD);
  v.component(FormMDCtrlRepeater.name, FormMDCtrlRepeater);
  v.component(MDCtrlContainer.name, MDCtrlContainer);
  v.component(MDCtrlContainer2.name, MDCtrlContainer2);
  registerFormDetailProvider('MDCTRL', () => new FormMDCtrlProvider());
});

export default IBizFormMDCtrl;
