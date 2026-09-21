import { IModelObject } from '../../imodel-object';

/**
 *
 * 布局模型基础对象接口
 * 子接口类型识别属性[layout]
 * @export
 * @interface ILayout
 */
export interface ILayout extends IModelObject {
  /**
   * 布局模式
   * @type {string}
   * 来源  getLayout
   */
  layout?: string;
}
