import { registerPanelItemProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { PanelField } from './panel-field.mjs';
import { PanelFieldProvider } from './panel-field.provider.mjs';
export { PanelFieldController } from './panel-field.controller.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPanelField = withInstall(PanelField, function(v) {
  v.component(PanelField.name, PanelField);
  registerPanelItemProvider("FIELD", () => new PanelFieldProvider());
});

export { IBizPanelField, IBizPanelField as default };
