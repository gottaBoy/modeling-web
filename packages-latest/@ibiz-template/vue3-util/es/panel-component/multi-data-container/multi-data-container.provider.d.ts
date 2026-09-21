import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
/**
 * 多项数据容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class MultiDataContainerProvider
 * @implements {EditorProvider}
 */
export declare class MultiDataContainerProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelContainer, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
//# sourceMappingURL=multi-data-container.provider.d.ts.map