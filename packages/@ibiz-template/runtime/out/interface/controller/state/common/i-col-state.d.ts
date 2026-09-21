/**
 * 布局子成员的通用UI属性
 *
 * @author lxm
 * @date 2022-10-20 16:10:20
 * @export
 * @interface ILayoutState
 */
export interface ILayoutState {
    /**
     * 布局宽度
     *
     * @author lxm
     * @date 2022-10-20 17:10:26
     * @type {string}
     */
    width: string;
    /**
     * 布局高度
     *
     * @author lxm
     * @date 2022-10-20 17:10:33
     * @type {string}
     */
    height: string;
    /**
     * 额外样式，对象格式
     *
     * @author lxm
     * @date 2022-10-20 17:10:41
     * @type {IData}
     */
    extraStyle: IData;
    /**
     * 额外类名
     *
     * @author lxm
     * @date 2022-10-20 17:10:06
     * @type {string[]}
     */
    extraClass: string[];
    /**
     * 压制自身内容的样式
     *
     * @author lxm
     * @date 2023-02-15 02:07:35
     * @type {IData}
     */
    contentStyle: IData;
}
/**
 * IBizCol时需要用到的成员通用状态
 * @author lxm
 * @date 2023-06-07 06:09:42
 * @export
 * @interface IColState
 */
export interface IColState {
    /**
     * 是否显示
     * @author lxm
     * @date 2023-02-08 03:59:47
     * @type {boolean}
     */
    visible: boolean;
    /**
     * 不显示时是否保活，使其功能保留
     *
     * @author lxm
     * @date 2023-02-08 03:59:01
     * @type {boolean}
     * @memberof PanelItemState
     */
    keepAlive: boolean;
    /**
     * 布局相关
     * @author lxm
     * @date 2023-06-07 06:14:56
     * @type {ILayoutState}
     */
    layout: ILayoutState;
}
//# sourceMappingURL=i-col-state.d.ts.map