import { ViewMode } from '../../../../constant';
import { IButtonContainerState, IIcon } from '../../common';
import { IControlState } from './i-control.state';
export interface IToolbarState extends IControlState {
    /**
     * 工具栏按钮状态
     *
     * @type {(IButtonContainerState | null)}
     * @memberof PortletPartState
     */
    buttonsState: IButtonContainerState;
    /**
     * 视图模式
     * @author lxm
     * @date 2023-04-27 01:09:22
     * @type {ViewMode}
     */
    viewMode: ViewMode;
    /**
     * 额外按钮集合
     * @author lxm
     * @date 2023-06-09 06:17:29
     * @type {ExtraButtons}
     */
    extraButtons: IExtraButtons;
    /**
     * 手动计算按钮状态（工具栏自身默认不计算）
     * @author lxm
     * @date 2024-02-05 06:02:49
     * @type {boolean}
     */
    manualCalcButtonState: boolean;
    /**
     * 隐藏分隔符数组
     *
     * @type {string[]}
     * @memberof IToolbarState
     */
    hideSeparator: string[];
    /**
     * 计数器数据
     * @author ljx
     * @date 2024-12-11 17:09:22
     * @type {IData}
     * @memberof IToolbarState
     */
    counterData: IData;
}
/**
 * 额外按钮接口类型
 * @author lxm
 * @date 2023-06-09 06:20:58
 * @export
 * @interface IExtraButton
 */
export interface IExtraButton {
    /**
     * 唯一标识，
     * @author lxm
     * @date 2023-06-09 06:18:05
     * @type {string}
     */
    id: string;
    /**
     * 应用标识
     *
     * @author chitanda
     * @date 2023-12-06 18:12:03
     * @type {string}
     */
    appId: string;
    /**
     * 按钮类型
     * @author lxm
     * @date 2023-06-09 06:20:48
     * @type {'extra'}
     */
    buttonType: 'extra';
    /**
     * 标题
     * @author lxm
     * @date 2023-06-09 06:26:21
     * @type {string}
     */
    caption: string;
    /**
     * 悬浮提示文字
     * @author lxm
     * @date 2023-06-09 06:26:21
     * @type {string}
     */
    tooltip: string;
    /**
     * 图标类型
     * @author lxm
     * @date 2023-06-09 06:40:58
     * @type {IIcon}
     */
    icon?: IIcon;
}
export type IExtraButtons = {
    [p: string | number]: IExtraButton[];
};
//# sourceMappingURL=i-toolbar.state.d.ts.map