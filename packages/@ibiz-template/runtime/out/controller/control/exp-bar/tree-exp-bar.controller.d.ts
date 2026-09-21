import { IDETreeNode, ITreeExpBar } from '@ibiz/model-core';
import { ITreeExpBarState, ITreeExpBarEvent, ITreeExpBarController, ITreeController, ITreeEvent, ITreeNodeData, INavViewMsg } from '../../../interface';
import { ExpBarControlController } from './exp-bar.controller';
/**
 * 树导航栏控制器
 *
 * @export
 * @class TreeExpBarController
 * @extends {ExpBarControlController<ITreeExpBar, ITreeExpBarState, ITreeExpBarEvent>}
 * @implements {ITreeExpBarController}
 */
export declare class TreeExpBarController extends ExpBarControlController<ITreeExpBar, ITreeExpBarState, ITreeExpBarEvent> implements ITreeExpBarController {
    /**
     * 默认展开节点集合
     * @author lxm
     * @date 2023-08-08 05:35:12
     * @type {string[]}
     */
    defaultExpandedKeys?: string[];
    get xDataController(): ITreeController;
    /**
     * 导航栏key
     *
     * @author zk
     * @date 2023-07-10 03:07:11
     * @memberof TreeExpBarController
     */
    navKeyName: "_id";
    /**
     * 有导航视图的节点模型标识集合
     * @author lxm
     * @date 2023-08-10 06:33:14
     * @type {string[]}
     */
    navNodeModelIds: string[];
    /**
     * 组件挂载
     *
     */
    protected onMounted(): Promise<void>;
    /**
     * 获取指定节点模型
     *
     * @param {string} nodeId
     * @return {*}  {(IDETreeNode | undefined)}
     * @memberof TreeExpBarController
     */
    getNodeModel(nodeId: string): IDETreeNode | undefined;
    /**
     * 多数据激活
     *
     * @author zk
     * @date 2023-05-29 03:05:36
     * @memberof ExpBarControlController
     */
    xDataActive(event: ITreeEvent['onActive']['event']): void;
    /**
     *  获取导航视图
     *
     * @author zk
     * @date 2023-06-29 03:06:41
     * @param {IDETabViewPanel} tabViewPanel
     * @return {*}  {Promise<INavViewMsg>}
     * @memberof TabExpPanelController
     */
    getNavViewMsg(node: ITreeNodeData, context: IContext, params: IParams): INavViewMsg;
    protected navByFirstItem(): void;
    /**
     * 根据栈数据导航数据
     *
     * @memberof TreeExpBarController
     */
    navDataByStack(): void;
    protected onCreated(): Promise<void>;
    /**
     * 根据srfnav计算需要展开的节点标识
     * @author lxm
     * @date 2023-11-07 02:42:45
     * @param {string} srfnav
     * @return {*}  {string[]}
     */
    calcExpandKeys(srfnav: string): string[];
    onRouterChange(info: {
        srfnav: string;
        path: string;
    }): Promise<void>;
    /**
     * 是否显示部件头部
     * @author lxm
     * @date 2023-08-02 07:54:18
     * @protected
     * @return {*}  {boolean}
     */
    protected calcControlHeaderVisible(): boolean;
}
//# sourceMappingURL=tree-exp-bar.controller.d.ts.map