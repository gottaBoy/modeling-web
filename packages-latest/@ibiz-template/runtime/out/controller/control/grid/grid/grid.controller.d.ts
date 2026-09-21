import { IDEGrid, IDEGridColumn, IDEDataExport, IControlLogic, IAppDEDataExport } from '@ibiz/model-core';
import { GridFieldColumnController } from '../grid-column/grid-field-column/grid-field-column.controller';
import { GridColumnController } from './grid-column.controller';
import { GridRowState } from './grid-row.state';
import { GridService } from './grid.service';
import { GridUAColumnController, GridFieldEditColumnController } from '../grid-column';
import { IGridState, IGridEvent, CodeListItem, IColumnState, IGridRowState, IExportColumn, IGridController, MDCtrlLoadParams, ISearchGroupData, IApiMDGroupParams, IGridColumnProvider, IApiGridColumnMapping, IApiExportParams } from '../../../../interface';
import { ControlVO } from '../../../../service';
import { MDControlController } from '../../../common';
import { GridNotifyState } from '../../../constant';
import { ControllerEvent } from '../../../utils';
/**
 * 表格控制器
 *
 * @author chitanda
 * @date 2022-08-01 18:08:13
 * @export
 * @class GridController
 * @extends {MDControlController<GridModel>}
 */
export declare class GridController<T extends IDEGrid = IDEGrid, S extends IGridState = IGridState, E extends IGridEvent = IGridEvent> extends MDControlController<T, S, E> implements IGridController<T, S, E> {
    /**
     * 表格部件服务
     *
     * @author lxm
     * @date 2022-08-19 13:08:51
     * @type {EntityService}
     */
    service: GridService;
    protected get _evt(): ControllerEvent<IGridEvent>;
    /**
     * 单元格超出呈现模式
     *
     * @readonly
     * @type {('wrap' | 'ellipsis')}
     * @memberof GridController
     */
    get overflowMode(): 'wrap' | 'ellipsis';
    /**
     * 隐藏无值的单位
     *
     * @readonly
     * @type {boolean}
     * @memberof GridController
     */
    get emptyHiddenUnit(): boolean;
    /**
     * @description 行编辑模式
     * @readonly
     * @type {('cell' | 'row' | 'all')}
     * @memberof GridController
     */
    get editShowMode(): 'cell' | 'row' | 'all';
    /**
     * 行编辑保存模式
     *
     * @readonly
     * @type {('cell-blur' | 'auto' | 'manual')}
     * @memberof GridController
     */
    get editSaveMode(): 'cell-blur' | 'auto' | 'manual';
    /**
     * 表格保存错误处理模式
     *
     * @author tony001
     * @date 2025-01-02 11:01:24
     * @readonly
     * @type {('default' | 'reset')}
     */
    get saveErrorHandleMode(): 'default' | 'reset';
    /**
     * @description 列对齐方式
     * @readonly
     * @type {("left" | "right" | "center")}
     * @memberof GridController
     */
    get columnAlign(): 'left' | 'right' | 'center';
    /**
     * 是否有配置宽度自适应列
     *
     * @type {boolean}
     * @memberof GridController
     */
    hasAdaptiveColumn: boolean;
    /**
     * 是否有多级表头
     * @author lxm
     * @date 2023-08-07 02:26:16
     * @type {boolean}
     */
    isMultistageHeader: boolean;
    /**
     * 是否添加jsonschema里定义的表格列
     * @author lxm
     * @date 2024-01-02 05:27:16
     * @type {boolean}
     */
    addSchemaColumn: boolean;
    /**
     * jsonschema参数
     *
     * @author zhanghengfeng
     * @date 2024-07-05 15:07:13
     * @type {IParams}
     */
    jsonSchemaParams: IParams;
    /**
     * 显示百分比列
     *
     * @type {string[]}
     * @memberof GridController
     */
    percentkeys: string[];
    /**
     * 所有表格列控制器集合
     *
     * @author lxm
     * @date 2022-11-14 15:11:14
     * @type {{ [key: string]: GridColumnController }}
     */
    columns: {
        [key: string]: GridColumnController;
    };
    /**
     * 所有表格属性列的控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: GridFieldColumnController }}
     */
    fieldColumns: {
        [key: string]: GridFieldColumnController;
    };
    /**
     * 所有表格操作列的控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: GridUAColumnController }}
     */
    uaColumns: {
        [key: string]: GridUAColumnController;
    };
    /**
     * 所有表格编辑列的控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: GridFieldEditColumnController }}
     */
    editColumns: {
        [key: string]: GridFieldEditColumnController;
    };
    /**
     * 表格列的适配器
     *
     * @author lxm
     * @date 2022-11-14 14:11:39
     * @type {{ [key: string]: IGridColumnProvider }}
     */
    providers: {
        [key: string]: IGridColumnProvider;
    };
    /**
     * 分组属性列控制器
     * @author lxm
     * @date 2023-08-07 09:45:30
     * @type {string}
     */
    groupFieldColumn?: GridFieldColumnController;
    /**
     * 聚合行标题
     * @author lxm
     * @date 2023-08-07 04:11:00
     * @type {string}
     */
    aggTitle: string;
    /**
     * 数据导出对象
     * @author lxm
     * @date 2023-08-07 04:11:00
     * @type {IAppDEDataExport}
     */
    dataExport: IAppDEDataExport | undefined;
    /**
     * 数据导出列
     * @author lxm
     * @date 2023-08-07 04:11:00
     * @type {IAppDEDataExport}
     */
    allExportColumns: IExportColumn[];
    /**
     * 数据导出代码表
     * @author zzq
     * @date 2024-03-20 16:11:00
     * @type {Map<string, readonly CodeListItem[]>}
     */
    allExportCodelistMap: Map<string, readonly CodeListItem[]>;
    /**
     * 所有的自定义列
     *
     * @type {IDEGridColumn[]}
     */
    allCustomColumns: IDEGridColumn[];
    /**
     * 分组代码表项集合
     * @author lxm
     * @date 2023-08-07 09:09:42
     * @type {readonly}
     */
    get groupCodeListItems(): Readonly<CodeListItem[]> | undefined;
    /**
     * 是否启用表格聚合
     * @author lxm
     * @date 2023-08-07 04:10:55
     * @readonly
     * @type {boolean}
     */
    get enableAgg(): boolean;
    /**
     * 允许使用行编辑
     * @author lxm
     * @date 2023-08-17 02:52:07
     * @readonly
     * @type {boolean}
     */
    get allowRowEdit(): boolean;
    /**
     * 允许使用行编辑次序调整
     * @author zzq
     * @date 2024-04-22 17:52:07
     * @readonly
     * @type {boolean}
     */
    get enableRowEditOrder(): boolean;
    /**
     * @description 自动保存的定时器引用
     * @protected
     * @type {unknown}
     * @memberof GridController
     */
    protected autoSaveTimer?: unknown;
    protected initState(): void;
    /**
     * 初始化方法
     *
     * @author lxm
     * @date 2022-08-18 22:08:17
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onCreated(): Promise<void>;
    /**
     * @description 初始化界面行为组
     * @protected
     * @memberof GridController
     */
    protected initUIActions(): Promise<void>;
    /**
     * @description 初始化自动保存定时器
     * @protected
     * @memberof GridController
     */
    protected initAutoSaveTimer(): void;
    /**
     * @description 销毁自动保存定时器
     * @protected
     * @memberof GridController
     */
    protected destroyAutoSaveTimer(): void;
    /**
     * 计算表格展示模式
     * @author fzh
     * @date 2024-05-29 19:18:42
     * @return {*}  {void}
     */
    calcShowMode(tableData: IData): void;
    /**
     * 根据jsonschema初始化自定义表格列
     * @author lxm
     * @date 2024-01-02 04:41:23
     * @return {*}  {Promise<void>}
     */
    initByEntitySchema(): Promise<void>;
    /**
     * 初始化数据导出对象
     * @author zzq
     * @date 2024-03-20 16:10:17
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initExportData(): Promise<void>;
    /**
     * 填充导出代码表
     * @author zzq
     * @date 2024-04-23 16:10:17
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected fillExportCodelistMap(): Promise<void>;
    /**
     * 初始化表格分组
     * @author lxm
     * @date 2023-08-07 09:10:17
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initGroup(): Promise<void>;
    afterLoad(args: MDCtrlLoadParams, items: ControlVO[]): Promise<ControlVO[]>;
    /**
     * @description 处理刷新模式
     * @protected
     * @param {MDCtrlLoadParams} args
     * @memberof GridController
     */
    protected handleRefreshMode(args: MDCtrlLoadParams): void;
    /**
     * 更新行状态
     * @param rows
     */
    updateRows(rows: IGridRowState[]): Promise<void>;
    /**
     * @description 执行多数据分组
     * @param {IApiMDGroupParams[]} [arg] 分组参数集合（多层分组暂未支持）
     * @param {IParams} [_params] 额外参数
     * @returns {*}  {Promise<void>}
     * @memberof MDControlController
     */
    execGroup(arg: IApiMDGroupParams[], _params?: IParams): Promise<void>;
    /**
     * 计算分组数据
     * @author lxm
     * @date 2023-08-07 02:16:39
     * @protected
     * @param {IData[]} items
     */
    protected calcGroupData(items: IData[]): void;
    /**
     * 加载远程聚合数据
     * @author lxm
     * @date 2023-08-07 05:35:36
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected loadRemoteAgg(): Promise<void>;
    getFetchParams(extraParams?: IParams): Promise<IParams>;
    /**
     * 计算当前页的聚合数据
     * @author lxm
     * @date 2023-08-07 04:22:09
     * @param {IData[]} items
     */
    calcAggResult(items: IData[]): void;
    /**
     * 后台删除结束后界面删除逻辑
     *
     * @author lxm
     * @date 2022-09-06 19:09:10
     * @param {IData} data
     */
    afterRemove(data: IData): void;
    /**
     * @description 新建行
     * @param {MDCtrlLoadParams} [args]
     * @returns {*}  {Promise<void>}
     * @memberof GridController
     */
    newRow(args?: MDCtrlLoadParams): Promise<void>;
    /**
     * 保存
     *
     * @author lxm
     * @date 2022-09-06 19:09:21
     * @param {ControlVO} data
     * @returns {*}  {Promise<void>}
     */
    save(data: ControlVO): Promise<void>;
    saveAll(): Promise<void>;
    /**
     * 初始化表格属性列，操作列，编辑项控制器
     *
     * @author lxm
     * @date 2022-08-24 21:08:48
     * @protected
     */
    protected initColumnsController(column: IDEGridColumn): Promise<void>;
    /**
     * 初始化部件逻辑调度器
     * @param {IControlLogic[]} logics
     * @return {*}  {void}
     * @protected
     */
    protected initControlScheduler(logics?: IControlLogic[]): void;
    /**
     * 初始化表格列状态
     * @author lxm
     * @date 2023-08-28 02:53:12
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initColumnStates(): void;
    /**
     * 合并表格列状态数组
     *
     * @param base 基础表格列状态
     * @param cache 缓存表格列状态
     * @returns 以基础表格列状态为主，缓存表格列状态修正基础表格列状态
     */
    protected mergeGridColumnStates(base: IColumnState[], cache: IColumnState[]): IColumnState[];
    /**
     * 计算列的固定状态
     * @author lxm
     * @date 2023-08-31 05:12:27
     * @protected
     */
    protected calcColumnFixed(): void;
    /**
     * 初始化表格属性列，操作列，编辑项控制器
     *
     * @author lxm
     * @date 2022-08-24 21:08:48
     * @protected
     */
    protected initGridColumns(): Promise<void>;
    /**
     * 设置行属性的值
     *
     * @author lxm
     * @date 2022-08-24 10:08:40
     * @param {GridRowState} row 行状态控制器
     * @param {string} name 要设置的表单数据的属性名称
     * @param {unknown} value 要设置的值
     * @param {boolean} ignore 忽略脏值检查
     */
    setRowValue(row: GridRowState, name: string, value: unknown, ignore?: boolean): Promise<void>;
    /**
     * 通知所有表格编辑项成员表格编辑项数据变更
     *
     * @author lxm
     * @date 2022-09-20 22:09:49
     * @param {GridRowState} row 行数据
     * @param {string[]} names 更新的属性
     */
    dataChangeNotify(row: GridRowState, names: string[]): Promise<void>;
    /**
     * 表格状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    gridStateNotify(row: GridRowState, state: GridNotifyState): void;
    /**
     * 校验一行数据的所有编辑项
     *
     * @author lxm
     * @date 2022-09-06 21:09:05
     * @param {GridRowState} row 要校验的行数据控制器
     * @returns {*}
     */
    validate(row: GridRowState): Promise<boolean>;
    /**
     * 校验所有编辑项
     *
     * @author zzq
     * @date 2024-07-22 21:09:05
     * @returns {Promise<boolean>}
     */
    validateAll(): Promise<boolean>;
    toggleRowEdit(): Promise<void>;
    /**
     * 切换单行的编辑状态
     * @author lxm
     * @date 2023-08-08 06:45:54
     * @param {GridRowState} row
     * @param {boolean} [editable]
     */
    switchRowEdit(row: GridRowState, editable?: boolean, isSave?: boolean): Promise<void>;
    /**
     * 获取部件默认排序模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-28 18:43:27
     */
    getSortModel(): {
        minorSortAppDEFieldId: string | undefined;
        minorSortDir: string | undefined;
    };
    /**
     * 设置排序
     *
     * @author lxm
     * @date 2022-09-28 13:09:44
     * @param {string} key 排序字段
     * @param {string} order 排序顺序
     */
    setSort(fieldId?: string, order?: 'asc' | 'desc'): void;
    /**
     * 表格编辑项更新
     *
     * @author lxm
     * @date 2022-09-15 21:09:13
     * @param {string} methodName 更新实体方法
     * @param {string[]} updateItems 更新项名称集合
     */
    updateGridEditItem(row: GridRowState, updateId: string): Promise<void>;
    /**
     * 加载数据(只加载数据 不做其他操作)
     *
     * @author zk
     * @date 2023-07-20 04:07:49
     * @param {MDCtrlLoadParams} args
     * @param {IParams} [fetchArgs={}] 透传给 service.fetch 的额外参数，如 srfexportdataset
     * @return {*}
     * @memberof GridController
     */
    loadData(args: MDCtrlLoadParams, fetchArgs?: IParams): Promise<ControlVO[]>;
    /**
     * 初始化数据导出列
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-21 18:54:16
     */
    findAllExportColumns(dataExport: IDEDataExport): Promise<IExportColumn[]>;
    /**
     * 值格式化
     * @return {string}
     * @author: zzq
     * @Date: 2024-03-20 17:54:16
     */
    formatValue: (isDate: boolean, valueFormat?: string, value?: unknown) => string;
    /**
     * 获取数据导出模型
     * @returns
     */
    getDataExcelModel(): {
        header: string[];
        fields: string[];
        exportColumns: IData[];
        colWidths: {
            wpx: number;
        }[];
    };
    /**
     * 格式化导出数据
     * @return {string}
     * @author: zzq
     * @Date: 2024-03-20 17:54:16
     */
    formatExcelData(data: IData[], fields: string[]): IData[];
    /**
     * 获取导出数据
     * @return {Promise<IData[]>}
     * @author: zzq
     * @Date: 2024-03-20 17:54:16
     */
    getExportData(params: IApiExportParams): Promise<IData[]>;
    /**
     * @description 执行后台导出
     * @param params 额外参数
     */
    excuteBackendExport(params: IApiExportParams): Promise<void>;
    /**
     * @description 导出数据
     * @param {{  event: MouseEvent; params: IApiExportParams }} args
     * @returns {*}  {Promise<void>}
     * @memberof GridController
     */
    exportData(args: {
        params: IApiExportParams;
        event?: MouseEvent;
    }): Promise<void>;
    /**
     * 计算默认值并返回一个对象，对象里的属性就是要填充的默认值
     * 没有的属性就是不需要填充默认值的属性
     * @author lxm
     * @date 2023-09-18 04:01:06
     * @param {IData} data
     * @param {boolean} isCreate
     * @return {*}  {IData}
     */
    calcDefaultValue(data: IData, isCreate: boolean): IData;
    /**
     * 查找rowState
     * @author lxm
     * @date 2023-10-27 07:27:48
     * @param {IData} data
     * @return {*}  {(IGridRowState)}
     */
    findRowStateIndex(data: IData): number;
    /**
     * 查找rowState
     * @author lxm
     * @date 2023-10-27 07:27:48
     * @param {IData} data
     * @return {*}  {(IGridRowState | undefined)}
     */
    findRowState(data: IData): IGridRowState | undefined;
    /**
     * 行单击事件
     *
     * @author lxm
     * @date 2022-08-18 22:08:16
     * @param {IData} data 选中的单条数据
     */
    onRowClick(data: IData): Promise<void>;
    /**
     * 转换各类多语言
     *
     * @date 2023-05-18 02:57:00
     * @protected
     */
    protected convertMultipleLanguages(): void;
    /**
     * 控制列显示
     * @param {IColumnState} columnState
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-19 16:02:14
     */
    setColumnVisible(columnState: IColumnState): void;
    /**
     * 设置点击分组后回显相关参数
     * @param {IData} data
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-21 10:54:45
     */
    setGroupParams(data: ISearchGroupData): void;
    /**
     * 改变列排序
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-01-05 11:21:07
     */
    changeColumnStateSort(columnKey: string, newIndex: number, oldIndex: number): void;
    /**
     * 存储列状态到本地
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-01-05 13:45:36
     */
    saveColumnStates(): void;
    /**
     * 执行对应部件行为消息提示
     * @author zzq
     * @date 2024-04-03 15:51:21
     * @param {string} tag
     * @param {({ default?: string; data?: IData | IData[]; error?: Error; rowState?: IGridRowState })} [opts]
     * @return {*}  {void}
     */
    actionNotification(tag: string, opts?: {
        default?: string;
        data?: IData | IData[];
        error?: Error;
        rowState?: IGridRowState;
    }): void;
    /**
     * 拖拽改变
     * @param dragging 拖拽目标
     * @param drop 放置目标
     * @param dropType 放置类型
     */
    onDragChange(dragging: IGridRowState, drop: IGridRowState, dropType: 'prev' | 'next'): Promise<void>;
    /**
     * 计算统计数据
     * @author: zzq
     * @date 2024-06-28 17:12:58
     * @return {*}  {Promise<void>}
     */
    calcTotalData(): void;
    /**
     * 切换折叠(分组表格使用),tag=指定分组标识(不传则全部)，expand=目标状态(不传则反转)
     * @author: zzq
     * @date 2024-08-23 17:12:58
     * @return {*}  {void}
     */
    changeCollapse(params?: {
        tag?: string;
        expand?: boolean;
    }): void;
    /**
     * @description 展开改变
     * @param {IData} item
     * @param {boolean} expanded
     * @memberof TreeGridController
     */
    expandChange(item: IData, expanded: boolean): void;
    /**
     * @description 获取表格列
     * @template K
     * @param {K} type 表格列类型
     * @param {string} id 表格列标识
     * @returns {*}  {IApiGridColumnMapping[K]}
     * @memberof IApiGridController
     */
    getGridColumn<K extends keyof IApiGridColumnMapping>(type: K, id: string): IApiGridColumnMapping[K];
    /**
     * @description 生命周期-销毁完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof GridController
     */
    protected onDestroyed(): Promise<void>;
}
//# sourceMappingURL=grid.controller.d.ts.map