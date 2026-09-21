import { IDEKanban, IUIActionGroupDetail } from '@ibiz/model-core';
import { IDragChangeInfo, IKanbanController, IKanbanEvent, IKanbanGroupState, IKanbanState, IToolbarController, MDCtrlLoadParams } from '../../../interface';
import { ControlVO } from '../../../service';
import { DataViewControlController } from '../data-view';
import { KanbanService } from './kanban.service';
export declare class KanbanController extends DataViewControlController<IDEKanban, IKanbanState, IKanbanEvent> implements IKanbanController {
    /**
     * 数据视图（卡片）部件服务
     *
     * @type {KanbanService}
     * @memberof KanbanController
     */
    service: KanbanService;
    /**
     * 允许调整顺序
     * @author lxm
     * @date 2023-09-11 04:02:39
     * @readonly
     * @type {boolean}
     */
    get enableEditOrder(): boolean;
    /**
     * 是否支持调整分组。
     * @author lxm
     * @date 2023-09-11 04:04:00
     * @readonly
     * @type {boolean}
     */
    get enableEditGroup(): boolean;
    protected initControlService(): Promise<void>;
    protected initState(): void;
    /**
     * 初始化
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    protected onCreated(): Promise<void>;
    /**
     * 本地排序items
     * @author lxm
     * @date 2023-09-04 09:30:55
     * @param {IData[]} items
     */
    sortItems(items: IData[]): void;
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * 当展开批操作工具栏时需进行行点击拦截
     *
     * @param {IData} data
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    onRowClick(_data: IData): Promise<void>;
    /**
     * 点击新建时设置选中分组
     *
     * @param {MouseEvent} event
     * @param {(string | number)} group
     * @memberof KanbanController
     */
    onClickNew(event: MouseEvent, group: string | number): void;
    /**
     * 分组工具栏需设置选中分组
     *
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @param {IKanbanGroupState} group
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    onGroupToolbarClick(detail: IUIActionGroupDetail, event: MouseEvent, group: IKanbanGroupState): Promise<void>;
    /**
     * 分组行为项点击，需携带分组标识
     *
     * @param {IUIActionGroupDetail} detail
     * @param {IData} item
     * @param {MouseEvent} event
     * @param {IKanbanGroupState} group
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    onGroupActionClick(detail: IUIActionGroupDetail, item: IData, event: MouseEvent, group: IKanbanGroupState): Promise<void>;
    handleDataGroup(): Promise<void>;
    /**
     * 处理代码表分组
     *
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    handleCodeListGroup(): Promise<void>;
    /**
     * 拖拽变更事件处理回调
     * @author lxm
     * @date 2023-09-11 04:12:58
     * @param {IDragChangeInfo} info
     * @return {*}  {Promise<void>}
     */
    onDragChange(info: IDragChangeInfo): Promise<void>;
    /**
     * 移动并排序数据
     *
     * @author tony001
     * @date 2024-06-17 15:06:22
     * @param {IData} draggedItem
     * @param {IData} moveMeta
     * @return {*}  {Promise<ControlVO[]>}
     */
    moveOrderItem(draggedItem: IData, moveMeta: IData): Promise<{
        ok: boolean;
        result?: ControlVO[];
    }>;
    /**
     * 批量更新修改的项，并更新后台返回的数据，然后重新计算分组和排序
     * @author lxm
     * @date 2023-09-11 04:13:15
     * @param {ControlVO[]} changedItems
     * @return {*}  {Promise<void>}
     */
    updateChangedItems(changedItems: ControlVO[]): Promise<void>;
    /**
     * 获取是否全屏
     *
     * @return {*}  {boolean}
     * @memberof KanbanController
     */
    getFullscreen(): boolean;
    /**
     * 触发全屏
     *
     * @param {IData} container
     * @memberof KanbanController
     */
    onFullScreen(container: IData): boolean;
    /**
     * 设置选中分组标识
     *
     * @param {(string | number)} key
     * @memberof KanbanController
     */
    setSelectGroup(key: string | number): void;
    /**
     * 设置分组控制器
     *
     * @param {string} groupKey
     * @param {('quickToolbarController' | 'batchToolbarController')} name
     * @param {IToolbarController} c
     * @memberof KanbanController
     */
    setGroupController(groupKey: string | number, name: 'quickToolbarController' | 'batchToolbarController', c: IToolbarController): void;
    /**
     * 设置工具栏hook
     *
     * @memberof KanbanController
     */
    setToolbarHooks(): void;
    /**
     * 设置快捷工具栏点击事件hook
     *
     * @param {string} name
     * @param {IToolbarController} c
     * @memberof KanbanController
     */
    setQuickToolbarClickHook(name: string, c: IToolbarController): void;
    /**
     * 设置批工具栏点击事件hook
     *
     * @param {string} name
     * @param {IToolbarController} c
     * @memberof KanbanController
     */
    setBatchToolbarClickHook(name: string, c: IToolbarController): void;
    /**
     * 打开批操作工具栏
     *
     * @param {string | number} groupKey
     * @memberof KanbanController
     */
    openBatch(groupKey: string | number): void;
    /**
     * 关闭批操作工具栏
     *
     * @memberof KanbanController
     */
    closeBatch(): void;
}
//# sourceMappingURL=kanban.controller.d.ts.map