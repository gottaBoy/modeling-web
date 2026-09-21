import { registerFormDetailProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import FormGroupPanel from './form-group-panel';
import { FormGroupPanelProvider } from './form-group-panel.provider';

export const IBizFormGroupPanel = withInstall(
  FormGroupPanel,
  function (v: App) {
    v.component(FormGroupPanel.name, FormGroupPanel);
    // 表单分组
    registerFormDetailProvider(
      'GROUPPANEL',
      () => new FormGroupPanelProvider(),
    );
  },
);

export default IBizFormGroupPanel;
