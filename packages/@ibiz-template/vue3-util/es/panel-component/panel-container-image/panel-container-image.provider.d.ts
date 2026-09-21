import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
/**
 * 面板图片容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelContainerImageProvider
 * @implements {EditorProvider}
 */
export declare class PanelContainerImageProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelContainer, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
//# sourceMappingURL=panel-container-image.provider.d.ts.map