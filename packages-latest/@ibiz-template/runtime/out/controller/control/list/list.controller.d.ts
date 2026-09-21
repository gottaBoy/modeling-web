import { IDEList, IUIActionGroupDetail } from '@ibiz/model-core';
import { IListState, IListEvent, IListController, IDragChangeInfo, MDCtrlLoadParams, IApiMDGroupParams, IMDControlGroupState } from '../../../interface';
import { MDControlController } from '../../common';
import { ListService } from './list.service';
import { ControlVO } from '../../../service';
export declare class ListController extends MDControlController<IDEList, IListState, IListEvent> implements IListController {
    service: ListService;
    /**
     * @description 是否允许新建
     * @readonly
     * @type {boolean}
     * @memberof ListController
     */
    get enableNew(): boolean;
    /**
     * @description 是否允许调整顺序
     * @readonly
     * @type {boolean}
     * @memberof ListController
     */
    get enableEditOrder(): boolean;
    /**
     * @description 是否支持调整分组
     * @readonly
     * @type {boolean}
     * @memberof ListController
     */
    get enableEditGroup(): boolean;
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * @description 初始化界面行为组
     * @protected
     * @memberof ListController
     */
    protected initUIActions(): Promise<void>;
    /**
     * @description 初始化分组界面行为组
     * @return {*}  {Promise<void>}
     * @memberof ListController
     */
    initGroupActionStates(): Promise<void>;
    /**
     * @description 分组界面行为点击
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @param {IMDControlGroupState} group
     * @return {*}  {Promise<void>}
     * @memberof ListController
     */
    onGroupToolbarClick(detail: IUIActionGroupDetail, event: MouseEvent, group: IMDControlGroupState): Promise<void>;
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
     * 计算表格展示模式
     * @author fzh
     * @date 2024-05-29 19:18:42
     * @return {*}  {void}
     */
    calcShowMode(items: IData): void;
    /**
     * 滚动到顶部
     *
     * @memberof ListController
     */
    scrollToTop(): void;
    /**
     * 特殊处理，加载模式为滚动加载或者点击加载，刷新时加载数据条数为分页乘以默认条数
     *
     * @return {*}  {Promise<void>}
     * @memberof ListController
     */
    refresh(): Promise<void>;
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * @description 获取操作项行为集合模型
     * @returns {*}  {IUIActionGroupDetail[]}
     * @memberof ListController
     */
    getOptItemModel(): IUIActionGroupDetail[];
    /**
     * @description 计算操作项状态
     * @param {IData[]} items
     * @returns {*}  {Promise<void>}
     * @memberof ListController
     */
    calcOptItemState(items: IData[]): Promise<void>;
    /**
     * @description 行为点击
     * @param {IUIActionGroupDetail} detail
     * @param {IData} item
     * @param {MouseEvent} event
     * @returns {*}  {Promise<void>}
     * @memberof ListController
     */
    onActionClick(detail: IUIActionGroupDetail, item: IData, event: MouseEvent): Promise<void>;
    /**
     * 设置列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:46
     * @param {IData[]} items
     * @memberof ListController
     */
    setData(items: IData[]): void;
    /**
     * 获取列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:35
     * @return {*}  {IData[]}
     * @memberof ListController
     */
    getAllData(): IData[];
    /**
     * @description 执行多数据分组
     * @param {IApiMDGroupParams[]} [arg] 分组参数集合（多层分组暂未支持）
     * @param {IParams} [_params]
     * @returns {*}  {Promise<void>}
     * @memberof ListController
     */
    execGroup(arg: IApiMDGroupParams[], _params?: IParams): Promise<void>;
    /**
     * 处理数据分组
     *
     * @memberof ListController
     */
    protected handleDataGroup(): Promise<void>;
    /**
     * 处理自动分组
     *
     * @memberof ListController
     */
    protected handleAutoGroup(): Promise<void>;
    /**
     * 处理代码表分组
     *
     * @memberof ListController
     */
    protected handleCodeListGroup(): Promise<void>;
    /**
     * @description 切换折叠，tag=指定分组标识(不传则全部)，expand=目标状态(不传则反转)
     * @param {{ tag?: string; expand?: boolean }} [params={}]
     * @memberof ListController
     */
    changeCollapse(params?: {
        tag?: string;
        expand?: boolean;
    }): void;
    /**
     * @description 点击新建
     * @param {MouseEvent} event
     * @param {(string | number)} [group]
     * @memberof ListController
     */
    onClickNew(event: MouseEvent, group?: string | number): void;
    /**
     * @description 本地排序items(用于拖拽数据完成后的前端数据排序)
     * @param {IData[]} items
     * @returns {*}  {void}
     * @memberof ListController
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
     * @memberof ListController
     */
    protected computeMoveDataParam(fromIndex: number, toIndex: number, draggedItem: IData, targetArray: IData[], isCrossGroup: boolean): IData;
    /**
     * @description 移动并排序数据
     * @param {ControlVO} draggedItem
     * @param {IData} moveMeta
     * @returns {*}  {Promise<void>}
     * @memberof ListController
     */
    moveOrderItem(draggedItem: ControlVO, moveMeta: IData): Promise<void>;
    /**
     * @description 批量更新修改项
     * @param {ControlVO[]} changedItems
     * @returns {*}  {Promise<void>}
     * @memberof ListController
     */
    updateChangedItems(changedItems: ControlVO[]): Promise<void>;
    /**
     * @description 拖拽变更
     * @param {IDragChangeInfo} info
     * @returns {*}  {Promise<void>}
     * @memberof ListController
     */
    onDragChange(info: IDragChangeInfo): Promise<void>;
    /**
     * @description 新建行
     * @param {MDCtrlLoadParams} [args={}]
     * @returns {*}  {Promise<void>}
     * @memberof ListController
     */
    newRow(args?: MDCtrlLoadParams): Promise<void>;
    /**
     * @description 行单击
     * @param {IData} _data
     * @returns {*}  {Promise<void>}
     * @memberof ListController
     */
    onRowClick(_data: IData): Promise<void>;
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof ListController
     */
    protected convertMultipleLanguages(): void;
}
//# sourceMappingURL=list.controller.d.ts.map