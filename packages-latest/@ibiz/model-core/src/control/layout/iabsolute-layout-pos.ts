import { ILayoutPos } from './ilayout-pos';

/**
 *
 * 继承父接口类型值[ABSOLUTE]
 * @export
 * @interface IAbsoluteLayoutPos
 */
export interface IAbsoluteLayoutPos extends ILayoutPos {
  /**
   * 下方位置
   * @type {number}
   * @default 0
   * 来源  getBottom
   */
  bottom?: number;

  /**
   * 布局占位
   * @description 值模式 [绝对布局模式] {LTWH：左上角+宽高、 LTRB：左上角+右下角、 RBWH：右下角+宽高 }
   * @type {( string | 'LTWH' | 'LTRB' | 'RBWH')}
   * 来源  getLayoutPos
   */
  layoutPos?: string | 'LTWH' | 'LTRB' | 'RBWH';

  /**
   * 左侧位置
   * @type {number}
   * @default 0
   * 来源  getLeft
   */
  left?: number;

  /**
   * 右侧位置
   * @type {number}
   * @default 0
   * 来源  getRight
   */
  right?: number;

  /**
   * 上方位置
   * @type {number}
   * @default 0
   * 来源  getTop
   */
  top?: number;
}
