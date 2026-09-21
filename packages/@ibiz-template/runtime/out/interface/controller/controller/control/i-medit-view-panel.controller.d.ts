import { IDEMultiEditViewPanel } from '@ibiz/model-core';
import { IMEditViewPanelEvent } from '../../event';
import { IMEditViewPanelState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
/**
 * 多编辑视图面板控制器
 *
 * @export
 * @interface IMEditViewPanelController
 * @extends {IMDControlController<IDEMultiEditViewPanel, IMEditViewPanelState, IMEditViewPanelEvent>}
 */
export interface IMEditViewPanelController<T extends IDEMultiEditViewPanel = IDEMultiEditViewPanel, S extends IMEditViewPanelState = IMEditViewPanelState, E extends IMEditViewPanelEvent = IMEditViewPanelEvent> extends IMDControlController<T, S, E> {
    /**
     * 处理添加
     *
     * @memberof IMEditViewPanelController
     */
    handleAdd(): Promise<void>;
}
//# sourceMappingURL=i-medit-view-panel.controller.d.ts.map