import { IPanelItemProvider, PanelContainerController, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
/**
 * 面板分页适配器
 *
 * @export
 * @class PanelTabPageController
 * @implements {IPanelItemProvider}
 */
export declare class PanelTabPageProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelContainerController>;
}
//# sourceMappingURL=panel-tab-page.provider.d.ts.map