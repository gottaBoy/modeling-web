import { IEditor } from '../ieditor';
/**
 *
 * @export
 * @interface IValueItemEditor
 */
export interface IValueItemEditor extends IEditor {
    /**
     * 值项名称
     * @type {string}
     * 来源  getValueItemName
     */
    valueItemName?: string;
}
