import { IDETreeNode } from '@ibiz/model-core';
import { ITreeNodeData } from '../../state';
import { EventBase } from '../argument';
import { IMDControlEvent } from './i-md-control.event';
/**
 * 树部件事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IMDControlEvent
 */
export interface ITreeEvent extends IMDControlEvent {
    /**
     * 数据激活事件
     *
     * @author lxm
     * @date 2022-08-31 14:08:22
     */
    onActive: {
        event: EventBase & {
            nodeData: ITreeNodeData;
        };
        emitArgs: {
            data: IData[];
            nodeData: ITreeNodeData;
        };
    };
    /**
     * 父节点刷新结束之后事件
     * @author lxm
     * @date 2023-08-18 02:18:24
     * @type {({
     *     event: EventBase & { children: ITreeNodeData[] };
     *     emitArgs: { children: ITreeNodeData[] };
     *   })}
     */
    onAfterRefreshParent: {
        event: EventBase & {
            parentNode: ITreeNodeData;
            children: ITreeNodeData[];
        };
        emitArgs: {
            parentNode: ITreeNodeData;
            children: ITreeNodeData[];
        };
    };
    /**
     * 树节点拖入变更处理完成后事件
     * @author lxm
     * @date 2023-12-15 03:18:10
     * @type {({
     *     event: EventBase & { isChangedParent: boolean };
     *     emitArgs: { isChangedParent: boolean };
     *   })}
     */
    onAfterNodeDrop: {
        event: EventBase & {
            isChangedParent: boolean;
        };
        emitArgs: {
            isChangedParent: boolean;
        };
    };
    /**
     * 新建树节点
     *
     * @author tony001
     * @date 2024-12-24 17:12:55
     * @type {({
     *     event: EventBase & { nodeModel: IDETreeNode; defaultValue: IParams };
     *     emitArgs: { nodeModel: IDETreeNode; defaultValue: IParams };
     *   })}
     */
    onNewTreeNode: {
        event: EventBase & {
            nodeModel: IDETreeNode;
            defaultValue: IParams;
        };
        emitArgs: {
            nodeModel: IDETreeNode;
            defaultValue: IParams;
        };
    };
}
//# sourceMappingURL=i-tree.event.d.ts.map