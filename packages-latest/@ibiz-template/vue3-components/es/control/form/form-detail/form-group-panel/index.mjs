import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { FormGroupPanel } from './form-group-panel.mjs';
import { FormGroupPanelProvider } from './form-group-panel.provider.mjs';

"use strict";
const IBizFormGroupPanel = withInstall(
  FormGroupPanel,
  function(v) {
    v.component(FormGroupPanel.name, FormGroupPanel);
    registerFormDetailProvider(
      "GROUPPANEL",
      () => new FormGroupPanelProvider()
    );
  }
);

export { IBizFormGroupPanel, IBizFormGroupPanel as default };
