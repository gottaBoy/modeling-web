import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelTabPanelController } from './panel-tab-panel.controller';
/**
 * 面板分页面板适配器
 *
 * @export
 * @class PanelTabPanelController
 * @implements {IPanelItemProvider}
 */
export declare class PanelTabPanelProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelTabPanelController>;
}
