import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
/**
 * 消息通知适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class UserMessageProvider
 * @implements {EditorProvider}
 */
export declare class UserMessageProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
