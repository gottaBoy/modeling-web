import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { ScrollContainerItemController } from './scroll-container-item.controller';
/**
 * 面板滚动条容器项适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class ScrollContainerItemProvider
 * @implements {EditorProvider}
 */
export declare class ScrollContainerItemProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelContainer, panel: PanelController, parent: PanelItemController | undefined): Promise<ScrollContainerItemController>;
}
//# sourceMappingURL=scroll-container-item.provider.d.ts.map