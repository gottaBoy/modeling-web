import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelRawItemController } from './panel-rawitem.controller';
/**
 * 面板属性适配器
 *
 * @export
 * @class PanelRawItemProvider
 * @implements {IPanelItemProvider}
 */
export declare class PanelRawItemProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelRawItemController>;
}
//# sourceMappingURL=panel-rawitem.provider.d.ts.map