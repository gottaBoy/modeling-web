import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormControl } from './form';
import {
  IBizFormButton,
  IBizFormDRUIPart,
  IBizFormGroupPanel,
  IBizFormItem,
  IBizFormPage,
  IBizFormMDCtrl,
  IBizFormRawItem,
  IBizFormTabPanel,
  IBizFormTabPage,
  IBizFormButtonList,
  IBizFormIFrame,
} from '../form-detail';

export const IBizFormControl = withInstall(FormControl, function (v: App) {
  v.component(FormControl.name!, FormControl);
  v.use(IBizFormPage);
  v.use(IBizFormItem);
  v.use(IBizFormGroupPanel);
  v.use(IBizFormButton);
  v.use(IBizFormDRUIPart);
  v.use(IBizFormMDCtrl);
  v.use(IBizFormRawItem);
  v.use(IBizFormTabPanel);
  v.use(IBizFormTabPage);
  v.use(IBizFormButtonList);
  v.use(IBizFormIFrame);
});

export default IBizFormControl;
