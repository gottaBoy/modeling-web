import { ILayoutPos } from './ilayout-pos';

/**
 *
 * 继承父接口类型值[BORDER]
 * @export
 * @interface IBorderLayoutPos
 */
export interface IBorderLayoutPos extends ILayoutPos {
  /**
   * 布局占位
   * @description 值模式 [边界布局位置] {NORTH：上方、 WEST：左侧、 EAST：右侧、 SOUTH：下方、 CENTER：中间 }
   * @type {( string | 'NORTH' | 'WEST' | 'EAST' | 'SOUTH' | 'CENTER')}
   * 来源  getLayoutPos
   */
  layoutPos?: string | 'NORTH' | 'WEST' | 'EAST' | 'SOUTH' | 'CENTER';
}
