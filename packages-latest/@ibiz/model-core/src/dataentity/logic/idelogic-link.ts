import { IDELogicLinkGroupCond } from './idelogic-link-group-cond';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体处理逻辑连接模型对象接口
 * @export
 * @interface IDELogicLink
 */
export interface IDELogicLink extends IModelObject {
  /**
   * 目标逻辑节点对象
   *
   * @type {string}
   * 来源  getDstPSDELogicNode
   */
  thenId?: string;

  /**
   * 连接条件对象
   *
   * @type {IDELogicLinkGroupCond}
   * 来源  getPSDELogicLinkGroupCond
   */
  delogicLinkGroupCond?: IDELogicLinkGroupCond;

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
   * 子调用连接
   * @type {boolean}
   * @default false
   * 来源  isSubCallLink
   */
  subCallLink?: boolean;
}
