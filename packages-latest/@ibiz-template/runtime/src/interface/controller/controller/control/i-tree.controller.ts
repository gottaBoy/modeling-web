import { IDETree } from '@ibiz/model-core';
import { ITreeEvent } from '../../event';
import { ITreeNodeData, ITreeState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
import { IApiTreeController } from '../../../api/controller/control/i-api-tree.controller';
import { IViewController } from '../view';
import { IApiContextMenuController } from '../../../api/controller/control/i-api-context-menu.controller';

/**
 * @description 树部件控制器
 * @export
 * @interface ITreeController
 * @extends {IMDControlController<T, S, E>}
 * @extends {IApiTreeController<T, S>}
 * @template T
 * @template S
 * @template E
 */
export interface ITreeController<
  T extends IDETree = IDETree,
  S extends ITreeState = ITreeState,
  E extends ITreeEvent = ITreeEvent,
> extends IMDControlController<T, S, E>,
    IApiTreeController<T, S> {
  /**
   * @description 当前上下文环境的视图控制器
   * @type {IViewController}
   * @memberof ITreeController
   */
  view: IViewController;

  /**
   * 上下文菜单控制器
   * @description 上下文菜单控制器
   * @type {{ [p: string]: IApiContextMenuController }}
   * @memberof ITreeController
   */
  contextMenus: { [p: string]: IApiContextMenuController };

  /**
   * @description 加载节点数据
   * @param {ITreeNodeData} [parentNode]
   * @returns {*}  {Promise<ITreeNodeData[]>}
   * @memberof ITreeController
   */
  loadNodes(parentNode?: ITreeNodeData): Promise<ITreeNodeData[]>;

  /**
   * @description 树节点点击事件
   * @param {ITreeNodeData} nodeData
   * @param {MouseEvent} event
   * @returns {*}  {Promise<void>}
   * @memberof ITreeController
   */
  onTreeNodeClick(nodeData: ITreeNodeData, event: MouseEvent): Promise<void>;

  /**
   * @description 树节点双击事件
   * @param {ITreeNodeData} nodeData
   * @returns {*}  {Promise<void>}
   * @memberof ITreeController
   */
  onDbTreeNodeClick(nodeData: ITreeNodeData): Promise<void>;

  /**
   * @description 执行界面行为
   * @param {string} uiActionId
   * @param {ITreeNodeData} nodeData
   * @param {MouseEvent} event
   * @param {string} appId
   * @returns {*}  {Promise<void>}
   * @memberof ITreeController
   */
  doUIAction(
    uiActionId: string,
    nodeData: ITreeNodeData,
    event: MouseEvent,
    appId: string,
  ): Promise<void>;

  /**
   * @description 新建树节点数据
   * @param {IData[]} nodeDatas
   * @returns {*}  {Promise<void>}
   * @memberof ITreeController
   */
  createDeNodeData(nodeDatas: IData[]): Promise<void>;
}
