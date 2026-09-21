import { ControlVO } from '../../../../service';
import { IMDControlState } from './i-md-control.state';
export interface IPanelUiItem {
    id: string;
    context: IData;
    params: IData;
    data: ControlVO;
    srfmajortext: string;
}
/**
 * 多编辑视图面板部件状态
 *
 * @export
 * @interface IMEditViewPanelState
 * @extends {IMDControlState}
 */
export interface IMEditViewPanelState extends IMDControlState {
    /**
     * 编辑视图面板部件UI数据集合
     * @type {IPanelUiItem[]}
     */
    panelUiItems: IPanelUiItem[];
    /**
     * 当前激活分页（上分页时启用）
     *
     */
    activeTab: string;
    /**
     * 是否需要滚动
     *
     */
    isNeedScroll: boolean;
}
//# sourceMappingURL=i-medit-view-panel.state.d.ts.map