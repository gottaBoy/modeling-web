import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { PanelCtrlViewPageCaption } from './panel-ctrl-view-page-caption';
import { PanelCtrlViewPageProvider } from './panel-ctrl-view-page-caption.provider';

export const IBizPanelCtrlViewPageCaption = withInstall(
  PanelCtrlViewPageCaption,
  function (v: App) {
    v.component(PanelCtrlViewPageCaption.name!, PanelCtrlViewPageCaption);
    registerPanelItemProvider(
      'CTRLPOS_VIEW_PAGECAPTION',
      () => new PanelCtrlViewPageProvider(),
    );
  },
);

export default IBizPanelCtrlViewPageCaption;
