import { IControlState } from './i-control.state';
/**
 * 选择视图面板UI状态
 *
 * @export
 * @interface IPickupViewPanelState
 * @extends {IControlState}
 */
export interface IPickupViewPanelState extends IControlState {
    /**
     * 单选
     *
     * @type {boolean}
     * @memberof IPickupViewPanelState
     */
    singleSelect: boolean;
    /**
     * 多数据部件激活模式
     * @description 值模式 [应用表格数据激活模式] {0：无、 1：单击、 2：双击 }
     * @author lxm
     * @date 2023-05-22 09:52:44
     * @type {(number | 0 | 1 | 2)}
     */
    mdctrlActiveMode: number | 0 | 1 | 2;
    /**
     * 嵌入选择视图的上下文
     *
     * @type {IContext}
     * @memberof IPickupViewPanelState
     */
    context: IContext;
    /**
     * 嵌入选择视图的视图参数
     *
     * @type {IParams}
     * @memberof IPickupViewPanelState
     */
    params: IParams;
}
//# sourceMappingURL=i-pickup-view-panel.state.d.ts.map