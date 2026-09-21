import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
/**
 * 多项数据容器适配器
 *
 * @author zzq
 * @date 2024-09-09 16:04:27
 * @export
 * @class MultiDataContainerProvider
 * @implements {EditorProvider}
 */
export declare class MultiDataContainerRawProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelContainer, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
//# sourceMappingURL=multi-data-container-raw.provider.d.ts.map