import { ILayoutPos } from './ilayout-pos';

/**
 *
 * 继承父接口类型值[TABLE_12COL,TABLE_24COL]
 * @export
 * @interface IGridLayoutPos
 */
export interface IGridLayoutPos extends ILayoutPos {
  /**
   * 大型列宽
   * @type {number}
   * @default -1
   * 来源  getColLG
   */
  colLG?: number;

  /**
   * 大型偏移
   * @type {number}
   * @default -1
   * 来源  getColLGOffset
   */
  colLGOffset?: number;

  /**
   * 中型列宽
   * @type {number}
   * @default -1
   * 来源  getColMD
   */
  colMD?: number;

  /**
   * 中型偏移
   * @type {number}
   * @default -1
   * 来源  getColMDOffset
   */
  colMDOffset?: number;

  /**
   * 小型列宽
   * @type {number}
   * @default -1
   * 来源  getColSM
   */
  colSM?: number;

  /**
   * 小型偏移
   * @type {number}
   * @default -1
   * 来源  getColSMOffset
   */
  colSMOffset?: number;

  /**
   * 固定列宽
   * @type {number}
   * @default -1
   * 来源  getColWidth
   */
  colWidth?: number;

  /**
   * 超小列宽
   * @type {number}
   * @default -1
   * 来源  getColXS
   */
  colXS?: number;

  /**
   * 超小偏移
   * @type {number}
   * @default -1
   * 来源  getColXSOffset
   */
  colXSOffset?: number;
}
