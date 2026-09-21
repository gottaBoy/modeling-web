import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IMarkdown } from '@ibiz/model-core';
import { MarkDownEditorController } from './markdown-editor.controller';
/**
 * 代码框编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class MarkDownEditorProvider
 * @implements {EditorProvider}
 */
export declare class MarkDownEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IMarkdown, parentController: IEditorContainerController): Promise<MarkDownEditorController>;
}
