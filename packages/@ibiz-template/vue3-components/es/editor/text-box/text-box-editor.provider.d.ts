import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ITextBox } from '@ibiz/model-core';
import { TextBoxEditorController } from './text-box-editor.controller';
/**
 * 输入框编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class TextBoxEditorProvider
 * @implements {EditorProvider}
 */
export declare class TextBoxEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    constructor(editorType?: string);
    createController(editorModel: ITextBox, parentController: IEditorContainerController): Promise<TextBoxEditorController>;
}
