import { IDEGridColumn, IDEGridDataItem } from '@ibiz/model-core';
import { GridRowState } from './grid-row.state';
import { GridController } from './grid.controller';
import { IGridColumnController } from '../../../../interface';
/**
 * 表格列控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-09-01 18:25:20
 */
export declare class GridColumnController<T extends IDEGridColumn = IDEGridColumn> implements IGridColumnController {
    /**
     * 表格列模型对象
     *
     * @author lxm
     * @date 2022-09-05 19:09:07
     * @type {T}
     */
    readonly model: T;
    /**
     * 表单控制器
     *
     * @author lxm
     * @date 2022-08-24 22:08:59
     * @type {GridController}
     */
    readonly grid: GridController;
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
     * 该列是否启用行编辑
     *
     * @author lxm
     * @date 2022-09-06 11:09:58
     * @readonly
     */
    get enableRowEdit(): boolean;
    /**
     * 该列对应数据项
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-08-15 10:48:22
     */
    get deGridDataItem(): IDEGridDataItem | undefined;
    /**
     * 值格式化
     * @author lxm
     * @date 2023-08-25 05:03:07
     * @readonly
     * @type {(string | undefined)}
     */
    get valueFormat(): string | undefined;
    /**
     * 数据类型（数值）
     * @author lxm
     * @date 2023-08-25 05:03:07
     * @readonly
     * @type {(string | undefined)}
     */
    get dataType(): number | undefined;
    /**
     * Creates an instance of GridFieldColumnController.
     * @author lxm
     * @date 2022-08-24 20:08:22
     * @param {T} model
     */
    constructor(model: T, grid: GridController);
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
     * 解析获取脚本代码html
     * @param {GridRowState} row
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-08-15 11:29:58
     */
    getCustomHtml(row: GridRowState): Promise<string | undefined>;
    /**
     * @description 获取绘制器模型代码
     * @return {*}  {string}
     * @memberof GridColumnController
     */
    getRenderCode(): string;
}
//# sourceMappingURL=grid-column.controller.d.ts.map