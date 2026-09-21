import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体映射属性模型对象接口
 * @export
 * @interface IDEMapField
 */
export interface IDEMapField extends IModelObject {
  /**
   * 目标属性名称
   * @type {string}
   * 来源  getDstFieldName
   */
  dstFieldName?: string;

  /**
   * 表达式
   * @type {string}
   * 来源  getExpression
   */
  expression?: string;

  /**
   * 映射类型
   * @description 值模式 [实体映射属性源值类型] {FIELD：属性等价、 VALUE：直接值到目标属性、 EXPRESSION：计算值到目标属性、 VALUE_SRC：直接值到源属性、 EXPRESSION_SRC：计算值到源属性 }
   * @type {( string | 'FIELD' | 'VALUE' | 'EXPRESSION' | 'VALUE_SRC' | 'EXPRESSION_SRC')}
   * 来源  getMapType
   */
  mapType?:
    | string
    | 'FIELD'
    | 'VALUE'
    | 'EXPRESSION'
    | 'VALUE_SRC'
    | 'EXPRESSION_SRC';

  /**
   * 直接值
   * @type {string}
   * 来源  getRawValue
   */
  rawValue?: string;

  /**
   * 源属性名称
   * @type {string}
   * 来源  getSrcFieldName
   */
  srcFieldName?: string;
}
