import { IModelObject } from '../imodel-object';

/**
 *
 * 文本部件模型基础对象接口
 * @export
 * @interface ITextBase
 */
export interface ITextBase extends IModelObject {
  /**
   * 标题
   * @type {string}
   * 来源  getCaption
   */
  caption?: string;

  /**
   * 文本水平对齐模式[HALIGN]
   * @description 值模式 [内容水平对齐方式] {LEFT：左对齐、 CENTER：居中、 RIGHT：右对齐、 JUSTIFY：两端对齐 }
   * @type {( string | 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFY')}
   * @default LEFT
   * 来源  getHAlign
   */
  halign?: string | 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFY';

  /**
   * 绘制模式
   * @description 值模式 [文本绘制模式] {TEXT：文本、 HEADING1：标题1、 HEADING2：标题2、 HEADING3：标题3、 HEADING4：标题4、 HEADING5：标题5、 HEADING6：标题6、 PARAGRAPH：段落 }
   * @type {( string | 'TEXT' | 'HEADING1' | 'HEADING2' | 'HEADING3' | 'HEADING4' | 'HEADING5' | 'HEADING6' | 'PARAGRAPH')}
   * 来源  getRenderMode
   */
  renderMode?:
    | string
    | 'TEXT'
    | 'HEADING1'
    | 'HEADING2'
    | 'HEADING3'
    | 'HEADING4'
    | 'HEADING5'
    | 'HEADING6'
    | 'PARAGRAPH';

  /**
   * 文本垂直对齐模式[VALIGN]
   * @description 值模式 [内容垂直对齐方式] {TOP：上对齐、 MIDDLE：居中、 BOTTOM：下对齐 }
   * @type {( string | 'TOP' | 'MIDDLE' | 'BOTTOM')}
   * @default MIDDLE
   * 来源  getVAlign
   */
  valign?: string | 'TOP' | 'MIDDLE' | 'BOTTOM';

  /**
   * 换行模式[WRAPMODE]
   * @description 值模式 [文本换行模式] {WRAP：换行、 NOWRAP：不换行 }
   * @type {( string | 'WRAP' | 'NOWRAP')}
   * @default NOWRAP
   * 来源  getWrapMode
   */
  wrapMode?: string | 'WRAP' | 'NOWRAP';
}
