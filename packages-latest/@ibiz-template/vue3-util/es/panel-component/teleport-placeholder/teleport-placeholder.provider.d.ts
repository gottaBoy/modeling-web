import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelCtrlPos } from '@ibiz/model-core';
import { TeleportPlaceholderController } from './teleport-placeholder.controller';
/**
 * 面板控件teleport占位适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class TeleportPlaceholderProvider
 * @implements {EditorProvider}
 */
export declare class TeleportPlaceholderProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelCtrlPos, panel: PanelController, parent: PanelItemController | undefined): Promise<TeleportPlaceholderController>;
}
//# sourceMappingURL=teleport-placeholder.provider.d.ts.map