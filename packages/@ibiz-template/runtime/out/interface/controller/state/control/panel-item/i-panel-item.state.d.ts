import { IColState } from '../../common';
export interface IPanelItemState extends IColState {
    /**
     * 是否禁用
     *
     * @author lxm
     * @date 2023-02-08 03:59:01
     * @type {boolean}
     * @memberof PanelItemState
     */
    disabled: boolean;
    /**
     * 类名集合
     * @author lxm
     * @date 2023-07-24 12:51:22
     * @type {IPanelItemClass}
     */
    class: IPanelItemClass;
    /**
     * 是否必填
     *
     * @author chitanda
     * @date 2023-11-11 09:11:53
     * @type {boolean}
     */
    required: boolean;
    /**
     * 是否只读
     *
     * @author zhanghengfeng
     * @date 2024-03-25 13:03:29
     * @type {boolean}
     */
    readonly: boolean;
    /**
     * 上下文
     *
     * @author tony001
     * @date 2024-04-16 16:04:40
     * @type {IContext}
     */
    context?: IContext;
}
export interface IPanelItemClass {
    /**
     * 容器样式
     * @author lxm
     * @date 2023-08-02 06:25:51
     * @type {string[]}
     */
    container: string[];
    /**
     * 容器动态样式
     * @author lxm
     * @date 2023-08-02 06:25:57
     * @type {string[]}
     */
    containerDyna: string[];
    /**
     * 标题样式
     * @author lxm
     * @date 2023-08-02 06:26:05
     * @type {string[]}
     */
    label: string[];
    /**
     * 标题动态样式
     * @author lxm
     * @date 2023-08-02 06:26:11
     * @type {string[]}
     */
    labelDyna: string[];
}
//# sourceMappingURL=i-panel-item.state.d.ts.map