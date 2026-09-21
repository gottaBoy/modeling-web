import { ControlController } from '../../common';
/**
 * @description 视图面板控制器
 * @export
 * @class ViewPanelController
 * @extends {ControlController<IDEViewPanel, IViewPanelState, IViewPanelEvent>}
 * @implements {IViewPanelController}
 */
export class ViewPanelController extends ControlController {
    /**
     * @description 设置嵌入视图
     * @param {IViewController} view 嵌入视图控制器
     * @memberof ViewPanelController
     */
    setEmbedView(view) {
        this.embedView = view;
    }
}
