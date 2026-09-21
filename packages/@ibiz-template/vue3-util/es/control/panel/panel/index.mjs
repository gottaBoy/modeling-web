import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { PanelControl } from './panel.mjs';
import { PanelProvider } from './panel.provider.mjs';
import '../../../util/index.mjs';
import { withInstall } from '../../../util/install.mjs';

"use strict";
const IBizPanelControl = withInstall(PanelControl, function(v) {
  v.component(PanelControl.name, PanelControl);
  registerControlProvider(ControlType.PANEL, () => new PanelProvider());
});

export { IBizPanelControl, IBizPanelControl as default };
