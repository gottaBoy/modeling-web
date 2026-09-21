import { IViewLayoutPanel } from '@ibiz/model-core';
import { IViewLayoutPanelEvent } from '../../event';
import { IViewLayoutPanelState } from '../../state';
import { IPanelController } from './i-panel.controller';
/**
 * 视图布局面板控制器
 * @author lxm
 * @date 2023-05-04 03:03:38
 * @export
 * @interface IViewLayoutPanelController
 * @extends {IPanelController}
 */
export interface IViewLayoutPanelController extends IPanelController<IViewLayoutPanel, IViewLayoutPanelState, IViewLayoutPanelEvent> {
}
//# sourceMappingURL=i-view-layout-panel.controller.d.ts.map