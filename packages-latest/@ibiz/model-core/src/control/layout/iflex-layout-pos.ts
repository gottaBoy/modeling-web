import { ILayoutPos } from './ilayout-pos';

/**
 *
 * 继承父接口类型值[FLEX]
 * @export
 * @interface IFlexLayoutPos
 */
export interface IFlexLayoutPos extends ILayoutPos {
  /**
   * Flex伸缩基准值
   * @type {number}
   * @default -1
   * 来源  getBasis
   */
  basis?: number;

  /**
   * Flex延伸
   * @type {number}
   * 来源  getGrow
   */
  grow?: number;

  /**
   * Flex伸缩值
   * @type {number}
   * @default 1
   * 来源  getShrink
   */
  shrink?: number;
}
