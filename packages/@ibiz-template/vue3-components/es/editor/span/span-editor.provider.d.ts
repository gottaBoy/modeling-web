import { ISpan } from '@ibiz/model-core';
import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { SpanEditorController } from './span-editor.controller';
/**
 * 标签编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class SpanEditorProvider
 * @implements {EditorProvider}
 */
export declare class SpanEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    constructor(editorType?: string);
    createController(editorModel: ISpan, parentController: IEditorContainerController): Promise<SpanEditorController>;
}
