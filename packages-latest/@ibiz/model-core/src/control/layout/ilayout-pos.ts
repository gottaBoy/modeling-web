import { IModelObject } from '../../imodel-object';

/**
 *
 * 布局占位模型基础对象接口
 * 子接口类型识别属性[layout]
 * @export
 * @interface ILayoutPos
 */
export interface ILayoutPos extends IModelObject {
  /**
   * 自身水平对齐模式
   * @description 值模式 [内容水平对齐方式] {LEFT：左对齐、 CENTER：居中、 RIGHT：右对齐、 JUSTIFY：两端对齐 }
   * @type {( string | 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFY')}
   * 来源  getHAlignSelf
   */
  halignSelf?: string | 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFY';

  /**
   * 布局高度
   * @type {number}
   * 来源  getHeight
   */
  height?: number;

  /**
   * 高度模式
   * @description 值模式 [高度模式] {AUTO：自动、 FULL：全部高度、 PX：像素、 PERCENTAGE：百分比 }
   * @type {( string | 'AUTO' | 'FULL' | 'PX' | 'PERCENTAGE')}
   * 来源  getHeightMode
   */
  heightMode?: string | 'AUTO' | 'FULL' | 'PX' | 'PERCENTAGE';

  /**
   * 布局模式
   * @type {string}
   * 来源  getLayout
   */
  layout?: string;

  /**
   * 下方间隔模式
   * @description 值模式 [面板项间隔模式] {OUTERNONE：Outer none、 OUTERSMALL：Outer small、 OUTERMEDIUM：Outer medium、 OUTERLARGE：Outer large、 INNERNONE：Inner none、 INNERSMALL：Inner small、 INNERMEDIUM：Inner medium、 INNERLARGE：Inner large }
   * @type {( string | 'OUTERNONE' | 'OUTERSMALL' | 'OUTERMEDIUM' | 'OUTERLARGE' | 'INNERNONE' | 'INNERSMALL' | 'INNERMEDIUM' | 'INNERLARGE')}
   * 来源  getSpacingBottom
   */
  spacingBottom?:
    | string
    | 'OUTERNONE'
    | 'OUTERSMALL'
    | 'OUTERMEDIUM'
    | 'OUTERLARGE'
    | 'INNERNONE'
    | 'INNERSMALL'
    | 'INNERMEDIUM'
    | 'INNERLARGE';

  /**
   * 左侧间隔模式
   * @description 值模式 [面板项间隔模式] {OUTERNONE：Outer none、 OUTERSMALL：Outer small、 OUTERMEDIUM：Outer medium、 OUTERLARGE：Outer large、 INNERNONE：Inner none、 INNERSMALL：Inner small、 INNERMEDIUM：Inner medium、 INNERLARGE：Inner large }
   * @type {( string | 'OUTERNONE' | 'OUTERSMALL' | 'OUTERMEDIUM' | 'OUTERLARGE' | 'INNERNONE' | 'INNERSMALL' | 'INNERMEDIUM' | 'INNERLARGE')}
   * 来源  getSpacingLeft
   */
  spacingLeft?:
    | string
    | 'OUTERNONE'
    | 'OUTERSMALL'
    | 'OUTERMEDIUM'
    | 'OUTERLARGE'
    | 'INNERNONE'
    | 'INNERSMALL'
    | 'INNERMEDIUM'
    | 'INNERLARGE';

  /**
   * 右侧间隔模式
   * @description 值模式 [面板项间隔模式] {OUTERNONE：Outer none、 OUTERSMALL：Outer small、 OUTERMEDIUM：Outer medium、 OUTERLARGE：Outer large、 INNERNONE：Inner none、 INNERSMALL：Inner small、 INNERMEDIUM：Inner medium、 INNERLARGE：Inner large }
   * @type {( string | 'OUTERNONE' | 'OUTERSMALL' | 'OUTERMEDIUM' | 'OUTERLARGE' | 'INNERNONE' | 'INNERSMALL' | 'INNERMEDIUM' | 'INNERLARGE')}
   * 来源  getSpacingRight
   */
  spacingRight?:
    | string
    | 'OUTERNONE'
    | 'OUTERSMALL'
    | 'OUTERMEDIUM'
    | 'OUTERLARGE'
    | 'INNERNONE'
    | 'INNERSMALL'
    | 'INNERMEDIUM'
    | 'INNERLARGE';

  /**
   * 上方间隔模式
   * @description 值模式 [面板项间隔模式] {OUTERNONE：Outer none、 OUTERSMALL：Outer small、 OUTERMEDIUM：Outer medium、 OUTERLARGE：Outer large、 INNERNONE：Inner none、 INNERSMALL：Inner small、 INNERMEDIUM：Inner medium、 INNERLARGE：Inner large }
   * @type {( string | 'OUTERNONE' | 'OUTERSMALL' | 'OUTERMEDIUM' | 'OUTERLARGE' | 'INNERNONE' | 'INNERSMALL' | 'INNERMEDIUM' | 'INNERLARGE')}
   * 来源  getSpacingTop
   */
  spacingTop?:
    | string
    | 'OUTERNONE'
    | 'OUTERSMALL'
    | 'OUTERMEDIUM'
    | 'OUTERLARGE'
    | 'INNERNONE'
    | 'INNERSMALL'
    | 'INNERMEDIUM'
    | 'INNERLARGE';

  /**
   * 自身垂直对齐模式
   * @description 值模式 [内容垂直对齐方式] {TOP：上对齐、 MIDDLE：居中、 BOTTOM：下对齐 }
   * @type {( string | 'TOP' | 'MIDDLE' | 'BOTTOM')}
   * 来源  getVAlignSelf
   */
  valignSelf?: string | 'TOP' | 'MIDDLE' | 'BOTTOM';

  /**
   * 布局宽度
   * @type {number}
   * 来源  getWidth
   */
  width?: number;

  /**
   * 宽度模式
   * @description 值模式 [内容宽度模式] {AUTO：自动、 FULL：全部宽度、 PX：像素、 PERCENTAGE：百分比 }
   * @type {( string | 'AUTO' | 'FULL' | 'PX' | 'PERCENTAGE')}
   * 来源  getWidthMode
   */
  widthMode?: string | 'AUTO' | 'FULL' | 'PX' | 'PERCENTAGE';
}
