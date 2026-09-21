import { IModelObject } from '../imodel-object';

/**
 *
 * 系统界面样式表模型对象接口
 * @export
 * @interface ISysCss
 */
export interface ISysCss extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 样式名称
   * @type {string}
   * 来源  getCssName
   */
  cssName?: string;

  /**
   * 直接样式内容
   * @type {string}
   * 来源  getCssStyle
   */
  cssStyle?: string;

  /**
   * 配置样式内容
   * @type {string}
   * 来源  getDesignCssStyle
   */
  designCssStyle?: string;
}
