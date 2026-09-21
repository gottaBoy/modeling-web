import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IAutoComplete } from '@ibiz/model-core';
import { AutoCompleteEditorController } from './autocomplete-editor.controller';
/**
 * 多选框列表编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class AutoCompleteEditorProvider
 * @implements {EditorProvider}
 */
export declare class AutoCompleteEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IAutoComplete, parentController: IEditorContainerController): Promise<AutoCompleteEditorController>;
}
