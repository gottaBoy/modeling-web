import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体主状态操作标识模型对象接口
 * @export
 * @interface IDEMainStateOPPriv
 */
export interface IDEMainStateOPPriv extends IModelObject {
  /**
   * 实体操作标识
   *
   * @type {string}
   * 来源  getPSDEOPPriv
   */
  deopprivId?: string;
}
