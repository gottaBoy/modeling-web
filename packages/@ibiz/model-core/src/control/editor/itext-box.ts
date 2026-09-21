import { INumberEditor } from './inumber-editor';
import { ITextEditor } from './itext-editor';

/**
 *
 * 继承父接口类型值[MOBTEXT,TEXTBOX]
 * @export
 * @interface ITextBox
 */
export interface ITextBox extends ITextEditor, INumberEditor {}
