import { ISysImage } from '../res/isys-image';
import { IModelObject } from '../imodel-object';

/**
 *
 * 图片部件模型基础对象接口
 * @export
 * @interface IImageBase
 */
export interface IImageBase extends IModelObject {
  /**
   * 提示信息
   * @type {string}
   * 来源  getAlternativeText
   */
  alternativeText?: string;

  /**
   * 适配模式
   * @type {string}
   * 来源  getFitMode
   */
  fitMode?: string;

  /**
   * 系统图片资源
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 中间放置
   * @type {boolean}
   * @default false
   * 来源  isPlaceCenter
   */
  placeCenter?: boolean;
}
