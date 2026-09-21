import { ISysImage } from '@ibiz/model-core';
import { IControlState } from './i-control.state';
/**
 * 分页导航面板UI状态
 *
 * @export
 * @interface ITabExpPanelState
 * @extends {IControlState}
 */
export interface ITabExpPanelState extends IControlState {
    /**
     * 分页数据
     *
     * @type {ITabExpPanelPagesState[]}
     * @memberof ITabExpPanelState
     */
    tabPages: ITabExpPanelPagesState[];
    /**
     * 激活分页标识
     *
     * @type {string}
     * @memberof ITabExpPanelState
     */
    activeName: string;
    /**
     * 默认导航分页标识
     *
     * @author zk
     * @date 2023-06-19 09:06:02
     * @type {string}
     * @memberof ITabExpPanelState
     */
    defaultTabName: string;
    /**
     * 给导航的视图附加的视图参数
     * @author lxm
     * @date 2024-03-19 10:52:29
     * @type {IParams}
     */
    expViewParams: IParams;
}
/**
 * 分页状态
 *
 * @export
 * @interface ITabExpPanelPagesState
 */
export interface ITabExpPanelPagesState {
    /**
     * 分页标识
     *
     * @type {string}
     * @memberof ITabExpPanelPagesState
     */
    tabTag: string;
    /**
     * 分页标题
     *
     * @type {string}
     * @memberof ITabExpPanelPagesState
     */
    caption: string;
    /**
     * 当前分页缓存的全路径
     *
     * @type {string}
     * @memberof ITabExpPanelPagesState
     */
    fullPath?: string;
    /**
     * 类名集合
     * @author lxm
     * @date 2023-07-25 02:51:28
     * @type {string[]}
     */
    class: string[];
    /**
     * 标题图标
     * @author lxm
     * @date 2023-07-25 02:51:28
     * @type {string[]}
     */
    sysImage?: ISysImage;
}
//# sourceMappingURL=i-tab-exp-panel.state.d.ts.map