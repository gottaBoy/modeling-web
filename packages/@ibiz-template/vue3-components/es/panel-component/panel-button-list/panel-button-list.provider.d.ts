import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelButtonListController } from './panel-button-list.controller';
/**
 * 面板按钮组适配器
 *
 * @export
 * @class PanelButtonListProvider
 * @implements {IPanelItemProvider}
 */
export declare class PanelButtonListProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelButtonListController>;
}
