import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelFieldController } from './panel-field.controller';
/**
 * 面板属性适配器
 *
 * @export
 * @class PanelFieldProvider
 * @implements {IPanelItemProvider}
 */
export declare class PanelFieldProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelItem, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelFieldController>;
}
//# sourceMappingURL=panel-field.provider.d.ts.map