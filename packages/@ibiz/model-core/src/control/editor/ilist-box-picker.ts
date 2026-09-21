import { IAutoComplete } from './iauto-complete';
import { IPickerEditor } from './ipicker-editor';
import { IValueItemEditor } from './ivalue-item-editor';

/**
 *
 * 继承父接口类型值[LISTBOXPICKUP]
 * @export
 * @interface IListBoxPicker
 */
export interface IListBoxPicker
  extends IPickerEditor,
    IValueItemEditor,
    IAutoComplete {}
