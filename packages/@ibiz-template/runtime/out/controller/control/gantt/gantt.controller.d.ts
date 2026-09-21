import { IDEGantt } from '@ibiz/model-core';
import { IPortalMessage } from '@ibiz-template/core';
import { IColumnState, IGanttController, IGanttEvent, IGanttNodeData, IGanttState, IGanttStyle, IUIActionResult, MDCtrlLoadParams, MDCtrlRemoveParams } from '../../../interface';
import { GanttService } from './gantt.service';
import { TreeGridExController, TreeGridExRowState } from '../tree-grid-ex';
import { GanttDataSetNodeData } from '../../../service';
import { ControllerEvent } from '../../utils';
import { ViewLogicScheduler } from '../../../logic-scheduler';
/**
 * 甘特图控制器
 *
 * @author zhanghengfeng
 * @date 2023-12-08 15:12:54
 * @export
 * @class GanttController
 * @extends {MDControlController<IDEGantt, IGanttState, IGanttEvent>}
 * @implements {IGanttController}
 */
export declare class GanttController extends TreeGridExController<IDEGantt, IGanttState, IGanttEvent> implements IGanttController {
    service: GanttService;
    /**
     * 视图逻辑触发器
     *
     * @type {ViewLogicScheduler}
     * @memberof GanttController
     */
    viewScheduler?: ViewLogicScheduler;
    protected get _evt(): ControllerEvent<IGanttEvent>;
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2023-12-11 16:12:20
     * @protected
     */
    protected initState(): void;
    /**
     * 部件参数解析
     *
     * @author ljx
     * @date 2024-05-30 17:09:08
     * @protected
     * @memberof ControlController
     */
    protected handleControlParams(): void;
    /**
     * 当数据放生变更时，若为当前应用实体数据。则多数据部件进行刷新
     * 临时重写 防止错误刷新整个甘特图
     * @protected
     * @param {IData} msg
     * @memberof GanttController
     */
    protected onDataChange(msg: IData): void;
    /**
     * 初始化对应类型的部件服务
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof GanttController
     */
    protected initService(): Promise<void>;
    /**
     * 设置甘特图样式
     *
     * @param {IGanttStyle} style
     * @memberof GanttController
     */
    setGanttStyle(style: IGanttStyle): void;
    protected onCreated(): Promise<void>;
    /**
     * 初始化视图触发器
     *
     * @protected
     * @memberof GanttController
     */
    protected initViewScheduler(): void;
    /**
     * 设置激活数据
     *
     * @param {IGanttNodeData} item
     * @return {*}  {Promise<void>}
     * @memberof GanttController
     */
    setActive(item: IGanttNodeData): Promise<void>;
    /**
     * 节点数据激活
     *
     * @param {IGanttNodeData} item
     * @return {*}  {Promise<void>}
     * @memberof GanttController
     */
    onNodeDataActive(nodeParams: {
        data: IData[];
        context: IContext;
        params: IParams;
    }): Promise<void>;
    /**
     * 部件刷新，走初始加载(规避预置后续刷新和通知刷新同时进行)
     *
     * @author ljx
     * @date 2024-05-06 20:28:59
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
    /**
     * 刷新指定树节点的子节点数据
     *
     * @param {(ITreeNodeData | IData)} nodeData 指定树节点数据，可以是节点数据，也可以是对应的实体数据
     * @param {boolean} [refreshParent=false] 是否是刷新给定节点数据的父节点的子节点数据
     * @return {*}  {Promise<void>}
     */
    refreshNodeChildren(nodeData: {
        _id?: string;
        srfkey?: string;
    }, refreshParent?: boolean): Promise<void>;
    /**
     * 处理默认展开
     *
     * @param {ITreeNodeData[]} data 子节点数据
     * @return {*}  {Promise<void>}
     */
    handleDefaultExpandNodes(data: IGanttNodeData[]): Promise<void>;
    /**
     * 打开编辑数据视图
     *
     * @param {IGanttNodeData} item
     * @memberof GanttController
     */
    openData({ data, context, params, }: {
        data: IData[];
        context: IContext;
        params: IParams;
    }): Promise<IUIActionResult>;
    /**
     * 设置行属性的值
     *
     * @param {TreeGridExRowState} row
     * @param {string} name
     * @param {unknown} value
     * @return {*}  {Promise<void>}
     * @memberof GanttController
     */
    setRowValue(row: TreeGridExRowState, name: string, value: unknown, ignore?: boolean): Promise<void>;
    /**
     * 修改节点时间
     *
     * @param {IGanttNodeData} nodeData
     * @memberof GanttController
     */
    modifyNodeTime(nodeData: IGanttNodeData, { begin, end }: {
        begin?: string;
        end?: string;
    }): Promise<void>;
    /**
     * 保存
     *
     * @param {IGanttNodeData} nodeData
     * @return {*}  {Promise<void>}
     * @memberof GanttController
     */
    save(nodeData: IGanttNodeData): Promise<void>;
    /**
     * 删除
     *
     * @param {MDCtrlRemoveParams} [args]
     * @return {*}  {Promise<void>}
     * @memberof GanttController
     */
    remove(args?: MDCtrlRemoveParams): Promise<void>;
    /**
     * 后台删除结束后界面删除逻辑
     *
     * @param {GanttDataSetNodeData} data
     * @memberof GanttController
     */
    afterRemove(data: GanttDataSetNodeData): void;
    /**
     * 新建行
     *
     * @param {MDCtrlLoadParams} [args={}]
     * @return {*}  {Promise<void>}
     * @memberof GanttController
     */
    newRow(args?: MDCtrlLoadParams): Promise<void>;
    protected onDEDataChange(msg: IPortalMessage): void;
    /**
     * @description 切换折叠
     * @param {IData} [params={}]
     * @memberof GanttController
     */
    changeCollapse(params?: IData): void;
    /**
     * 保存列状态
     *
     * @memberof GanttController
     */
    saveColumnState(): void;
    /**
     * 控制列显示
     * @param {IColumnState[]} columnStates
     * @return {*}
     * @memberof GanttController
     */
    setColumnVisible(columnStates: IColumnState[]): void;
    /**
     * 初始化树表格（增强）列状态
     * @return {*}
     * @memberof GanttController
     */
    protected initColumnStates(): void;
    /**
     * 合并表格列状态数组
     * @param {IColumnState[]} base 基础表格列状态
     * @param {IColumnState[]} cache 缓存表格列状态
     * @returns 以基础表格列状态为主，缓存表格列状态修正基础表格列状态
     * @return {IColumnState[]}
     * @memberof GanttController
     */
    protected mergeGridColumnStates(base: IColumnState[], cache: IColumnState[]): IColumnState[];
}
//# sourceMappingURL=gantt.controller.d.ts.map