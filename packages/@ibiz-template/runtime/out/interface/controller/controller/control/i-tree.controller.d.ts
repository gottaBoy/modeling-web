import { IDETree } from '@ibiz/model-core';
import { ITreeEvent } from '../../event';
import { ITreeNodeData, ITreeState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
/**
 * 树部件控制器
 * @author lxm
 * @date 2023-05-04 01:47:16
 * @export
 * @interface ITreeController
 * @extends {IMDControlController}
 */
export interface ITreeController<T extends IDETree = IDETree, S extends ITreeState = ITreeState, E extends ITreeEvent = ITreeEvent> extends IMDControlController<T, S, E> {
    /**
     * 树节点点击事件
     *
     * @param {ITreeNodeData} nodeData
     * @returns {*}  {Promise<void>}
     * @memberof ITreeController
     */
    onTreeNodeClick(nodeData: ITreeNodeData, event: MouseEvent): Promise<void>;
    /**
     * 树节点双击事件
     * @author lxm
     * @date 2023-05-29 10:01:36
     * @param {ITreeNodeData} nodeData
     */
    onDbTreeNodeClick(nodeData: ITreeNodeData): Promise<void>;
    /**
     * 执行界面行为
     *
     * @author chitanda
     * @date 2023-12-07 15:12:51
     * @param {string} uiActionId
     * @param {ITreeNodeData} nodeData
     * @param {MouseEvent} event
     * @param {string} appId
     * @return {*}  {Promise<void>}
     */
    doUIAction(uiActionId: string, nodeData: ITreeNodeData, event: MouseEvent, appId: string): Promise<void>;
    /**
     * 刷新指定树节点的子节点数据
     * @author lxm
     * @date 2023-08-23 08:23:59
     * @param {(ITreeNodeData | IData)} nodeData 指定树节点数据，可以是节点数据，也可以是对应的实体数据
     * @param {boolean} [refreshParent=false] 是否是刷新给定节点数据的父节点的子节点数据
     * @return {*}  {Promise<void>}
     */
    refreshNodeChildren(nodeData: ITreeNodeData | IData, refreshParent?: boolean): Promise<void>;
    /**
     * 展开并加载节点
     * @author lxm
     * @date 2023-11-07 03:00:54
     * @param {string[]} expandedKeys 要展开的节点标识集合
     * @return {*}  {Promise<void>}
     */
    expandNodeByKey(expandedKeys: string[]): Promise<void>;
    /**
     * @description 展开/收缩节点
     * @param {IData} [params]
     * @memberof ITreeController
     */
    changeCollapse(params?: IData): void;
}
//# sourceMappingURL=i-tree.controller.d.ts.map