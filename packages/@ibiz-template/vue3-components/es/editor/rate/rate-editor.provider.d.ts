import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IRating } from '@ibiz/model-core';
import { RateEditorController } from './rate-editor.controller';
/**
 * 评分器编辑器适配器
 *
 * @export
 * @class RateEditorProvider
 * @implements {EditorProvider}
 */
export declare class RateEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IRating, parentController: IEditorContainerController): Promise<RateEditorController>;
}
