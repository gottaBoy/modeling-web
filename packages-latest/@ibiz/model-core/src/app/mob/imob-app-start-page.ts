import { IModelObject } from '../../imodel-object';

/**
 *
 * @export
 * @interface IMobAppStartPage
 */
export interface IMobAppStartPage extends IModelObject {
  /**
   * 高度
   * @type {number}
   * 来源  getHeight
   */
  height?: number;

  /**
   * 宽度
   * @type {number}
   * 来源  getWidth
   */
  width?: number;
}
