import { IDETreeColumn, IDETreeGridEx } from '@ibiz/model-core';
import { ITreeGridExController, ITreeGridExState, ITreeGridExEvent, ITreeGridExColumnProvider, ITreeGridExRowState, ITreeNodeData, MDCtrlLoadParams, IUIActionResult } from '../../../interface';
import { TreeGridExService } from './tree-grid-ex.service';
import { TreeController } from '../tree/tree.controller';
import { TreeGridExColumnController, TreeGridExFieldColumnController, TreeGridExUAColumnController } from './tree-grid-ex-column';
import { TreeGridExRowState } from './tree-grid-ex-row.state';
import { TreeGridExNotifyState } from '../../constant';
import { ControllerEvent } from '../../utils';
/**
 * 树表格（增强）部件控制器
 *
 * @author zk
 * @date 2023-09-21 06:09:46
 * @export
 * @class TreeGridExController
 * @extends {MDControlController<IDETree, ITreeGridState, ITreeGridEvent>}
 * @implements {ITreeGridExController}
 */
export declare class TreeGridExController<T extends IDETreeGridEx = IDETreeGridEx, S extends ITreeGridExState = ITreeGridExState, E extends ITreeGridExEvent = ITreeGridExEvent> extends TreeController<T, S, E> implements ITreeGridExController<T, S, E> {
    service: TreeGridExService;
    protected get _evt(): ControllerEvent<ITreeGridExEvent>;
    /**
     * 单元格超出呈现模式
     * @author lxm
     * @date 2023-11-17 01:56:26
     * @readonly
     * @type {('wrap' | 'ellipsis')}
     */
    get overflowMode(): 'wrap' | 'ellipsis';
    /**
     * @description 行编辑模式
     * @readonly
     * @type {('cell' | 'row' | 'all')}
     * @memberof TreeGridExController
     */
    get editShowMode(): 'cell' | 'row' | 'all';
    /**
     * 隐藏无值的单位
     *
     * @readonly
     * @type {boolean}
     * @memberof TreeGridExController
     */
    get emptyHiddenUnit(): boolean;
    /**
     * 行编辑保存模式
     *
     * @readonly
     * @type {('cell-blur' | 'auto' | 'manual')}
     * @memberof GridController
     */
    get editSaveMode(): 'cell-blur' | 'auto' | 'manual';
    /**
     * 树表格（增强）列的适配器
     *
     * @author zk
     * @date 2023-09-21 06:09:04
     * @type {{ [key: string]: ITreeGridExColumnProvider }}
     * @memberof TreeGridExController
     */
    providers: {
        [key: string]: ITreeGridExColumnProvider;
    };
    /**
     * 所有树表格（增强）列控制器集合
     *
     * @author zk
     * @date 2023-09-21 06:09:10
     * @type {{ [key: string]: TreeGridExColumnController }}
     * @memberof TreeGridExController
     */
    columns: {
        [key: string]: TreeGridExColumnController;
    };
    /**
     * 所有树表格（增强）属性列的控制器
     *
     * @author zk
     * @date 2023-09-21 06:09:16
     * @type {{ [key: string]: TreeGridExFieldColumnController }}
     * @memberof TreeGridExController
     */
    fieldColumns: {
        [key: string]: TreeGridExFieldColumnController;
    };
    /**
     * 所有树表格（增强）操作列的控制器
     *
     * @author zk
     * @date 2023-09-21 06:09:21
     * @type {{ [key: string]: TreeGridExUAColumnController }}
     * @memberof TreeGridExController
     */
    uaColumns: {
        [key: string]: TreeGridExUAColumnController;
    };
    /**
     * 是否有配置宽度自适应列
     *
     * @type {boolean}
     * @memberof GridController
     */
    get hasAdaptiveColumn(): boolean;
    /**
     * 允许使用行编辑
     * @author lxm
     * @date 2023-08-17 02:52:07
     * @readonly
     * @type {boolean}
     */
    get allowRowEdit(): boolean;
    protected initState(): void;
    protected onCreated(): Promise<void>;
    protected initService(): Promise<void>;
    /**
     * 初始化树表格（增强）属性列，操作列，编辑项控制器
     *
     * @author zk
     * @date 2023-09-21 06:09:28
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    protected initGridColumns(): Promise<void>;
    /**
     * 初始化树表格（增强）属性列，操作列，编辑项控制器
     *
     * @author zk
     * @date 2023-09-21 06:09:37
     * @protected
     * @param {IDETreeColumn} column
     * @return {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    protected initColumnsController(column: IDETreeColumn): Promise<void>;
    /**
     * 加载之后
     *
     * @param {MDCtrlLoadParams} args
     * @param {IData[]} items
     * @return {*}  {Promise<IData[]>}
     * @memberof TreeGridExController
     */
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * 更新列状态
     *
     * @param {IData} rows
     * @return {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    updateRows(rows: IData): Promise<void>;
    /**
     * 初始化树表格（增强）列状态
     *
     * @author zk
     * @date 2023-09-21 06:09:43
     * @protected
     * @memberof TreeGridExController
     */
    protected initColumnStates(): void;
    /**
     * 计算列的固定状态
     *
     * @author zk
     * @date 2023-09-21 06:09:50
     * @protected
     * @memberof TreeGridExController
     */
    protected calcColumnFixed(): void;
    /**
     * 获取树表格行数据
     * @author lxm
     * @date 2023-12-22 02:23:44
     * @param {string} key 可以是节点id也可以是_uuid
     * @return {*}  {(ITreeGridExRowState | undefined)}
     */
    getRowState(key: string): ITreeGridExRowState | undefined;
    afterLoadNodes(nodes: ITreeNodeData[]): Promise<void>;
    /**
     * 转换各类多语言
     *
     * @date 2023-05-18 02:57:00
     * @protected
     */
    protected convertMultipleLanguages(): void;
    save(nodeData: ITreeNodeData): Promise<void>;
    saveAll(): Promise<void>;
    /**
     * 树表格状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    gridStateNotify(row: TreeGridExRowState, state: TreeGridExNotifyState): void;
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
    setRowValue(row: TreeGridExRowState, name: string, value: unknown, ignore?: boolean): Promise<void>;
    /**
     * 通知所有表格编辑项成员表格编辑项数据变更
     *
     * @author lxm
     * @date 2022-09-20 22:09:49
     * @param {GridRowState} row 行数据
     * @param {string[]} names 更新的属性
     */
    dataChangeNotify(row: TreeGridExRowState, names: string[]): Promise<void>;
    toggleRowEdit(): Promise<void>;
    /**
     * 计算默认值并返回一个对象，对象里的属性就是要填充的默认值
     * 没有的属性就是不需要填充默认值的属性
     * @author lxm
     * @date 2023-09-18 04:01:06
     * @param {IData} data
     * @param {boolean} isCreate
     * @return {*}  {IData}
     */
    calcDefaultValue(data: ITreeNodeData, isCreate: boolean): IData;
    /**
     * 切换单行的编辑状态
     * @author lxm
     * @date 2023-08-08 06:45:54
     * @param {GridRowState} row
     * @param {boolean} [editable]
     */
    switchRowEdit(row: TreeGridExRowState, editable?: boolean, isSave?: boolean): Promise<void>;
    /**
     * 树节点点击事件
     *
     * @param {ITreeNodeData} nodeData
     * @returns {*}  {Promise<void>}
     * @memberof TreeController
     */
    onTreeNodeClick(_nodeData: ITreeNodeData, event: MouseEvent): Promise<void>;
    openData(item: IData, event: MouseEvent): Promise<IUIActionResult>;
}
//# sourceMappingURL=tree-grid-ex.controller.d.ts.map