import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { NavPosIndexController } from './nav-pos-index.controller';
/**
 * 导航占位适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class NavPosIndexProvider
 * @implements {EditorProvider}
 */
export declare class NavPosIndexProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<NavPosIndexController>;
}
