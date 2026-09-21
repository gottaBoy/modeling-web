import { INumberEditor } from './inumber-editor';
import { ITextEditor } from './itext-editor';

/**
 *
 * 继承父接口类型值[ARRAY,MOBARRAY]
 * @export
 * @interface IArray
 */
export interface IArray extends ITextEditor, INumberEditor {
  /**
   * 数据类型[DATATYPE]{STRING|NUMBER|INTEGER|URL|IMAGE|MAIL}
   * @type {string}
   * @default STRING
   * 来源  getDataType
   */
  dataType?: string;
}
