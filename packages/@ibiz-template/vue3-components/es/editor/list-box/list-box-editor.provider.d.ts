import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IListBox, IListBoxPicker } from '@ibiz/model-core';
import { ListBoxEditorController } from './list-box-editor.controller';
import { ListBoxPickerEditorController } from './list-box-picker-editor.controller';
/**
 * 列表框编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class ListBoxEditorProvider
 * @implements {EditorProvider}
 */
export declare class ListBoxEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IListBox | IListBoxPicker, parentController: IEditorContainerController): Promise<ListBoxEditorController | ListBoxPickerEditorController>;
}
