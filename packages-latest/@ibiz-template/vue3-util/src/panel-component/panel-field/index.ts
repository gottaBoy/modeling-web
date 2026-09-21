import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '../../util';
import { PanelField } from './panel-field';
import { PanelFieldProvider } from './panel-field.provider';

export * from './panel-field.controller';

export const IBizPanelField = withInstall(PanelField, function (v: App) {
  v.component(PanelField.name!, PanelField);
  registerPanelItemProvider('FIELD', () => new PanelFieldProvider());
});

export default IBizPanelField;
