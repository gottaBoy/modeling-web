import { IPanelItemProvider, PanelContainerController, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
/**
 * 面板容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelContainerProvider
 * @implements {EditorProvider}
 */
export declare class PanelContainerProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelContainer, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelContainerController>;
}
//# sourceMappingURL=panel-container.provider.d.ts.map