import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { ViewLayoutPanelControl } from './view-layout-panel.mjs';
import { ViewLayoutPanelProvider } from './view-layout-panel.provider.mjs';
import '../../../util/index.mjs';
import { withInstall } from '../../../util/install.mjs';

"use strict";
const IBizViewLayoutPanelControl = withInstall(
  ViewLayoutPanelControl,
  function(v) {
    v.component(ViewLayoutPanelControl.name, ViewLayoutPanelControl);
    registerControlProvider(
      ControlType.VIEW_LAYOUT_PANEL,
      () => new ViewLayoutPanelProvider()
    );
  }
);

export { IBizViewLayoutPanelControl, IBizViewLayoutPanelControl as default };
