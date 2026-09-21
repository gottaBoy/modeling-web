import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
/**
 * 面板首页搜索适配器
 *
 * @export
 * @class PanelIndexViewSearchProvider
 * @implements {IPanelItemProvider}
 */
export declare class PanelIndexViewSearchProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
