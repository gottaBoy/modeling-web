import { IDEToolbarItem } from './idetoolbar-item';

/**
 *
 * 实体工具栏分隔项模型对象接口
 * 继承父接口类型值[SEPERATOR]
 * @export
 * @interface IDETBSeperatorItem
 */
export interface IDETBSeperatorItem extends IDEToolbarItem {
  /**
   * 是否延展
   * @type {boolean}
   * @default false
   * 来源  isSpanMode
   */
  spanMode?: boolean;
}
