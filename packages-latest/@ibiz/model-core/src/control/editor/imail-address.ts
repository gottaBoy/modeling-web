import { IAutoComplete } from './iauto-complete';
import { IPickerEditor } from './ipicker-editor';

/**
 *
 * 继承父接口类型值[ADDRESSPICKUP,ADDRESSPICKUP_AC]
 * @export
 * @interface IMailAddress
 */
export interface IMailAddress extends IPickerEditor, IAutoComplete {}
