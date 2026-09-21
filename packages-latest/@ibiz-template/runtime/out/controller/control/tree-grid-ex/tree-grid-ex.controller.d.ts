import { IDETreeColumn, IDETreeGridEx } from '@ibiz/model-core';
import { ITreeNodeData, ITreeGridExState, ITreeGridExEvent, MDCtrlLoadParams, ITreeGridExRowState, ITreeGridExController, ITreeGridExColumnProvider } from '../../../interface';
import { TreeGridExService } from './tree-grid-ex.service';
import { TreeController } from '../tree/tree.controller';
import { TreeGridExColumnController, TreeGridExUAColumnController, TreeGridExFieldColumnController } from './tree-grid-ex-column';
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
    /**
     * @description 初始化state
     * @protected
     * @memberof TreeGridExController
     */
    protected initState(): void;
    /**
     * @description 生命周期-创建完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    protected onCreated(): Promise<void>;
    /**
     * @description 初始化部件服务
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    protected initService(): Promise<void>;
    /**
     * @description 初始化界面行为组
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    protected initUIActions(): Promise<void>;
    /**
     * @description 初始化树表格（增强）属性列，操作列，编辑项控制器
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    protected initGridColumns(): Promise<void>;
    /**
     * @description 初始化树表格（增强）属性列，操作列，编辑项控制器
     * @protected
     * @param {IDETreeColumn} column
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    protected initColumnsController(column: IDETreeColumn): Promise<void>;
    /**
     * @description 部件加载之后
     * @param {MDCtrlLoadParams} args
     * @param {IData[]} items
     * @returns {*}  {Promise<IData[]>}
     * @memberof TreeGridExController
     */
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * @description 更新列状态
     * @param {IData} rows
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    updateRows(rows: IData): Promise<void>;
    /**
     * @description 初始化树表格（增强）列状态
     * @protected
     * @memberof TreeGridExController
     */
    protected initColumnStates(): void;
    /**
     * @description 计算列的固定状态
     * @protected
     * @memberof TreeGridExController
     */
    protected calcColumnFixed(): void;
    /**
     * @description 获取表格行状态
     * @param {string} key
     * @returns {*}  {(ITreeGridExRowState | undefined)}
     * @memberof TreeGridExController
     */
    getRowState(key: string): ITreeGridExRowState | undefined;
    /**
     * @description 节点加载之后
     * @param {ITreeNodeData[]} nodes 树节点数据
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    afterLoadNodes(nodes: ITreeNodeData[]): Promise<void>;
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof TreeGridExController
     */
    protected convertMultipleLanguages(): void;
    /**
     * @description 保存数据
     * @param {ITreeNodeData} nodeData 树节点数据
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    save(nodeData: ITreeNodeData): Promise<void>;
    /**
     * @description 保存所有变更数据
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    saveAll(): Promise<void>;
    /**
     * @description 树表格状态变更通知
     * @param {TreeGridExRowState} row
     * @param {TreeGridExNotifyState} state
     * @memberof TreeGridExController
     */
    gridStateNotify(row: TreeGridExRowState, state: TreeGridExNotifyState): void;
    /**
     * @description 设置行属性的值
     * @param {TreeGridExRowState} row 行状态
     * @param {string} name 属性名称
     * @param {unknown} value 值
     * @param {boolean} [ignore=false] 忽略脏值检查
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    setRowValue(row: TreeGridExRowState, name: string, value: unknown, ignore?: boolean): Promise<void>;
    /**
     * @description 通知所有表格编辑项成员表格编辑项数据变更
     * @param {TreeGridExRowState} row
     * @param {string[]} names
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    dataChangeNotify(row: TreeGridExRowState, names: string[]): Promise<void>;
    /**
     * @description 切换行编辑状态
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    toggleRowEdit(): Promise<void>;
    /**
     * @description 计算默认值
     * @param {ITreeNodeData} data 节点数据
     * @param {boolean} isCreate 是否为新建
     * @returns {*}  {IData}
     * @memberof TreeGridExController
     */
    calcDefaultValue(data: ITreeNodeData, isCreate: boolean): IData;
    /**
     * @description 切换单行的编辑状态
     * @param {TreeGridExRowState} row 行状态
     * @param {boolean} [editable] 是否为编辑状态
     * @param {boolean} [isSave=true] 是否保存数据
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    switchRowEdit(row: TreeGridExRowState, editable?: boolean, isSave?: boolean): Promise<void>;
    /**
     * @description 树节点点击事件
     * @param {ITreeNodeData} _nodeData
     * @param {MouseEvent} event
     * @returns {*}  {Promise<void>}
     * @memberof TreeGridExController
     */
    onTreeNodeClick(_nodeData: ITreeNodeData, event: MouseEvent): Promise<void>;
}
//# sourceMappingURL=tree-grid-ex.controller.d.ts.map