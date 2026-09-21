import { ITabExpPanel } from '@ibiz/model-core';
import { ITabExpPanelEvent } from '../../event';
import { ITabExpPanelState } from '../../state';
import { IControlController } from './i-control.controller';
/**
 * 分页导航面板
 *
 * @export
 * @interface ITabExpPanelController
 * @extends {IControlController<ITabExpPanel, ITabExpPanelState, ITabExpPanelEvent>}
 */
export interface ITabExpPanelController extends IControlController<ITabExpPanel, ITabExpPanelState, ITabExpPanelEvent> {
    /**
     * 刷新当前页面（会重新计算相关视图参数和上下文）
     * @author lxm
     * @date 2024-03-18 05:03:35
     */
    refresh(): void;
}
//# sourceMappingURL=i-tab-exp-panel.controller.d.ts.map