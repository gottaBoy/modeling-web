import { IModelObject } from '../../imodel-object';

/**
 *
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
}
