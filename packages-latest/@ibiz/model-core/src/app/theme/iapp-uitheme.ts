import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用界面主题模型对象接口
 * @export
 * @interface IAppUITheme
 */
export interface IAppUITheme extends IModelObject {
  /**
   * 主题样式
   * @type {string}
   * 来源  getCssStyle
   */
  cssStyle?: string;

  /**
   * 主题说明
   * @type {string}
   * 来源  getThemeDesc
   */
  themeDesc?: string;

  /**
   * 主题参数集合
   * @type {IModel}
   * 来源  getThemeParams
   */
  themeParams?: IModel;

  /**
   * 主题标记
   * @type {string}
   * 来源  getThemeTag
   */
  themeTag?: string;

  /**
   * 主题远程路径
   * @type {string}
   * 来源  getThemeUrl
   */
  themeUrl?: string;
}
