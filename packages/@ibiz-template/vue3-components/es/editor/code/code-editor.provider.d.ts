import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ICode } from '@ibiz/model-core';
import { CodeEditorController } from './code-editor.controller';
/**
 * 代码框编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class CodeEditorProvider
 * @implements {EditorProvider}
 */
export declare class CodeEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ICode, parentController: IEditorContainerController): Promise<CodeEditorController>;
}
