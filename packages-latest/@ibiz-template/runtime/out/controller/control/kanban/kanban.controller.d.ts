import { IDEKanban, IUIActionGroupDetail } from '@ibiz/model-core';
import { IKanbanEvent, IKanbanState, IKanbanSwimlane, IDragChangeInfo, MDCtrlLoadParams, IApiMDGroupParams, IKanbanController, IKanbanGroupState, IToolbarController } from '../../../interface';
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
     * @description 是否支持全屏
     * @readonly
     * @type {boolean}
     * @memberof KanbanController
     */
    get enableFullScreen(): boolean;
    /**
     * @description 是否支持分组隐藏
     * @readonly
     * @type {boolean}
     * @memberof KanbanController
     */
    get enableGroupHidden(): boolean;
    /**
     * @description 拖拽模式
     * @readonly
     * @type {(0 | 1 | 2 | 3)} （无 | 仅分组 | 仅泳道 | 全部）
     * @memberof KanbanController
     */
    get draggableMode(): 0 | 1 | 2 | 3;
    /**
     * @description 获取泳道描述
     * @readonly
     * @type {(string | undefined)}
     * @memberof KanbanController
     */
    get laneDescription(): string | undefined;
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
     * @description 执行分组
     * @param {IApiMDGroupParams[]} _arg
     * @param {IParams} [_params]
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    execGroup(_arg: IApiMDGroupParams[], _params?: IParams): Promise<void>;
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
     * @description 点击新建并设置设置选中分组
     * @param {MouseEvent} event
     * @param {(string | number)} group 分组
     * @param {IKanbanSwimlane} [lane] 泳道
     * @memberof KanbanController
     */
    onClickNew(event: MouseEvent, group: string | number, lane?: IKanbanSwimlane): void;
    /**
     * @description 分组工具栏点击，需携带分组
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @param {IKanbanGroupState} group
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    onGroupToolbarClick(detail: IUIActionGroupDetail, event: MouseEvent, group: IKanbanGroupState): Promise<void>;
    /**
     * @description 分组行为项点击, 需携带分组（有泳道时携带泳道）
     * @param {IUIActionGroupDetail} detail
     * @param {IData} item
     * @param {MouseEvent} event
     * @param {IKanbanGroupState} group
     * @param {IKanbanSwimlane} [lane]
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    onGroupActionClick(detail: IUIActionGroupDetail, item: IData, event: MouseEvent, group: IKanbanGroupState, lane?: IKanbanSwimlane): Promise<void>;
    /**
     * @description 处理数据分组
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    handleDataGroup(): Promise<void>;
    /**
     * @description 处理泳道数据
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    handleLaneData(): Promise<void>;
    /**
     * 处理代码表分组
     *
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    handleCodeListGroup(): Promise<void>;
    /**
     * @description 拖拽变更
     * @param {IDragChangeInfo} info
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    onDragChange(info: IDragChangeInfo): Promise<void>;
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
    /**
     * @description 设置选中
     * @param {IData[]} selection
     * @param {boolean} [isEmit=true]
     * @memberof KanbanController
     */
    setSelection(selection: IData[], isEmit?: boolean): void;
}
//# sourceMappingURL=kanban.controller.d.ts.map