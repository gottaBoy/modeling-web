import { IPanelItemNavPosController, IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
/**
 * 导航占位适配器
 *
 * @export
 * @class NavPosProvider
 * @implements {IPanelItemProvider}
 */
export declare class NavPosProvider implements IPanelItemProvider {
    component: string;
    /**
     * 创建控制器
     *
     * @param {IPanelItem} panelItem
     * @param {PanelController} panel
     * @param {(PanelItemController | undefined)} parent
     * @return {*}  {Promise<IPanelItemNavPosController>}
     * @memberof NavPosProvider
     */
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<IPanelItemNavPosController>;
}
//# sourceMappingURL=nav-pos.provider.d.ts.map