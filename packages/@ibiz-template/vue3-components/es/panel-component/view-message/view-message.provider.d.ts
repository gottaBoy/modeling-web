import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
/**
 * 预置视图消息适配器
 *
 * @author zk
 * @date 2024-01-25 02:01:01
 * @export
 * @class ViewMessageProvider
 * @implements {IPanelItemProvider}
 */
export declare class ViewMessageProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
