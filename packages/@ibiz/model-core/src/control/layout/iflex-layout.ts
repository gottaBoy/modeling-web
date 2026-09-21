import { ILayout } from './ilayout';

/**
 *
 * 继承父接口类型值[FLEX]
 * @export
 * @interface IFlexLayout
 */
export interface IFlexLayout extends ILayout {
  /**
   * Flex横轴对齐方向
   * @description 值模式 [Flex横轴对齐] {flex-start：左对齐、 flex-end：右对齐、 center：居中、 space-between：space-between、 space-around：space-around }
   * @type {( string | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around')}
   * 来源  getAlign
   */
  align?:
    | string
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';

  /**
   * Flex布局方向
   * @description 值模式 [Flex布局方向] {row：水平居左、 row-reverse：水平居右、 column：垂直从上往下、 column-reverse：垂直从下往上 }
   * @type {( string | 'row' | 'row-reverse' | 'column' | 'column-reverse')}
   * 来源  getDir
   */
  dir?: string | 'row' | 'row-reverse' | 'column' | 'column-reverse';

  /**
   * Flex纵轴对齐方向
   * @description 值模式 [Flex纵轴对齐] {flex-start：上对齐、 flex-end：下对齐、 center：居中、 baseline：baseline、 stretch：stretch }
   * @type {( string | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch')}
   * 来源  getVAlign
   */
  valign?:
    | string
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch';
}
