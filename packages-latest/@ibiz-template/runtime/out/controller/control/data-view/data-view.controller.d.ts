import { IDEDataView, IUIActionGroupDetail } from '@ibiz/model-core';
import { CodeListItem, IDragChangeInfo, MDCtrlLoadParams, IApiMDGroupParams, IMDControlGroupState, IDataViewControlState, IDataViewControlEvent, IDataViewControlController } from '../../../interface';
import { ControlVO } from '../../../service';
import { MDControlController } from '../../common';
import { ControllerEvent } from '../../utils';
import { DataViewControlService } from './data-view.service';
export declare class DataViewControlController<T extends IDEDataView = IDEDataView, S extends IDataViewControlState = IDataViewControlState, E extends IDataViewControlEvent = IDataViewControlEvent> extends MDControlController<T, S, E> implements IDataViewControlController {
    /**
     * 事件触发器
     *
     * @type {ControllerEvent<IDataViewControlEvent>}
     * @memberof DataViewControlController
     */
    evt: ControllerEvent<IDataViewControlEvent>;
    /**
     * 数据视图（卡片）部件服务
     *
     * @type {DataViewControlService}
     * @memberof DataViewControlController
     */
    service: DataViewControlService;
    /**
     * 分组代码表项集合
     * @author lxm
     * @date 2023-08-29 04:55:07
     * @type {readonly}
     */
    groupCodeListItems?: readonly CodeListItem[];
    /**
     * @description 是否允许新建
     * @readonly
     * @type {boolean}
     * @memberof DataViewControlController
     */
    get enableNew(): boolean;
    /**
     * @description 是否允许调整顺序
     * @readonly
     * @type {boolean}
     * @memberof DataViewControlController
     */
    get enableEditOrder(): boolean;
    /**
     * @description 是否支持调整分组
     * @readonly
     * @type {boolean}
     * @memberof DataViewControlController
     */
    get enableEditGroup(): boolean;
    /**
     * @description 启用分组
     * @readonly
     * @type {boolean}
     * @memberof DataViewControlController
     */
    get enableGroup(): boolean;
    /**
     * @description 分组时是否显示分组锚点导航
     * @readonly
     * @type {boolean}
     * @memberof DataViewControlController
     */
    get showGroupAnchor(): boolean;
    /**
     * 初始化State
     *
     * @protected
     * @memberof DataViewControlController
     */
    protected initState(): void;
    /**
     * @description 初始化排序配置项集合
     * @protected
     * @memberof DataViewControlController
     */
    protected initSortDelistItems(): void;
    /**
     * 初始化
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    protected onCreated(): Promise<void>;
    /**
     * 初始化部件服务
     * @author lxm
     * @date 2023-08-29 04:13:05
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initControlService(): Promise<void>;
    /**
     * @description 初始化界面行为组
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    protected initUIActions(): Promise<void>;
    /**
     * 初始化分组右侧界面行为按钮的状态
     *
     * @author chitanda
     * @date 2023-08-02 17:08:04
     * @return {*}  {Promise<void>}
     */
    initGroupActionStates(): Promise<void>;
    /**
     * 行单击事件
     *
     * @author lxm
     * @date 2022-08-18 22:08:16
     * @param {IData} _data 选中的单条数据
     */
    onRowClick(_data: IData): Promise<void>;
    /**
     * 计算表格展示模式
     * @author fzh
     * @date 2024-05-29 19:18:42
     * @return {*}  {void}
     */
    calcShowMode(items: IData): void;
    /**
     * 滚动到顶部
     *
     * @memberof DataViewControlController
     */
    scrollToTop(): void;
    /**
     * 特殊处理，加载模式为滚动加载或者点击加载，刷新时加载数据条数为分页乘以默认条数
     *
     * @return {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    refresh(): Promise<void>;
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * @description 获取操作项行为集合模型
     * @returns {*}  {IUIActionGroupDetail[]}
     * @memberof DataViewControlController
     */
    getOptItemModel(): IUIActionGroupDetail[];
    /**
     * @description 计算操作项状态
     * @param {IData[]} items
     * @returns {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    calcOptItemState(items: IData[]): Promise<void>;
    /**
     * 行为点击
     *
     * @param {IUIActionGroupDetail} detail
     * @param {IData} item
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    onActionClick(detail: IUIActionGroupDetail, item: IData, event: MouseEvent): Promise<void>;
    /**
     * @description 执行多数据分组
     * @param {IApiMDGroupParams[]} [arg] 分组参数集合（多层分组暂未支持）
     * @param {IParams} [_params] 额外参数
     * @returns {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    execGroup(arg: IApiMDGroupParams[], _params?: IParams): Promise<void>;
    /**
     * 处理数据分组
     *
     * @memberof DataViewControlController
     */
    handleDataGroup(): Promise<void>;
    /**
     * 处理自动分组
     *
     * @memberof DataViewControlController
     */
    handleAutoGroup(): Promise<void>;
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
     * @memberof DataViewControlController
     */
    handleCodeListGroup(): Promise<void>;
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
     * 点击新建
     * @author lxm
     * @date 2023-09-11 07:22:33
     * @param {MouseEvent} event
     * @param {(string | number)} group 分组标识
     */
    onClickNew(event: MouseEvent, group?: string | number): void;
    /**
     * 分组工具栏点击处理回调
     * @author lxm
     * @date 2023-09-11 04:48:06
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    onGroupToolbarClick(detail: IUIActionGroupDetail, event: MouseEvent, group: IMDControlGroupState): Promise<void>;
    /**
     * 初始化排序项集合
     * @author lxm
     * @date 2023-10-24 06:11:02
     * @return {*}  {void}
     */
    initSortItems(): void;
    /**
     * @description 切换折叠，tag=指定分组标识(不传则全部)，expand=目标状态(不传则反转)
     * @param {{ tag?: string; expand?: boolean }} [params={}]
     * @memberof DataViewControlController
     */
    changeCollapse(params?: {
        tag?: string;
        expand?: boolean;
    }): void;
    /**
     * @description 本地排序items(用于拖拽数据完成后的前端数据排序)
     * @param {IData[]} items
     * @returns {*}  {void}
     * @memberof DataViewControlController
     */
    sortItems(items: IData[]): void;
    /**
     * @description 计算移动数据参数
     * @protected
     * @param {number} fromIndex 变更前的索引位置
     * @param {number} toIndex 变更后的索引位置
     * @param {IData} draggedItem 拖拽数据项
     * @param {IData[]} targetArray 数据集
     * @param {boolean} isCrossGroup 是否切换分组
     * @returns {*}  {IData}
     * @memberof DataViewControlController
     */
    protected computeMoveDataParam(fromIndex: number, toIndex: number, draggedItem: IData, targetArray: IData[], isCrossGroup: boolean): IData;
    /**
     * @description 移动并排序数据
     * @param {ControlVO} draggedItem
     * @param {IData} moveMeta
     * @returns {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    moveOrderItem(draggedItem: ControlVO, moveMeta: IData): Promise<void>;
    /**
     * @description 批量更新修改项
     * @param {ControlVO[]} changedItems
     * @returns {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    updateChangedItems(changedItems: ControlVO[]): Promise<void>;
    /**
     * @description 拖拽变更
     * @param {IDragChangeInfo} info
     * @returns {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    onDragChange(info: IDragChangeInfo): Promise<void>;
    /**
     * @description 新建行
     * @param {MDCtrlLoadParams} [args={}]
     * @returns {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    newRow(args?: MDCtrlLoadParams): Promise<void>;
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof DataViewControlController
     */
    protected convertMultipleLanguages(): void;
}
//# sourceMappingURL=data-view.controller.d.ts.map