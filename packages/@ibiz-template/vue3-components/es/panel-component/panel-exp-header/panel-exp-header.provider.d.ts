import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
/**
 * 导航部件视图 header 区呈现容器
 *
 * @author chitanda
 * @date 2023-08-23 22:08:54
 * @export
 * @class PanelExpHeaderProvider
 * @implements {IPanelItemProvider}
 */
export declare class PanelExpHeaderProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelContainer, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
