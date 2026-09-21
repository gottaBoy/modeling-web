import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ICheckBox } from '@ibiz/model-core';
import { SwitchEditorController } from './switch-editor.controller';
/**
 * 开关编辑器适配器
 *
 * @export
 * @class SwitchEditorProvider
 * @implements {EditorProvider}
 */
export declare class SwitchEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ICheckBox, parentController: IEditorContainerController): Promise<SwitchEditorController>;
}
