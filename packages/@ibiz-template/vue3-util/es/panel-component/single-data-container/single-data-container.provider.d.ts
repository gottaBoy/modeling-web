import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
/**
 * 单项数据容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class SingleDataContainerProvider
 * @implements {EditorProvider}
 */
export declare class SingleDataContainerProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelContainer, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
//# sourceMappingURL=single-data-container.provider.d.ts.map