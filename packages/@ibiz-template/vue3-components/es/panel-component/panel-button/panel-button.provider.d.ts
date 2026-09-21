import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelButtonController } from './panel-button.controller';
/**
 * 面板按钮适配器
 *
 * @export
 * @class PanelButtonProvider
 * @implements {IPanelItemProvider}
 */
export declare class PanelButtonProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelButtonController>;
}
