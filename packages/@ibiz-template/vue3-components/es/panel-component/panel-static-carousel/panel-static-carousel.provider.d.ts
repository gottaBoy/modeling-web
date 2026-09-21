import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';
/**
 * 面板静态轮播图适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelStaticCarouselProvider
 * @implements {EditorProvider}
 */
export declare class PanelStaticCarouselProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelRawItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelItemController>;
}
