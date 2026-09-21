import { IModelObject } from '../imodel-object';

/**
 *
 * 界面部件注入属性模型对象接口
 * @export
 * @interface IControlAttribute
 */
export interface IControlAttribute extends IModelObject {
  /**
   * 注入属性名称
   * @type {string}
   * 来源  getAttrName
   */
  attrName?: string;

  /**
   * 注入属性值
   * @type {string}
   * 来源  getAttrValue
   */
  attrValue?: string;
}
