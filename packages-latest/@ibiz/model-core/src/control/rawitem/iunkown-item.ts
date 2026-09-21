import { IRawItemBase } from '../iraw-item-base';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * @export
 * @interface IUnkownItem
 */
export interface IUnkownItem extends IRawItemBase {
  /**
   * Html内容
   * @type {string}
   * 来源  getHtmlContent
   */
  htmlContent?: string;

  /**
   * 图片对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 直接内容
   * @type {string}
   * 来源  getRawContent
   */
  rawContent?: string;
}
