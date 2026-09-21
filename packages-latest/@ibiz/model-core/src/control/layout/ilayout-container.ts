import { ILayout } from './ilayout';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 布局容器模型基础对象接口
 * @export
 * @interface ILayoutContainer
 */
export interface ILayoutContainer extends IModelObject {
  /**
   * 菜单布局对象
   *
   * @type {ILayout}
   * 来源  getPSLayout
   */
  layout?: ILayout;
}
