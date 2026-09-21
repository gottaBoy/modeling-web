import { IDEMobMDCtrl, IUIActionGroup, IAppDEDataExport, IUIActionGroupDetail } from '@ibiz/model-core';
import { IMobMDCtrlEvent, IMobMDCtrlController, IMobMdCtrlState, IMobMDCtrlRowState, MDCtrlLoadParams, CodeListItem, ISearchGroupData, IExportColumn, IApiExportParams } from '../../../interface';
import { MDCtrlService } from './md-ctrl.service';
import { MobMDCtrlRowState } from './md-ctrl-row.state';
import { MDControlController } from '../../common';
import { ControlVO } from '../../../service';
export declare class MDCtrlController extends MDControlController<IDEMobMDCtrl, IMobMdCtrlState, IMobMDCtrlEvent> implements IMobMDCtrlController {
    service: MDCtrlService;
    /**
     * @description 启用分组
     * @readonly
     * @type {boolean}
     * @memberof MDCtrlController
     */
    get enableGroup(): boolean;
    /**
     * 允许新建
     *
     * @readonly
     * @type {boolean}
     * @memberof MDCtrlController
     */
    get enableNew(): boolean;
    /**
     * @description 分组时是否显示分组锚点导航
     * @readonly
     * @type {boolean}
     * @memberof MDCtrlController
     */
    get showGroupAnchor(): boolean;
    /**
     * @description 数据导出对象
     * @type {(IAppDEDataExport | undefined)}
     * @memberof MDCtrlController
     */
    dataExport: IAppDEDataExport | undefined;
    /**
     * @description 数据导出列
     * @type {IExportColumn[]}
     * @memberof MDCtrlController
     */
    allExportColumns: IExportColumn[];
    /**
     * @description 数据导出代码表
     * @type {Map<string, readonly CodeListItem[]>}
     * @memberof MDCtrlController
     */
    allExportCodelistMap: Map<string, readonly CodeListItem[]>;
    protected initState(): void;
    /**
     * @description 初始化排序配置项集合
     * @protected
     * @memberof MDCtrlController
     */
    protected initSortDelistItems(): void;
    /**
     * 分组代码表项集合
     *
     * @author zk
     * @date 2023-10-11 04:10:06
     * @type {readonly}
     * @memberof MDCtrlController
     */
    groupCodeListItems?: readonly CodeListItem[];
    protected onCreated(): Promise<void>;
    /**
     * @description 初始化界面行为组
     * @protected
     * @memberof MDCtrlController
     */
    protected initUIActions(): Promise<void>;
    /**
     * 加载更多
     * @author lxm
     * @date 2023-05-22 07:33:59
     * @return {*}  {Promise<void>}
     */
    loadMore(): Promise<void>;
    /**
     * 列表多数据刷新 需重置分页
     *
     * @author zk
     * @date 2023-08-11 05:08:20
     * @return {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    refresh(): Promise<void>;
    /**
     * 部件加载后处理
     *
     * @param {MDCtrlLoadParams} args
     * @param {ControlVO[]} items
     * @return {*}  {Promise<IData[]>}
     * @memberof MDCtrlController
     */
    afterLoad(args: MDCtrlLoadParams, items: ControlVO[]): Promise<IData[]>;
    /**
     * 设置列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:46
     * @param {IData[]} items
     * @memberof MDCtrlController
     */
    setData(items: IData[]): void;
    /**
     * 获取列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:35
     * @return {*}  {IData[]}
     * @memberof MDCtrlController
     */
    getAllData(): IData[];
    /**
     * 界面行为组项点击
     *
     * @author chitanda
     * @date 2023-06-19 18:06:18
     * @param {IUIActionGroupDetail} detail
     * @param {MDCtrlRowState} row
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    onActionClick(detail: IUIActionGroupDetail, row: IMobMDCtrlRowState, event: MouseEvent): Promise<void>;
    /**
     * 初始化按钮状态
     *
     * @protected
     * @param {MobMDCtrlRowState} row
     * @return {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    protected initActionStates(row: MobMDCtrlRowState): Promise<void>;
    /**
     * 初始化（左右）行为组权限
     *
     * @protected
     * @param {MobMDCtrlRowState} row
     * @param {IUIActionGroup} group
     * @return {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    protected initUIActionGroup(row: MobMDCtrlRowState, group: IUIActionGroup): Promise<void>;
    /**
     * 处理数据分组
     *
     * @memberof MDCtrlController
     */
    protected handleDataGroup(): Promise<void>;
    /**
     * 处理自动分组
     *
     * @memberof MDCtrlController
     */
    protected handleAutoGroup(): Promise<void>;
    /**
     * 加载并初始化分组代码表项集合
     * @author lxm
     * @date 2023-08-29 05:11:39
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initGroupCodeListItems(): Promise<void>;
    /**
     * 处理代码表分组
     *
     * @memberof MDCtrlController
     */
    protected handleCodeListGroup(): Promise<void>;
    changeCollapse(params?: {
        tag?: string;
        expand?: boolean;
    }): void;
    /**
     * 移动端-设置分组点击
     *
     * @param {ISearchGroupData} data
     * @memberof MDCtrlController
     */
    setGroupParams(data: ISearchGroupData): void;
    /**
     * @description 移动端-滚动到顶部
     * @memberof MDCtrlController
     */
    scrollToTop(): void;
    /**
     * @description 获取部件默认排序模型
     * @returns {*}  {({
     *     minorSortAppDEFieldId: string | undefined;
     *     minorSortDir: string | undefined;
     *   })}
     * @memberof MDCtrlController
     */
    getSortModel(): {
        minorSortAppDEFieldId: string | undefined;
        minorSortDir: string | undefined;
    };
    /**
     * 新增按钮点击
     *
     * @memberof MDCtrlController
     */
    onClickNew(event: MouseEvent, group?: string | number): void;
    /**
     * @description 初始化数据导出对象
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    protected initExportData(): Promise<void>;
    /**
     * @description 初始化数据导出列
     * @param {IAppDEDataExport} dataExport
     * @returns {*}  {Promise<IExportColumn[]>}
     * @memberof MDCtrlController
     */
    findAllExportColumns(dataExport: IAppDEDataExport): Promise<IExportColumn[]>;
    /**
     * @description 获取数据导出模型
     * @returns {*}  {{ header: string[], fields: string[], exportColumns: IData[] }}
     * @memberof MDCtrlController
     */
    getDataExcelModel(): {
        header: string[];
        fields: string[];
        exportColumns: IData[];
    };
    /**
     * @description 加载数据(只加载数据 不做其他操作)
     * @param {MDCtrlLoadParams} args
     * @param {IParams} [fetchArgs={}] 透传给 service.fetch 的额外参数，如 srfexportdataset
     * @returns {*}  {Promise<IData[]>}
     * @memberof MDCtrlController
     */
    loadData(args: MDCtrlLoadParams, fetchArgs?: IParams): Promise<IData[]>;
    /**
     * @description 获取导出数据
     * @param {IApiExportParams} params
     * @returns {*}  {Promise<IData[]>}
     * @memberof MDCtrlController
     */
    getExportData(params: IApiExportParams): Promise<IData[]>;
    /**
     * @description 格式化导出数据
     * @param {IData[]} data
     * @param {string[]} fields
     * @returns {*}  {IData[]}
     * @memberof MDCtrlController
     */
    formatExcelData(data: IData[], fields: string[]): IData[];
    /**
     * @description 执行后台导出
     * @param {IApiExportParams} params
     * @returns {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    excuteBackendExport(params: IApiExportParams): Promise<void>;
    /**
     * @description 导出数据
     * @param {{
     *       event?: MouseEvent;
     *       params?: IApiExportParams;
     *     }} [args={}]
     * @returns {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    exportData(args?: {
        event?: MouseEvent;
        params?: IApiExportParams;
    }): Promise<void>;
}
//# sourceMappingURL=md-ctrl.controller.d.ts.map