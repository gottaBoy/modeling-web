import { TreeController, INavViewMsg, ITreeNodeData, MDControlController } from '@ibiz-template/runtime';
import { IDETree } from '@ibiz/model-core';
import { NavgationBaseProvider } from './navigation-base.provider';
/**
 * 树导航适配器
 *
 * @export
 * @class TreeNavigationProvider
 * @extends {NavgationBaseProvider}
 */
export declare class TreeNavigationProvider extends NavgationBaseProvider {
    keyName: string;
    controller: TreeController;
    model: IDETree;
    /**
     * 有导航视图的节点标识
     *
     * @type {string[]}
     * @memberof TreeNavigationProvider
     */
    navNodeModelIds: string[];
    /**
     * Creates an instance of TreeNavigationProvider.
     * @param {MDControlController} controller
     * @memberof TreeNavigationProvider
     */
    constructor(controller: MDControlController);
    onNavDataByStack(): void;
    getNavViewMsg(item: ITreeNodeData): INavViewMsg;
}
