import { IModelObject } from '../../imodel-object';

/**
 *
 * @export
 * @interface IDELogicLinkCondBase
 */
export interface IDELogicLinkCondBase extends IModelObject {
  /**
   * 条件类型
   * @description 值模式 [实体处理逻辑连接条件类型] {GROUP：组逻辑、 SINGLE：单项逻辑 }
   * @type {( string | 'GROUP' | 'SINGLE')}
   * 来源  getLogicType
   */
  logicType?: string | 'GROUP' | 'SINGLE';
}
