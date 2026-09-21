import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { ScrollContainerController } from './scroll-container.controller';
/**
 * 面板滚动条容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class ScrollContainerProvider
 * @implements {EditorProvider}
 */
export declare class ScrollContainerProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelContainer, panel: PanelController, parent: PanelItemController | undefined): Promise<ScrollContainerController>;
}
//# sourceMappingURL=scroll-container.provider.d.ts.map