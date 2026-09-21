/**
 * 界面行为执行返回值
 *
 * @author chitanda
 * @date 2022-08-26 00:08:44
 * @export
 * @interface IUIActionResult
 */
export interface IUIActionResult {
    /**
     * 是否刷新界面
     *
     * @author chitanda
     * @date 2022-08-26 00:08:54
     * @type {boolean}
     */
    refresh?: boolean;
    /**
     * 刷新引用视图模式
     * @description 值模式 [界面行为重新加载数据模式] {0：无、 1：引用视图或树节点、 2：引用树节点父节点、 3：引用树节点根节点 }
     * @type {( number | 0 | 1 | 2 | 3)}
     * @default 0
     */
    refreshMode?: number | 0 | 1 | 2 | 3;
    /**
     * 是否关闭界面
     *
     * @author chitanda
     * @date 2022-08-26 00:08:33
     * @type {boolean}
     */
    closeView?: boolean;
    /**
     * 中途取消操作
     *
     * @author lxm
     * @date 2023-02-09 06:51:37
     * @type {boolean}
     * @memberof IUIActionResult
     */
    cancel?: boolean;
    /**
     * 返回的数据
     *
     * @author chitanda
     * @date 2022-08-17 18:08:20
     * @type {IData[]}
     */
    data?: IData[];
    /**
     * 后续逻辑使用的上下文
     * @author lxm
     * @date 2023-03-15 07:26:38
     * @type {IContext}
     * @memberof IUIActionResult
     */
    nextContext?: IContext;
    /**
     * 后续逻辑使用的视图参数
     * @author lxm
     * @date 2023-03-15 07:26:38
     * @type {IParams}
     * @memberof IUIActionResult
     */
    nextParams?: IParams;
}
//# sourceMappingURL=i-ui-action-result.d.ts.map