import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体逻辑连接条件模型基础对象接口
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
