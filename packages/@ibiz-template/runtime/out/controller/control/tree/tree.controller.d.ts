import { IPortalMessage } from '@ibiz-template/core';
import { IDETBUIActionItem, IDETree, IDETreeNode } from '@ibiz/model-core';
import { ITreeState, ITreeEvent, ITreeController, MDCtrlLoadParams, ITreeNodeData } from '../../../interface';
import { MDControlController } from '../../common';
import { ContextMenuController } from '../context-menu';
import { TreeService } from './tree.service';
import { ControllerEvent } from '../../utils';
import { AppCounter } from '../../../service';
export type DropNodeRS = {
    minorEntityId: string;
    pickupDEFName: string;
    childDETreeNodeId: string;
};
/**
 * 树部件控制器
 * @author lxm
 * @date 2023-05-26 08:20:46
 * @export
 * @class TreeController
 * @extends {MDControlController<IDETree, ITreeState, ITreeEvent>}
 * @implements {ITreeController}
 */
export declare class TreeController<T extends IDETree = IDETree, S extends ITreeState = ITreeState, E extends ITreeEvent = ITreeEvent> extends MDControlController<T, S, E> implements ITreeController<T, S, E> {
    service: TreeService;
    protected get _evt(): ControllerEvent<ITreeEvent>;
    /**
     * 上下文菜单控制器
     * @author lxm
     * @date 2023-08-21 10:56:24
     * @type {{ [p: string]: ContextMenuController }}
     */
    contextMenus: {
        [p: string]: ContextMenuController;
    };
    /**
     * 是否启用快速搜索
     * @author lxm
     * @date 2023-12-04 03:33:32
     * @type {boolean}
     */
    enableQuickSearch: boolean;
    /**
     * 拖入节点关系处理
     * @author lxm
     * @date 2023-12-14 03:05:38
     */
    dropNodeRss: Map<string, DropNodeRS[]>;
    /**
     * 节点上下文解析后信息`
     * @author lxm
     * @date 2023-12-29 10:38:37
     */
    contextMenuInfos: {
        [p: string]: {
            /**
             * 上下文菜单里第一个行为级别为常用操作的项
             */
            clickTBUIActionItem?: IDETBUIActionItem;
            onlyOneActionItem: boolean;
        };
    };
    /**
     * 计数器对象
     * @author lxm
     * @date 2024-01-18 05:12:35
     * @type {AppCounter}
     */
    counter?: AppCounter;
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * 初始化快速搜索
     *
     * @protected
     * @memberof TreeController
     */
    protected initQuickSearch(): Promise<void>;
    protected onDestroyed(): Promise<void>;
    /**
     * 初始化对应类型的部件服务
     * @author lxm
     * @date 2023-12-21 11:25:33
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initService(): Promise<void>;
    /**
     * 初始化计数器
     * @author lxm
     * @date 2024-01-18 05:12:02
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initCounter(): Promise<void>;
    /**
     * 初始化节点拖入关系处理
     * @author lxm
     * @date 2023-12-14 03:13:42
     * @protected
     */
    protected initDropNodeRss(): void;
    /**
     * 初始化节点点击后触发的第一个常用操作的上下文菜单项
     * @author lxm
     * @date 2023-12-19 03:18:43
     * @protected
     */
    protected initNodeClickTBUIActionItem(): void;
    /**
     * 树部件加载，从根节点开始重新加载
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    load(args?: MDCtrlLoadParams): Promise<ITreeNodeData[]>;
    getFetchParams(extraParams?: IParams): Promise<IParams>;
    /**
     * 加载子节点数据
     *
     * @param {(ITreeNodeData | undefined)} parentNode
     * @returns {*}
     * @memberof TreeController
     */
    loadNodes(parentNode?: ITreeNodeData): Promise<ITreeNodeData[]>;
    /**
     * loadNodes加载完子数据之后的处理
     * @author lxm
     * @date 2023-12-22 02:37:50
     * @param {ITreeNodeData[]} nodes 加载回来的子数据
     * @return {*}  {Promise<void>}
     */
    afterLoadNodes(nodes: ITreeNodeData[]): Promise<void>;
    /**
     * 树节点点击事件
     *
     * @param {ITreeNodeData} nodeData
     * @returns {*}  {Promise<void>}
     * @memberof TreeController
     */
    onTreeNodeClick(_nodeData: ITreeNodeData, event: MouseEvent): Promise<void>;
    /**
     * 树节点数据变更事件处理
     * @author lxm
     * @date 2023-09-28 01:48:05
     * @param {ITreeNodeData} nodeData
     * @param {boolean} isExpand true为展开，false为折叠
     */
    onExpandChange(nodeData: ITreeNodeData, isExpand: boolean): void;
    /**
     * 树节点双击事件
     * @author lxm
     * @date 2023-05-29 10:01:36
     * @param {ITreeNodeData} nodeData
     * @return {*}  {Promise<void>}
     */
    onDbTreeNodeClick(_nodeData: ITreeNodeData): Promise<void>;
    setActive(item: ITreeNodeData): Promise<void>;
    setSelection(selection: {
        _id: string;
    }[]): void;
    /**
     * 获取节点模型
     * @author lxm
     * @date 2023-07-27 10:47:58
     * @param {string} id
     * @return {*}  {(IDETreeNode | undefined)}
     */
    getNodeModel(id: string): IDETreeNode | undefined;
    /**
     * 通过标识获取节点数据
     * @author lxm
     * @date 2023-12-22 02:21:38
     * @param {string} key 可以是节点_id也可以是_uuid
     * @return {*}  {(ITreeNodeData | undefined)}
     */
    getNodeData(key: string): ITreeNodeData | undefined;
    /**
     * 执行界面行为
     *
     * @author chitanda
     * @date 2023-12-07 15:12:26
     * @param {string} uiActionId
     * @param {ITreeNodeData} nodeData
     * @param {MouseEvent} event
     * @param {string} appId
     * @return {*}  {Promise<void>}
     */
    doUIAction(uiActionId: string, nodeData: ITreeNodeData, event: MouseEvent, appId: string): Promise<void>;
    /**
     * 解析树节点获取通用数据，和完整的上下文和视图参数。
     * @author lxm
     * @date 2023-08-09 11:45:34
     * @protected
     * @param {ITreeNodeData} nodeData
     */
    protected parseTreeNodeData(nodeData: ITreeNodeData): {
        data: IData[];
        context: IContext;
        params: IParams;
    };
    /**
     * 计算展开节点集合(根据加载的子节点计算所有的展开节点标识集合)
     * @author lxm
     * @date 2023-08-09 05:19:36
     * @param {ITreeNodeData[]} nodes
     * @param {boolean} [isRoot=false]
     * @return {*}  {string[]}
     */
    calcExpandedKeys(nodes: ITreeNodeData[]): string[];
    /**
     * 刷新指定树节点的子节点数据
     * @author lxm
     * @date 2023-08-23 08:23:59
     * @param {(ITreeNodeData | IData)} nodeData 指定树节点数据，可以是节点数据，也可以是对应的实体数据
     * @param {boolean} [refreshParent=false] 是否是刷新给定节点数据的父节点的子节点数据
     * @return {*}  {Promise<void>}
     */
    refreshNodeChildren(nodeData: {
        _id?: string;
        srfkey?: string;
    }, refreshParent?: boolean): Promise<void>;
    expandNodeByKey(expandKeys: string[]): Promise<void>;
    /**
     * 计算是否允许拖动
     * @author lxm
     * @date 2023-12-14 11:28:07
     * @param {ITreeNodeData} draggingNode
     * @return {*}  {boolean}
     */
    calcAllowDrag(draggingNode: ITreeNodeData): boolean;
    /**
     * 验证是否可拖入
     *
     * - 放入节点不能是拖拽节点或其子项，以免造成异常递归问题
     *
     * @protected
     * @param {ITreeNodeData} draggingNode 拖拽节点
     * @param {ITreeNodeData} dropNode 放入节点
     * @return {*}  {boolean}
     * @memberof TreeController
     */
    protected validateDrop(draggingNode: ITreeNodeData, dropNode: ITreeNodeData): boolean;
    /**
     * 计算是否允许拖入
     * @author lxm
     * @date 2023-12-14 02:04:15
     * @param {ITreeNodeData} draggingNode
     * @param {ITreeNodeData} dropNode
     * @param {('inner' | 'prev' | 'next')} type
     * @return {*}  {boolean}
     */
    calcAllowDrop(draggingNode: ITreeNodeData, dropNode: ITreeNodeData, type: 'inner' | 'prev' | 'next'): boolean;
    /**
     * 找到指定父节点下的节点关系里面
     * 配置的实体关系的子实体是指定实体的
     * @author lxm
     * @date 2023-12-14 01:43:41
     * @protected
     * @param {string} parentId 父节点模型id
     * @param {string} appDataEntityId
     * @return {*}  {(IDETreeNodeRS | undefined)}
     */
    protected findDropNodeRS(parentId: string, appDataEntityId: string): DropNodeRS | undefined;
    /**
     * 处理节点拖入事件
     * @author lxm
     * @date 2023-12-15 04:23:29
     * @param {ITreeNodeData} draggingNode
     * @param {ITreeNodeData} dropNode
     * @param {('inner' | 'prev' | 'next')} dropType
     * @return {*}  {Promise<void>}
     */
    onNodeDrop(draggingNode: ITreeNodeData, dropNode: ITreeNodeData, dropType: 'inner' | 'prev' | 'next'): Promise<void>;
    /**
     * 更新实体节点数据
     * @author lxm
     * @date 2023-12-15 04:19:36
     * @protected
     * @param {ITreeNodeData[]} nodeDatas 节点数据集合
     * @return {*}  {Promise<void>}
     */
    updateDeNodeData(nodeDatas: ITreeNodeData[]): Promise<void>;
    /**
     * 修改节点文本
     * @author lxm
     * @date 2023-12-15 04:32:52
     * @param {ITreeNodeData} nodeData
     * @param {string} text
     * @return {*}  {Promise<void>}
     */
    modifyNodeText(nodeData: ITreeNodeData, text: string): Promise<void>;
    /**
     * 删除每一项
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-02-27 09:47:52
     */
    handleItemRemove(item: IData, context: IContext, params: IParams): Promise<boolean>;
    /**
     * 检测实体数据变更
     *
     * @author tony001
     * @date 2024-03-28 18:03:09
     * @protected
     * @param {IPortalMessage} msg
     * @return {*}  {void}
     */
    protected onDEDataChange(msg: IPortalMessage): void;
    /**
     * @description 展开收缩节点
     * @param {string} tag
     * @param {boolean} [expand]
     * @memberof TreeController
     */
    changeCollapse(params?: IData): void;
    /**
     * 新建树节点
     *
     * @author tony001
     * @date 2024-12-24 17:12:00
     * @param {{
     *     nodeType: string;
     *     defaultValue: IParams;
     *   }} {
     *     nodeType,
     *     defaultValue = {},
     *   }
     */
    newTreeNode({ nodeType, defaultValue, }: {
        nodeType: string;
        defaultValue: IParams;
    }): void;
    /**
     * 新建树节点数据
     *
     * @author tony001
     * @date 2024-12-24 18:12:31
     * @param {IData[]} nodeDatas
     * @return {*}  {Promise<void>}
     */
    createDeNodeData(nodeDatas: IData[]): Promise<void>;
}
//# sourceMappingURL=tree.controller.d.ts.map