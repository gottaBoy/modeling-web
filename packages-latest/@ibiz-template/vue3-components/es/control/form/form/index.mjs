import { withInstall } from '@ibiz-template/vue3-util';
import { FormControl } from './form.mjs';
import '../form-detail/index.mjs';
import { IBizFormPage } from '../form-detail/form-page/index.mjs';
import { IBizFormItem } from '../form-detail/form-item/index.mjs';
import { IBizFormGroupPanel } from '../form-detail/form-group-panel/index.mjs';
import { IBizFormButton } from '../form-detail/form-button/index.mjs';
import { IBizFormDRUIPart } from '../form-detail/form-druipart/index.mjs';
import { IBizFormMDCtrl } from '../form-detail/form-mdctrl/index.mjs';
import { IBizFormRawItem } from '../form-detail/form-rawitem/index.mjs';
import { IBizFormTabPanel } from '../form-detail/form-tab-panel/index.mjs';
import { IBizFormTabPage } from '../form-detail/form-tab-page/index.mjs';
import { IBizFormButtonList } from '../form-detail/form-button-list/index.mjs';
import { IBizFormIFrame } from '../form-detail/form-iframe/index.mjs';

"use strict";
const IBizFormControl = withInstall(FormControl, function(v) {
  v.component(FormControl.name, FormControl);
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

export { IBizFormControl, IBizFormControl as default };
