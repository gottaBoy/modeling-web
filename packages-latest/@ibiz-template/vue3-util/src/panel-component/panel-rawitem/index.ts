import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '../../util';
import { PanelRawItem } from './panel-rawitem';
import { PanelRawItemProvider } from './panel-rawitem.provider';

export * from './panel-rawitem.controller';

export const IBizPanelRawItem = withInstall(PanelRawItem, function (v: App) {
  v.component(PanelRawItem.name!, PanelRawItem);
  registerPanelItemProvider('RAWITEM', () => new PanelRawItemProvider());
  registerPanelItemProvider(
    'RAWITEM_STATIC_IMAGE',
    () => new PanelRawItemProvider(),
  );
  registerPanelItemProvider(
    'RAWITEM_STATIC_LABEL',
    () => new PanelRawItemProvider(),
  );
  registerPanelItemProvider(
    'RAWITEM_STATIC_TEXT',
    () => new PanelRawItemProvider(),
  );
});

export default IBizPanelRawItem;
