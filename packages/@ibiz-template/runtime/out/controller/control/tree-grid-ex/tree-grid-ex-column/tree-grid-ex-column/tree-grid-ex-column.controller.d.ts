import { IDETreeColumn } from '@ibiz/model-core';
import { TreeGridExController } from '../../tree-grid-ex.controller';
import { TreeGridExNotifyState } from '../../../../constant';
import { TreeGridExRowState } from '../../tree-grid-ex-row.state';
/**
 * 树表格（增强）列控制器
 * @author lxm
 * @date 2023-12-21 02:03:28
 * @export
 * @class TreeGridExColumnController
 * @template T
 */
export declare class TreeGridExColumnController<T extends IDETreeColumn = IDETreeColumn> {
    /**
     * 树表格（增强）列模型对象
     *
     * @author lxm
     * @date 2022-09-05 19:09:07
     * @type {T}
     */
    readonly model: T;
    /**
     * 树表格（增强）控制器
     *
     * @author lxm
     * @date 2022-08-24 22:08:59
     * @type {GridController}
     */
    readonly treeGrid: TreeGridExController;
    /**
     * 是否是自适应列
     * @author lxm
     * @date 2023-07-07 11:20:16
     * @type {boolean}
     */
    isAdaptiveColumn: boolean;
    /**
     * 是否是脚本代码
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-08-15 10:51:25
     */
    isCustomCode: boolean;
    /**
     * 上下文
     *
     * @author lxm
     * @date 2022-09-05 19:09:24
     * @readonly
     * @type {IContext}
     */
    get context(): IContext;
    /**
     * 视图参数
     *
     * @author lxm
     * @date 2022-09-05 19:09:00
     * @readonly
     * @type {IParams}
     */
    get params(): IParams;
    /**
     * 是否是第一个显示的树表格列
     * @author lxm
     * @date 2023-12-22 03:28:10
     * @readonly
     * @type {boolean}
     */
    get isFirstShowColumn(): boolean;
    /**
     * Creates an instance of GridFieldColumnController.
     * @author lxm
     * @date 2022-08-24 20:08:22
     * @param {T} model
     */
    constructor(model: T, treeGrid: TreeGridExController);
    /**
     * 子类不可覆盖或重写此方法，在 init 时需要重写的使用 onInit 方法。
     *
     * @author lxm
     * @date 2022-08-18 22:08:30
     * @returns {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 初始化方法
     *
     * @author lxm
     * @date 2022-09-28 15:09:15
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onInit(): Promise<void>;
    /**
     * 表格状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    gridStateNotify(_row: TreeGridExRowState, _state: TreeGridExNotifyState): void;
    dataChangeNotify(_row: TreeGridExRowState, _names: string[]): Promise<void>;
}
//# sourceMappingURL=tree-grid-ex-column.controller.d.ts.map