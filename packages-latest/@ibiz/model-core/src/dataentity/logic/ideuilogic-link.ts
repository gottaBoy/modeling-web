import { IDEUILogicLinkGroupCond } from './ideuilogic-link-group-cond';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体界面逻辑连接模型对象接口
 * @export
 * @interface IDEUILogicLink
 */
export interface IDEUILogicLink extends IModelObject {
  /**
   * 目标逻辑节点对象
   *
   * @type {string}
   * 来源  getDstPSDEUILogicNode
   */
  dstDEUILogicNodeId?: string;

  /**
   * 连接条件
   * @type {string}
   * 来源  getLinkCond
   */
  linkCond?: string;

  /**
   * 连接模式
   * @description 值模式 [实体界面逻辑连接模式] {0：常规、 1：默认连接、 2：异步结束、 3：异步拒绝、 9：异常处理 }
   * @type {( number | 0 | 1 | 2 | 3 | 9)}
   * 来源  getLinkMode
   */
  linkMode?: number | 0 | 1 | 2 | 3 | 9;

  /**
   * 连接条件对象
   *
   * @type {IDEUILogicLinkGroupCond}
   * 来源  getPSDEUILogicLinkGroupCond
   */
  deuilogicLinkGroupCond?: IDEUILogicLinkGroupCond;

  /**
   * 源逻辑节点对象
   *
   * @type {string}
   * 来源  getSrcPSDEUILogicNode
   */
  srcDEUILogicNodeId?: string;

  /**
   * 异常处理连接
   * @type {boolean}
   * @default false
   * 来源  isCatchLink
   */
  catchLink?: boolean;

  /**
   * 默认连接
   * @type {boolean}
   * @default false
   * 来源  isDefaultLink
   */
  defaultLink?: boolean;

  /**
   * 异步完成连接
   * @type {boolean}
   * @default false
   * 来源  isFulfilledLink
   */
  fulfilledLink?: boolean;

  /**
   * 异步拒绝连接
   * @type {boolean}
   * @default false
   * 来源  isRejectedLink
   */
  rejectedLink?: boolean;

  /**
   * 子调用连接
   * @type {boolean}
   * @default false
   * 来源  isSubCallLink
   */
  subCallLink?: boolean;
}
