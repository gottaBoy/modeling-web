import { IDEGantt } from '@ibiz/model-core';
import { IPortalMessage } from '@ibiz-template/core';
import { IGanttStyle, IGanttState, IGanttEvent, IColumnState, IGanttNodeData, IGanttController, MDCtrlLoadParams, MDCtrlRemoveParams } from '../../../interface';
import { GanttService } from './gantt.service';
import { TreeGridExController, TreeGridExRowState } from '../tree-grid-ex';
import { GanttDataSetNodeData } from '../../../service';
import { ControllerEvent } from '../../utils';
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
     * @description 设置甘特图样式
     * @param {IGanttStyle} style
     * @memberof GanttController
     */
    setGanttStyle(style: IGanttStyle): void;
    /**
     * @description 设置激活数据
     * @param {IGanttNodeData} item
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    setActive(item: IGanttNodeData): Promise<void>;
    /**
     * @description 部件刷新，走初始加载(规避预置后续刷新和通知刷新同时进行)
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    refresh(): Promise<void>;
    /**
     * @description 刷新指定树节点的子节点数据
     * @param {{ _id?: string; srfkey?: string }} nodeData 指定树节点数据，可以是节点数据，也可以是对应的实体数据
     * @param {boolean} [refreshParent=false] 是否是刷新给定节点数据的父节点的子节点数据
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    refreshNodeChildren(nodeData: {
        _id?: string;
        srfkey?: string;
    }, refreshParent?: boolean): Promise<void>;
    /**
     * @description 处理默认展开
     * @param {IGanttNodeData[]} data 节点数据
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    handleDefaultExpandNodes(data: IGanttNodeData[]): Promise<void>;
    /**
     * @description 甘特图树节点点击事件
     * @param {IGanttNodeData} _nodeData
     * @param {MouseEvent} event
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    onTreeNodeClick(_nodeData: IGanttNodeData, event: MouseEvent): Promise<void>;
    /**
     * @description 设置行属性的值
     * @param {TreeGridExRowState} row
     * @param {string} name
     * @param {unknown} value
     * @param {boolean} [ignore=false]
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    setRowValue(row: TreeGridExRowState, name: string, value: unknown, ignore?: boolean): Promise<void>;
    /**
     * @description 修改节点时间
     * @param {IGanttNodeData} nodeData 节点数据
     * @param {{ begin?: string; end?: string }} { begin, end } 开始时间，结束时间
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    modifyNodeTime(nodeData: IGanttNodeData, { begin, end }: {
        begin?: string;
        end?: string;
    }): Promise<void>;
    /**
     * @description 保存数据
     * @param {IGanttNodeData} nodeData 节点数据
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    save(nodeData: IGanttNodeData): Promise<void>;
    /**
     * @description 删除
     * @param {MDCtrlRemoveParams} [args]
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    remove(args?: MDCtrlRemoveParams): Promise<void>;
    /**
     * @description 后台删除结束后界面删除逻辑
     * @param {GanttDataSetNodeData} data
     * @memberof GanttController
     */
    afterRemove(data: GanttDataSetNodeData): void;
    /**
     * @description 新建行
     * @param {MDCtrlLoadParams} [args={}]
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    newRow(args?: MDCtrlLoadParams): Promise<void>;
    protected onDEDataChange(msg: IPortalMessage): void;
    /**
     * @description 切换折叠，tag=指定分组标识(不传则全部)，expand=目标状态(不传则反转)
     * @param {{ tag?: string; expand?: boolean }} [params={}]
     * @memberof GanttController
     */
    changeCollapse(params?: {
        tag?: string;
        expand?: boolean;
    }): void;
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
    /**
     * loadNodes加载完子数据之后的处理
     * @param {IGanttNodeData[]} nodes 加载回来的子数据
     * @return {*}  {Promise<void>}
     */
    afterLoadNodes(nodes: IGanttNodeData[]): Promise<void>;
    /**
     * @description 更新链接线数据
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    updateLinks(): Promise<void>;
}
//# sourceMappingURL=gantt.controller.d.ts.map