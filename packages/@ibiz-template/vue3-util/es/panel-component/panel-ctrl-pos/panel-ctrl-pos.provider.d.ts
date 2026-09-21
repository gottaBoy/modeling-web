import { IPanelItemProvider, PanelController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelCtrlPos } from '@ibiz/model-core';
import { PanelCtrlPosController } from './panel-ctrl-pos.controller';
/**
 * 面板控件占位适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelCtrlPosProvider
 * @implements {EditorProvider}
 */
export declare class PanelCtrlPosProvider implements IPanelItemProvider {
    component: string;
    createController(panelItem: IPanelCtrlPos, panel: PanelController, parent: PanelItemController | undefined): Promise<PanelCtrlPosController>;
}
//# sourceMappingURL=panel-ctrl-pos.provider.d.ts.map