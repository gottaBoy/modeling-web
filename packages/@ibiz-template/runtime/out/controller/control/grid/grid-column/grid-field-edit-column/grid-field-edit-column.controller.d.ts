import { IDEGridEditItem } from '@ibiz/model-core';
import { IEditorContainerController, IEditorController, IEditorProvider } from '../../../../../interface';
import { GridNotifyState } from '../../../../constant';
import { GridRowState } from '../../grid/grid-row.state';
import { GridFieldColumnController } from '../grid-field-column';
/**
 * 表格属性列(开启行编辑)控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-09-01 18:25:20
 */
export declare class GridFieldEditColumnController extends GridFieldColumnController implements IEditorContainerController {
    /**
     * 表格编辑项模型
     *
     * @author lxm
     * @date 2022-11-14 15:11:57
     * @type {IDEGridEditItem}
     */
    editItem: IDEGridEditItem;
    /**
     * 编辑器控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @type {IEditorController}
     */
    editor: IEditorController;
    /**
     * 编辑器适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @type {EditorController}
     */
    editorProvider?: IEditorProvider;
    /**
     * 值规则
     *
     * @author lxm
     * @date 2023-10-18 03:39:40
     * @type {IData[]}
     */
    rules: IData[];
    /**
     * 表格编辑项校验器实例
     *
     * @author lxm
     * @date 2022-09-04 18:09:56
     * @private
     * @type {Schema}
     */
    private validator;
    /**
     * 单位
     * @author lxm
     * @date 2023-05-24 05:46:52
     * @readonly
     * @type {(string | undefined)}
     */
    get unitName(): string | undefined;
    /**
     * 值格式化
     * @author lxm
     * @date 2023-05-24 05:46:56
     * @readonly
     * @type {(string | undefined)}
     */
    get valueFormat(): string | undefined;
    /**
     * 值项
     * @author lxm
     * @date 2023-05-31 02:31:27
     * @readonly
     * @type {(string | undefined)}
     */
    get valueItemName(): string | undefined;
    /**
     * 初始化方法，生成表格编辑项控制器
     *
     * @author lxm
     * @date 2022-11-14 13:11:33
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onInit(): Promise<void>;
    /**
     * 初始化值规则
     *
     * @author lxm
     * @date 2022-09-02 09:09:27
     * @protected
     * @returns {*}
     */
    protected initRules(): Promise<void>;
    /**
     * 设置行属性的值
     *
     * @author lxm
     * @date 2022-08-24 10:08:40
     * @param {GridRowState} row 行状态控制器
     * @param {unknown} value 要设置的值
     * @param {string} name 要设置的表单数据的属性名称
     * @param {boolean} ignore 忽略脏值检查
     */
    setRowValue(row: GridRowState, value: unknown, name?: string, ignore?: boolean): Promise<void>;
    /**
     * 通知所有表格编辑项成员表格编辑项数据变更
     *
     * @author lxm
     * @date 2022-09-06 15:09:40
     * @param {GridRowState} row 行数据控制器
     * @param {string[]} names 变更属性名称
     */
    dataChangeNotify(row: GridRowState, names: string[]): Promise<void>;
    /**
     * 表格状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    gridStateNotify(row: GridRowState, _state: GridNotifyState): void;
    /**
     * 计算列的禁用状态
     * @author lxm
     * @date 2023-06-26 06:19:00
     * @param {GridRowState} row
     */
    calcColumnDisabled(row: GridRowState): void;
    /**
     * 计算列的必填状态
     * @author lxm
     * @date 2023-06-26 06:23:25
     * @param {GridRowState} row
     */
    calcColumnRequired(row: GridRowState): void;
    /**
     * 计算列的只读状态
     * @author lxm
     * @date 2023-06-26 06:19:00
     * @param {GridRowState} row
     */
    calcColumnReadonly(row: GridRowState): void;
    /**
     * 计算启用项的禁用
     * 启用返回true,不启用返回false
     *
     * @author lxm
     * @date 2022-09-20 00:09:57
     * @returns {*}
     */
    calcEnableCond(row: GridRowState): boolean;
    /**
     * 表格编辑项值规则校验
     * 如果表格编辑项不显示则不校验直接返回true
     *
     * @author lxm
     * @date 2022-09-01 22:09:29
     */
    validate(row: GridRowState): Promise<boolean>;
}
//# sourceMappingURL=grid-field-edit-column.controller.d.ts.map