import { IPanelContainer, IViewLayoutPanel } from '@ibiz/model-core';
import { IViewLayoutPanelState, IViewLayoutPanelEvent, IViewLayoutPanelController } from '../../../../interface';
import { PanelController } from '../panel/panel.controller';
/**
 * 视图布局面板部件控制器
 *
 * @author lxm
 * @date 2022-09-08 20:09:55
 * @export
 * @class ViewLayoutPanelController
 * @extends {ControlController<ViewLayoutPanelModel>}
 */
export declare class ViewLayoutPanelController extends PanelController<IViewLayoutPanel, IViewLayoutPanelState, IViewLayoutPanelEvent> implements IViewLayoutPanelController {
    protected onCreated(): Promise<void>;
    protected registerToCtx(): void;
    /**
     * 预处理面板模型
     * @author lxm
     * @date 2023-06-27 06:57:57
     * @param {IPanelContainer} [container]
     */
    preprocessModel(container?: IPanelContainer): void;
}
//# sourceMappingURL=view-layout-panel.controller.d.ts.map