import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体数据查询条件模型对象接口
 * 子接口类型识别属性[condType]
 * @export
 * @interface IDEDQCondition
 */
export interface IDEDQCondition extends IModelObject {
  /**
   * 条件操作
   * @type {string}
   * 来源  getCondOp
   */
  condOp?: string;

  /**
   * 条件标记
   * @type {string}
   * 来源  getCondTag
   */
  condTag?: string;

  /**
   * 条件标记2
   * @type {string}
   * 来源  getCondTag2
   */
  condTag2?: string;

  /**
   * 条件类型
   * @description 值模式 [条件类型] {GROUP：组合条件、 SINGLE：属性条件、 CUSTOM：自定义条件、 PREDEFINED：预置条件 }
   * @type {( string | 'GROUP' | 'SINGLE' | 'CUSTOM' | 'PREDEFINED')}
   * 来源  getCondType
   */
  condType?: string | 'GROUP' | 'SINGLE' | 'CUSTOM' | 'PREDEFINED';
}
