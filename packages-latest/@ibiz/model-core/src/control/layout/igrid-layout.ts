import { ILayout } from './ilayout';

/**
 *
 * 继承父接口类型值[TABLE_12COL,TABLE_24COL]
 * @export
 * @interface IGridLayout
 */
export interface IGridLayout extends ILayout {
  /**
   * 列数量
   * @type {number}
   * 来源  getColumnCount
   */
  columnCount?: number;

  /**
   * 启用12列转24列布局
   * @type {boolean}
   * @default false
   * 来源  isEnableCol12ToCol24
   */
  enableCol12ToCol24?: boolean;
}
