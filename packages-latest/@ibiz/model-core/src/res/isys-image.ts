import { IModelObject } from '../imodel-object';

/**
 *
 * 系统图片模型对象接口
 * @export
 * @interface ISysImage
 */
export interface ISysImage extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 图片样式
   * @type {string}
   * 来源  getCssClass
   */
  cssClass?: string;

  /**
   * 图片样式（X）
   * @type {string}
   * 来源  getCssClassX
   */
  cssClassX?: string;

  /**
   * 字体标识
   * @type {string}
   * 来源  getGlyph
   */
  glyph?: string;

  /**
   * 图片宽度
   * @type {number}
   * @default 0
   * 来源  getHeight
   */
  height?: number;

  /**
   * 图片路径
   * @type {string}
   * 来源  getImagePath
   */
  imagePath?: string;

  /**
   * 图片路径（X）
   * @type {string}
   * 来源  getImagePathX
   */
  imagePathX?: string;

  /**
   * 直接内容
   * @type {string}
   * 来源  getRawContent
   */
  rawContent?: string;

  /**
   * 图片宽度
   * @type {number}
   * @default 0
   * 来源  getWidth
   */
  width?: number;
}
