import { IDEDataView, IDEDataViewItem, IUIActionGroupDetail } from '@ibiz/model-core';
import { IDataViewControlState, IDataViewControlEvent, IDataViewControlController, MDCtrlLoadParams, IMDControlGroupState, CodeListItem } from '../../../interface';
import { MDControlController } from '../../common';
import { ButtonContainerState, ControllerEvent } from '../../utils';
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
     * 是否允许新建
     * @author lxm
     * @date 2023-09-11 04:05:25
     * @readonly
     * @type {boolean}
     */
    get enableNew(): boolean;
    /**
     * 初始化State
     *
     * @protected
     * @memberof DataViewControlController
     */
    protected initState(): void;
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
     * 获取操作项模型
     *
     * @return {*}  {(IDEDataViewItem | null)}
     * @memberof DataViewControlController
     */
    getOptItemModel(): IDEDataViewItem | null;
    /**
     * 获取操作项行为
     *
     * @param {IData} item
     * @return {*}
     * @memberof DataViewControlController
     */
    getOptItemAction(item: IData): ButtonContainerState;
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
    onClickNew(event: MouseEvent, group: string | number): void;
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
     * @description 切换分组折叠
     * @param {IData} [params={}]
     * @memberof DataViewControlController
     */
    changeCollapse(params?: IData): void;
}
//# sourceMappingURL=data-view.controller.d.ts.map