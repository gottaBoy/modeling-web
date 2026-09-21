import { ISysImage } from '../res/isys-image';
import { IModelObject } from '../imodel-object';

/**
 *
 * 界面部件成员项参数对象接口
 * @export
 * @interface IControlItemParam
 */
export interface IControlItemParam extends IModelObject {
  /**
   * 标题
   * @type {string}
   * 来源  getCaption
   */
  caption?: string;

  /**
   * 参数
   * @type {string}
   * 来源  getKey
   */
  key?: string;

  /**
   * 系统图片
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 调用界面行为
   *
   * @type {string}
   * 来源  getPSUIAction
   */
  uiactionId?: string;

  /**
   * 提示信息
   * @type {string}
   * 来源  getTooltip
   */
  tooltip?: string;

  /**
   * 内容
   * @type {string}
   * 来源  getValue
   */
  value?: string;
}
