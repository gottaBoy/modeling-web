import { IValueItemEditor } from './ivalue-item-editor';

/**
 *
 * 继承父接口类型值[PICTURE,MOBPICTURELIST,MOBPICTURE,PICTURE_ONE]
 * @export
 * @interface IPicture
 */
export interface IPicture extends IValueItemEditor {
  /**
   * 对象存储分类[OSSCAT]
   * @type {string}
   * 来源  getOSSCat
   */
  osscat?: string;

  /**
   * 直接内容存储
   * @type {boolean}
   * @default false
   * 来源  isRawContent
   */
  rawContent?: boolean;
}
