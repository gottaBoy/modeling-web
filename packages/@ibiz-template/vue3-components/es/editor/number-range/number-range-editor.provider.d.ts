import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { INumberRange } from '@ibiz/model-core';
import { NumberRangeEditorController } from './number-range-editor.controller';
/**
 * 数值范围编辑器适配器
 *
 * @export
 * @class NumberRangeEditorProvider
 * @implements {EditorProvider}
 */
export declare class NumberRangeEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: INumberRange, parentController: IEditorContainerController): Promise<NumberRangeEditorController>;
}
