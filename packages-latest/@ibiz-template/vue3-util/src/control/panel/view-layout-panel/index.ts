import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { App } from 'vue';
import { ViewLayoutPanelControl } from './view-layout-panel';
import { ViewLayoutPanelProvider } from './view-layout-panel.provider';
import { withInstall } from '../../../util';

export const IBizViewLayoutPanelControl = withInstall(
  ViewLayoutPanelControl,
  function (v: App) {
    v.component(ViewLayoutPanelControl.name!, ViewLayoutPanelControl);
    registerControlProvider(
      ControlType.VIEW_LAYOUT_PANEL,
      () => new ViewLayoutPanelProvider(),
    );
  },
);

export default IBizViewLayoutPanelControl;
